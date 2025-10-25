import { z } from 'zod';

export const natalChartSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  birthDate: z.date({ required_error: 'Укажите дату рождения' }),
  birthTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Формат HH:mm'),
  birthPlace: z.string().min(3, 'Укажите город'),
  consent: z.boolean().refine(val => val === true, 'Необходимо согласие')
});

export const checklistGuideSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  consent: z.boolean().refine(val => val === true, 'Необходимо согласие')
});

export type NatalChartFormData = z.infer<typeof natalChartSchema>;
export type ChecklistGuideFormData = z.infer<typeof checklistGuideSchema>;
