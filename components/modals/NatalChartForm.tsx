"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button, Checkbox, GeocodingInput, Input } from "@/components/ui";
import { LeadMagnetModal } from "@/components/modals/LeadMagnetModal";
import { useAnalytics } from "@/components/providers";
import {
  natalChartSchema,
  type NatalChartPayload,
} from "@/lib/validation";

interface NatalChartFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultValues: NatalChartPayload = {
  name: "",
  email: "",
  birthDate: "",
  birthTime: "12:00",
  birthPlace: "",
  consent: false,
};

export const NatalChartForm = ({ isOpen, onClose }: NatalChartFormProps) => {
  const { trackEvent } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm<NatalChartPayload>({
    resolver: zodResolver(natalChartSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      trackEvent("modal_opened", { leadType: "natal_chart" });
    } else {
      reset(defaultValues);
    }
  }, [isOpen, reset, trackEvent]);

  const submitHandler = async (values: NatalChartPayload) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead-magnets/natal-chart", {
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
              setError(field as keyof NatalChartPayload, {
                type: "server",
                message: first as string,
              });
            }
          });
        }

        const message =
          payload?.message ?? "Не удалось отправить данные. Попробуйте позже";
        toast.error(message);
        return;
      }

      trackEvent("form_submitted", { leadType: "natal_chart" });
      toast.success("Данные отправлены! Проверьте Telegram");
      onClose();
      reset(defaultValues);
    } catch (error) {
      console.error("[NatalChartForm] submit", error);
      toast.error("Не удалось отправить данные. Попробуйте позже");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LeadMagnetModal isOpen={isOpen} onClose={onClose} title="Получить натальную карту">
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

        <Input
          label="Дата рождения"
          type="date"
          required
          error={errors.birthDate?.message}
          {...register("birthDate")}
        />

        <Input
          label="Время рождения"
          type="time"
          required
          helperText="Если не знаете — укажите 12:00"
          error={errors.birthTime?.message}
          {...register("birthTime")}
        />

        <Controller
          control={control}
          name="birthPlace"
          render={({ field }) => (
            <GeocodingInput
              label="Место рождения"
              placeholder="Начните вводить город"
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.birthPlace?.message}
            />
          )}
        />

        <Checkbox
          label="Я согласен на обработку персональных данных"
          error={errors.consent?.message}
          {...register("consent")}
        />

        <div className="pt-2">
          <Button type="submit" variant="accent" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Отправляем..." : "Получить натальную карту"}
          </Button>
        </div>
      </form>
    </LeadMagnetModal>
  );
};
