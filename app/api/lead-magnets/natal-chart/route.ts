import { jsonResponse, parseJsonBody } from "@/lib/http";
import { captureServerEvent } from "@/lib/posthog";
import {
  buildRateLimitHeaders,
  checkRateLimit,
  getRequestIdentifier,
} from "@/lib/rate-limit";
import { sendTelegramNotification } from "@/lib/telegram";
import {
  natalChartSchema,
  type NatalChartPayload,
} from "@/lib/validation";

type ErrorResponse = {
  success: false;
  message: string;
  errors?: unknown;
};

type SuccessResponse = {
  success: true;
  message: string;
};

function formatTelegramMessage(payload: NatalChartPayload): string {
  return [
    "🌟 Новый лид: Натальная карта",
    `Имя: ${payload.name}`,
    `Email: ${payload.email}`,
    `Дата рождения: ${payload.birthDate}`,
    `Время: ${payload.birthTime}`,
    `Место рождения: ${payload.birthPlace}`,
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
    console.error("[lead-magnets:natal-chart] invalid JSON", error);

    const body: ErrorResponse = {
      success: false,
      message: "Некорректное тело запроса",
    };

    return jsonResponse(body, {
      status: 400,
      headers,
    });
  }

  const result = natalChartSchema.safeParse(payload);

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

  const data: NatalChartPayload = result.data;

  try {
    await sendTelegramNotification(formatTelegramMessage(data));

    await captureServerEvent("telegram_message_sent", {
      leadType: "natal_chart",
      email: data.email,
      name: data.name,
    });

    await captureServerEvent("form_submitted", {
      leadType: "natal_chart",
      email: data.email,
      name: data.name,
      birthDate: data.birthDate,
      birthTime: data.birthTime,
      birthPlace: data.birthPlace,
    });

    const body: SuccessResponse = {
      success: true,
      message: "Данные успешно отправлены",
    };

    return jsonResponse(body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("[lead-magnets:natal-chart]", error);

    const body: ErrorResponse = {
      success: false,
      message: "Не удалось обработать запрос",
    };

    return jsonResponse(body, {
      status: 500,
      headers,
    });
  }
}
