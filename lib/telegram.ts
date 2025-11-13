interface TelegramResponse {
  ok: boolean;
  result?: {
    message_id: number;
    date: number;
  };
  description?: string;
}

interface SendToTelegramResult {
  success: boolean;
  messageId?: number;
  error?: string;
}

export async function sendToTelegram(message: string): Promise<SendToTelegramResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Missing Telegram configuration: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return {
      success: false,
      error: "Telegram configuration missing"
    };
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML"
      })
    });

    if (!response.ok) {
      const errorData = (await response.json()) as TelegramResponse;
      console.error("Telegram API error:", errorData.description);
      return {
        success: false,
        error: errorData.description || "Failed to send Telegram message"
      };
    }

    const data = (await response.json()) as TelegramResponse;

    if (!data.ok) {
      console.error("Telegram API returned error:", data.description);
      return {
        success: false,
        error: data.description || "Telegram API error"
      };
    }

    return {
      success: true,
      messageId: data.result?.message_id
    };
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export function formatTelegramMessage(
  type: "natal_chart" | "checklist" | "guide",
  data: Record<string, unknown>
): string {
  const typeLabel = {
    natal_chart: "🔮 Natal Chart",
    checklist: "✓ Checklist",
    guide: "📖 Guide"
  };

  let message = `<b>${typeLabel[type]} Request</b>\n\n`;

  for (const [key, value] of Object.entries(data)) {
    const formattedKey = key.replace(/_/g, " ");
    message += `<b>${formattedKey}:</b> ${value}\n`;
  }

  return message;
}
