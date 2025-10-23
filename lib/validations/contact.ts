import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Некорректный email адрес"),
  phone: z
    .string()
    .regex(
      /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      "Некорректный номер телефона"
    )
    .optional(),
  message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
