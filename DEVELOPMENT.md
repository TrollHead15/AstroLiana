# Development Guide

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Создание файла окружения
cp .env.local.example .env.local

# Запуск dev сервера
npm run dev
```

## Структура проекта

```
/app                          # Next.js App Router
  layout.tsx                  # Root layout с шрифтами
  page.tsx                    # Главная страница
  globals.css                 # Глобальные стили

/components
  /ui                         # Переиспользуемые UI компоненты
    Button.tsx                # Пример: кнопка с вариантами
  /sections                   # Секции лендинга (Hero, Features, и т.д.)
  /modals                     # Модальные окна

/lib
  /utils                      # Утилиты
    cn.ts                     # className merger (clsx + tailwind-merge)
  /validations                # Zod схемы валидации
    contact.ts                # Пример: схема контактной формы
  /hooks                      # Кастомные React хуки
    useMediaQuery.ts          # Пример: media query хук

/public
  /assets                     # PDF, изображения
  /icons                      # SVG иконки
```

## Conventions

### Компоненты

```tsx
// Используйте forwardRef для компонентов с ref
import { forwardRef } from "react";

const MyComponent = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("base-styles", className)} {...props} />
    );
  }
);

MyComponent.displayName = "MyComponent";
export default MyComponent;
```

### Стили

```tsx
// Используйте cn() для объединения классов
import { cn } from "@/lib/utils";

<div
  className={cn("base-class", conditionalClass && "conditional", className)}
/>;
```

### Формы

```tsx
// Используйте React Hook Form + Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/lib/validations/contact";

const form = useForm({
  resolver: zodResolver(contactFormSchema),
});
```

## Доступные библиотеки

- **Framer Motion** - анимации React компонентов
- **GSAP** - продвинутые анимации
- **Lenis** - плавный скролл
- **React Hook Form** - управление формами
- **Zod** - валидация данных

## Design Tokens

### Цвета (Tailwind)

- `bg-primary` / `text-primary` - #2D2B55 (индиго)
- `bg-background` / `text-background` - #F9F6EE (кремовый)
- `bg-accent` / `text-accent` - #D4AF37 (золотой)
- `text-foreground` - #171717 (темно-серый)

### Шрифты

- `font-heading` - Cormorant Garamond (заголовки)
- `font-body` - Inter (основной текст)

### Размеры текста

- `text-display` - clamp(2.5rem, 5vw + 1rem, 4.5rem)
- `text-h1` - clamp(2rem, 4vw + 0.5rem, 3.5rem)
- `text-h2` - clamp(1.75rem, 3vw + 0.5rem, 2.5rem)
- `text-h3` - clamp(1.5rem, 2.5vw + 0.5rem, 2rem)
- `text-body-lg` - clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)
- `text-body` - clamp(1rem, 1vw + 0.5rem, 1.125rem)

## Команды

```bash
# Разработка
npm run dev              # Запуск dev сервера

# Проверки
npm run lint             # ESLint
npm run format           # Форматирование Prettier
npm run format:check     # Проверка форматирования
npx tsc --noEmit        # Проверка типов

# Сборка
npm run build            # Продакшн сборка
npm start                # Запуск продакшн сервера
```

## Pre-commit hooks

При коммите автоматически выполняется:

1. ESLint с автофиксом
2. Prettier форматирование

Настроено через Husky + lint-staged.
