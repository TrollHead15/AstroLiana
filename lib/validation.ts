import { z } from "zod";

const nameSchema = z
  .string({ required_error: "Укажите имя" })
  .trim()
  .min(2, "Минимум 2 символа")
  .max(200, "Слишком длинное имя");

const emailSchema = z
  .string({ required_error: "Укажите email" })
  .trim()
  .min(1, "Укажите email")
  .email("Некорректный email");

const consentSchema = z
  .boolean({ required_error: "Необходимо согласие" })
  .refine(Boolean, "Необходимо согласие");

const dateSchema = z
  .string({ required_error: "Укажите дату рождения" })
  .trim()
  .refine((value) => {
    if (!value) {
      return false;
    }

    const date = new Date(value);
    return !Number.isNaN(date.getTime());
  }, "Некорректная дата");

const timeSchema = z
  .string({ required_error: "Укажите время рождения" })
  .trim()
  .regex(/^([0-1]?\d|2[0-3]):[0-5]\d$/, "Формат HH:MM");

const placeSchema = z
  .string({ required_error: "Укажите место рождения" })
  .trim()
  .min(2, "Укажите место рождения");

export const leadBaseSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  consent: consentSchema,
});

export const checklistSchema = leadBaseSchema;
export const guideSchema = leadBaseSchema;

export const natalChartSchema = leadBaseSchema.extend({
  birthDate: dateSchema,
  birthTime: timeSchema,
  birthPlace: placeSchema,
});

export type LeadPayload = z.infer<typeof leadBaseSchema>;
export type ChecklistPayload = z.infer<typeof checklistSchema>;
export type GuidePayload = z.infer<typeof guideSchema>;
export type NatalChartPayload = z.infer<typeof natalChartSchema>;
