const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function sanitizeForHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeMessage(message: string): string {
  const sanitized = sanitizeForHtml(message);
  return sanitized.replace(/\n/g, "<br/>");
}

export async function sendMessage(chatId: string, text: string): Promise<void> {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN is not configured");
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: normalizeMessage(text),
      parse_mode: "HTML",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `Failed to send Telegram message: ${response.status} ${errorText}`.trim(),
    );
  }
}

export async function sendTelegramNotification(message: string): Promise<void> {
  if (!TELEGRAM_CHAT_ID) {
    throw new Error("TELEGRAM_CHAT_ID is not configured");
  }

  await sendMessage(TELEGRAM_CHAT_ID, message);
}
