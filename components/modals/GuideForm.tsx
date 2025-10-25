import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { LeadMagnetModal } from './LeadMagnetModal';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { checklistGuideSchema, ChecklistGuideFormData } from '@/lib/schemas/lead-magnet-schemas';

interface GuideFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideForm: React.FC<GuideFormProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChecklistGuideFormData>({
    resolver: zodResolver(checklistGuideSchema),
    defaultValues: {
      name: '',
      email: '',
      consent: false
    }
  });

  const onSubmit = async (data: ChecklistGuideFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead-magnets/guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке данных');
      }

      toast.success('Гайд отправлен на вашу почту!');
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
    <LeadMagnetModal isOpen={isOpen} onClose={handleClose} title="Получить гайд">
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

        <Checkbox
          label="Я согласен на обработку персональных данных"
          id="consent"
          error={errors.consent?.message}
          {...register('consent')}
        />

        <div className="pt-2">
          <Button type="submit" isLoading={isSubmitting}>
            Получить гайд
          </Button>
        </div>
      </form>
    </LeadMagnetModal>
  );
};
