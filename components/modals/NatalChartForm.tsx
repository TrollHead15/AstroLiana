import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { LeadMagnetModal } from './LeadMagnetModal';
import { Input } from '../ui/Input';
import { DatePickerInput } from '../ui/DatePickerInput';
import { TimeInput } from '../ui/TimeInput';
import { PlaceAutocomplete } from '../ui/PlaceAutocomplete';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { natalChartSchema, NatalChartFormData } from '@/lib/schemas/lead-magnet-schemas';

interface NatalChartFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NatalChartForm: React.FC<NatalChartFormProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<NatalChartFormData>({
    resolver: zodResolver(natalChartSchema),
    defaultValues: {
      name: '',
      email: '',
      birthDate: undefined,
      birthTime: '12:00',
      birthPlace: '',
      consent: false
    }
  });

  const onSubmit = async (data: NatalChartFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead-magnets/natal-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке данных');
      }

      toast.success('Данные успешно отправлены! Проверьте вашу почту.');
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Произошла ошибка. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <LeadMagnetModal isOpen={isOpen} onClose={handleClose} title="Получить натальную карту">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="Ваше имя"
          id="name"
          placeholder="Введите ваше имя"
          error={errors.name?.message}
          required
          {...register('name')}
        />

        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="example@mail.com"
          error={errors.email?.message}
          required
          {...register('email')}
        />

        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePickerInput
              label="Дата рождения"
              id="birthDate"
              selected={field.value || null}
              onChange={field.onChange}
              error={errors.birthDate?.message}
              required
            />
          )}
        />

        <Controller
          name="birthTime"
          control={control}
          render={({ field }) => (
            <TimeInput
              label="Время рождения"
              id="birthTime"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.birthTime?.message}
              helperText="Если не знаете — укажите 12:00"
              placeholder="12:00"
            />
          )}
        />

        <Controller
          name="birthPlace"
          control={control}
          render={({ field }) => (
            <PlaceAutocomplete
              label="Место рождения"
              id="birthPlace"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.birthPlace?.message}
              placeholder="Начните вводить название города"
              required
            />
          )}
        />

        <Checkbox
          label="Я согласен на обработку персональных данных"
          id="consent"
          error={errors.consent?.message}
          {...register('consent')}
        />

        <div className="pt-2">
          <Button type="submit" isLoading={isSubmitting}>
            Получить натальную карту
          </Button>
        </div>
      </form>
    </LeadMagnetModal>
  );
};
