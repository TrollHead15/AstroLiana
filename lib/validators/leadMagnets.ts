import { z } from "zod";

export const natalChartSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().optional(),
  birthDate: z.string().datetime().optional(),
  birthTime: z.string().optional(),
  birthPlace: z.string().optional()
});

export const checklistSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().optional()
});

export const guideSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(100),
  phone: z.string().optional()
});

export type NatalChartPayload = z.infer<typeof natalChartSchema>;
export type ChecklistPayload = z.infer<typeof checklistSchema>;
export type GuidePayload = z.infer<typeof guideSchema>;
