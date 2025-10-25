import { jsonResponse, parseJsonBody } from "../../../../lib/http";
import { captureLeadEvent } from "../../../../lib/posthog";
import {
  buildRateLimitHeaders,
  checkRateLimit,
  getRequestIdentifier,
} from "../../../../lib/rate-limit";
import { sendToTelegram } from "../../../../lib/telegram";
import {
  natalChartSchema,
  type NatalChartPayload,
} from "../../../../lib/validation";


function formatTelegramMessage(payload: NatalChartPayload): string {
  return [
    "🌟 Новый лид: Натальная карта",
    `Имя: ${payload.name}`,
    `Email: ${payload.email}`,
    `Дата рождения: ${payload.birthDate}`,
    `Время: ${payload.birthTime}`,
    `Место: ${payload.birthPlace}`,
  ].join("\n");
}

export async function POST(request: Request): Promise<Response> {
  const identifier = getRequestIdentifier(request);
  const rateLimit = checkRateLimit(identifier);

  if (!rateLimit.success) {
    return jsonResponse(
      {
        success: false,
        message: "Превышен лимит запросов. Попробуйте позже",
      },
      {
        status: 429,
        headers: {
          ...buildRateLimitHeaders(rateLimit),
          "Retry-After": Math.max(
            0,
            Math.ceil((rateLimit.reset - Date.now()) / 1000),
          ).toString(),
        },
      },
    );
  }

  let payload: unknown;

  try {
    payload = await parseJsonBody<unknown>(request);
  } catch (error) {
    console.error("[lead-magnets:natal-chart] Invalid JSON body", error);
    return jsonResponse(
      {
        success: false,
        message: "Некорректное тело запроса",
      },
      {
        status: 400,
        headers: buildRateLimitHeaders(rateLimit),
      },
    );
  }

  try {
    const result = natalChartSchema.safeParse(payload);

    if (!result.success) {
      const { fieldErrors, formErrors } = result.error.flatten();
      return jsonResponse(
        {
          success: false,
          message: "Ошибка валидации",
          errors: { fieldErrors, formErrors },
        },
        {
          status: 400,
          headers: buildRateLimitHeaders(rateLimit),
        },
      );
    }

    const data: NatalChartPayload = result.data;

    await sendToTelegram(formatTelegramMessage(data));
    await captureLeadEvent("natal_chart_submitted", {
      leadType: "natal_chart",
      ...data,
    });

    return jsonResponse(
      { success: true, message: "Данные отправлены" },
      {
        status: 200,
        headers: buildRateLimitHeaders(rateLimit),
      },
    );
  } catch (error) {
    console.error("[lead-magnets:natal-chart]", error);
    return jsonResponse(
      {
        success: false,
        message: "Не удалось обработать запрос",
      },
      {
        status: 500,
        headers: buildRateLimitHeaders(rateLimit),
      },
    );
  }
}
