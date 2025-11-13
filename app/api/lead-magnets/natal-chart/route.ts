import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { captureNatalChartSubmitted, flushPostHog } from "@/lib/posthog";
import { sendPdfViaResend } from "@/lib/pdfSender";
import { checkRateLimit, getClientIp } from "@/lib/rateLimiter";
import { formatTelegramMessage, sendToTelegram } from "@/lib/telegram";
import { natalChartSchema } from "@/lib/validators/leadMagnets";

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const clientIp = getClientIp(request);
    if (!checkRateLimit(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse JSON body
    const body = await request.json();

    // Validate request payload
    const payload = natalChartSchema.parse(body);

    // Send to Telegram
    const telegramMessage = formatTelegramMessage("natal_chart", payload);
    const telegramResult = await sendToTelegram(telegramMessage);

    if (!telegramResult.success) {
      console.error("Failed to send Telegram message:", telegramResult.error);
      return NextResponse.json(
        { error: "Failed to process your request. Please try again." },
        { status: 500 }
      );
    }

    // Enqueue PDF sending
    const pdfResult = await sendPdfViaResend(payload.email, "natal_chart", payload.name);

    if (!pdfResult.success) {
      console.warn("Failed to enqueue PDF send:", pdfResult.error);
      // Don't fail the request if PDF sending fails - Telegram notification was sent
    }

    // Capture analytics event
    await captureNatalChartSubmitted(payload.email, {
      name: payload.name,
      hasPhone: !!payload.phone,
      hasBirthData: !!payload.birthDate
    });

    await flushPostHog();

    console.log(`Natal chart request processed for: ${payload.email}`);

    return NextResponse.json(
      {
        success: true,
        message:
          "Your natal chart request has been received. We'll send the analysis to your email."
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation error:", error.issues);
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: error.issues
        },
        { status: 400 }
      );
    }

    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
