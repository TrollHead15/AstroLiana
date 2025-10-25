import { jsonResponse, parseJsonBody } from "@/lib/http";
import { captureServerEvent } from "@/lib/posthog";
import {
  buildRateLimitHeaders,
  checkRateLimit,
  getRequestIdentifier,
} from "@/lib/rate-limit";
import { sendGuideEmail } from "@/lib/resend";
import { sendTelegramNotification } from "@/lib/telegram";
import { guideSchema, type LeadPayload } from "@/lib/validation";

type ErrorResponse = {
  success: false;
  message: string;
  errors?: unknown;
};

type SuccessResponse = {
  success: true;
  message: string;
};

function formatTelegramMessage(payload: LeadPayload): string {
  return [
    "📘 Новый лид: Гайд",
    `Имя: ${payload.name}`,
    `Email: ${payload.email}`,
    `Согласие: ${payload.consent ? "да" : "нет"}`,
  ].join("\n");
}

export async function POST(request: Request): Promise<Response> {
  const identifier = getRequestIdentifier(request);
  const rateLimit = checkRateLimit(identifier);
  const headers = buildRateLimitHeaders(rateLimit);

  if (!rateLimit.success) {
    const body: ErrorResponse = {
      success: false,
      message: "Превышен лимит запросов. Попробуйте позже",
    };

    return jsonResponse(body, {
      status: 429,
      headers,
    });
  }

  let payload: unknown;

  try {
    payload = await parseJsonBody<unknown>(request);
  } catch (error) {
    console.error("[lead-magnets:guide] invalid JSON", error);

    const body: ErrorResponse = {
      success: false,
      message: "Некорректное тело запроса",
    };

    return jsonResponse(body, {
      status: 400,
      headers,
    });
  }

  const result = guideSchema.safeParse(payload);

  if (!result.success) {
    const { fieldErrors, formErrors } = result.error.flatten();

    const body: ErrorResponse = {
      success: false,
      message: "Ошибка валидации",
      errors: { fieldErrors, formErrors },
    };

    return jsonResponse(body, {
      status: 400,
      headers,
    });
  }

  const data: LeadPayload = result.data;

  try {
    await sendTelegramNotification(formatTelegramMessage(data));

    await captureServerEvent("telegram_message_sent", {
      leadType: "guide",
      email: data.email,
      name: data.name,
    });
  } catch (error) {
    console.error("[lead-magnets:guide] telegram", error);

    const body: ErrorResponse = {
      success: false,
      message: "Не удалось отправить уведомление в Telegram",
    };

    return jsonResponse(body, {
      status: 500,
      headers,
    });
  }

  try {
    await sendGuideEmail({ email: data.email, name: data.name });

    await captureServerEvent("email_sent", {
      leadType: "guide",
      email: data.email,
      name: data.name,
    });

    await captureServerEvent("form_submitted", {
      leadType: "guide",
      email: data.email,
      name: data.name,
    });

    const body: SuccessResponse = {
      success: true,
      message: "Гайд отправлен на указанный email",
    };

    return jsonResponse(body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("[lead-magnets:guide] resend", error);

    const body: ErrorResponse = {
      success: false,
      message: "Не удалось отправить письмо. Попробуйте позже",
    };

    return jsonResponse(body, {
      status: 500,
      headers,
    });
  }
}
