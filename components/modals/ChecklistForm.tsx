"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button, Checkbox, Input } from "@/components/ui";
import { LeadMagnetModal } from "@/components/modals/LeadMagnetModal";
import { useAnalytics } from "@/components/providers";
import { checklistSchema, type LeadPayload } from "@/lib/validation";

interface ChecklistFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues: LeadPayload = {
  name: "",
  email: "",
  consent: false,
};

export const ChecklistForm = ({ isOpen, onClose }: ChecklistFormProps) => {
  const { trackEvent } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LeadPayload>({
    resolver: zodResolver(checklistSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      trackEvent("modal_opened", { leadType: "checklist" });
    } else {
      reset(defaultValues);
    }
  }, [isOpen, reset, trackEvent]);

  const submitHandler = async (values: LeadPayload) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead-magnets/checklist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = await response.json().catch(() => ({ success: false }));

      if (!response.ok || !payload?.success) {
        if (payload?.errors?.fieldErrors) {
          Object.entries(payload.errors.fieldErrors).forEach(([field, message]) => {
            const [first] = Array.isArray(message) ? message : [];
            if (first) {
              setError(field as keyof LeadPayload, {
                type: "server",
                message: first as string,
              });
            }
          });
        }

        const message =
          payload?.message ?? "Не удалось отправить письмо. Попробуйте позже";
        toast.error(message);
        return;
      }

      trackEvent("form_submitted", { leadType: "checklist" });
      trackEvent("email_sent", { leadType: "checklist" });
      toast.success("Чек-лист отправлен на указанный email");
      onClose();
      reset(defaultValues);
    } catch (error) {
      console.error("[ChecklistForm] submit", error);
      toast.error("Не удалось отправить письмо. Попробуйте позже");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LeadMagnetModal isOpen={isOpen} onClose={onClose} title="Получить чек-лист">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
        <Input
          label="Ваше имя"
          placeholder="Введите ваше имя"
          required
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="example@mail.com"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <Checkbox
          label="Я согласен на обработку персональных данных"
          error={errors.consent?.message}
          {...register("consent")}
        />

        <div className="pt-2">
          <Button type="submit" variant="accent" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Отправляем..." : "Отправить чек-лист"}
          </Button>
        </div>
      </form>
    </LeadMagnetModal>
  );
};
