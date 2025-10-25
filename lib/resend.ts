import path from "path";
import { readFile } from "fs/promises";
import { Resend } from "resend";

import ChecklistEmail from "@/emails/ChecklistEmail";
import GuideEmail from "@/emails/GuideEmail";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "AstroLiana <no-reply@astroliana.com>";

let client: Resend | null = null;
const attachmentCache = new Map<string, string>();

function ensureClient(): Resend {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  if (!client) {
    client = new Resend(RESEND_API_KEY);
  }

  return client;
}

async function readPdfBase64(filename: string): Promise<string> {
  const cached = attachmentCache.get(filename);
  if (cached) {
    return cached;
  }

  const filePath = path.join(process.cwd(), "public", "assets", filename);
  const file = await readFile(filePath);
  const content = file.toString("base64");
  attachmentCache.set(filename, content);
  return content;
}

interface SendEmailOptions {
  email: string;
  name: string;
}

export async function sendChecklistEmail({ email, name }: SendEmailOptions) {
  const resend = ensureClient();
  const attachment = await readPdfBase64("checklist.pdf");

  await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: email,
    subject: "Ваш чек-лист: Лунный знак за 5 минут",
    react: ChecklistEmail({ name }),
    attachments: [
      {
        filename: "checklist.pdf",
        content: attachment,
        contentType: "application/pdf",
      },
    ],
  });
}

export async function sendGuideEmail({ email, name }: SendEmailOptions) {
  const resend = ensureClient();
  const attachment = await readPdfBase64("guide.pdf");

  await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: email,
    subject: "Ваш гайд: 3 триггера в отношениях",
    react: GuideEmail({ name }),
    attachments: [
      {
        filename: "guide.pdf",
        content: attachment,
        contentType: "application/pdf",
      },
    ],
  });
}
