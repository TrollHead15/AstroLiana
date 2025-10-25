import { z } from "zod";

const nameSchema = z
  .string({ required_error: "Name is required" })
  .trim()
  .min(1, "Name is required")
  .max(200, "Name is too long");

const emailSchema = z
  .string({ required_error: "Email is required" })
  .trim()
  .min(1, "Email is required")
  .email("Invalid email address");

export const checklistSchema = z.object({
  name: nameSchema,
  email: emailSchema,
});

export const guideSchema = checklistSchema;

export const natalChartSchema = checklistSchema.extend({
  birthDate: z
    .string({ required_error: "Birth date is required" })
    .trim()
    .min(1, "Birth date is required"),
  birthTime: z
    .string({ required_error: "Birth time is required" })
    .trim()
    .min(1, "Birth time is required"),
  birthPlace: z
    .string({ required_error: "Birth place is required" })
    .trim()
    .min(1, "Birth place is required"),
});

export type NatalChartPayload = z.infer<typeof natalChartSchema>;
export type LeadPayload = z.infer<typeof checklistSchema>;
