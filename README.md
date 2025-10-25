# AstroLiana

Современное приложение на Next.js 14 с лид-магнитами для астрологического проекта.

## Технологический стек

- **Framework:** Next.js 14 (App Router)
- **Язык:** TypeScript (strict mode)
- **UI:** Tailwind CSS, кастомная дизайн-система
- **Анимации:** GSAP, Lenis, Framer Motion
- **Формы:** React Hook Form + Zod
- **Код-стайл:** ESLint, Prettier, Husky

## Основные возможности

- Hero и About секции с адаптивным дизайном
- Секция лид-магнитов с тремя карточками и анимациями при скролле
- Контекст и модальные окна для выдачи натальной карты, чек-листа и гайда
- Поддержка prefers-reduced-motion
- Кастомные шрифты Cormorant Garamond и Inter через `next/font`

## Структура проекта

```
/app                 # App Router
/components
  /providers         # Глобальные провайдеры (Lenis и др.)
  /sections          # Секции лендинга
  /modals            # Формы лид-магнитов
  /ui                # Переиспользуемые UI компоненты и иконки
/context             # Контексты (модальные окна)
/lib                 # Утилиты, хуки, схемы валидации
/public/assets       # Статические ресурсы (изображения, PDF и т.д.)
```

## Быстрый старт

```bash
npm install
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

## Скрипты

- `npm run dev` — запуск dev-сервера
- `npm run build` — production-сборка
- `npm start` — запуск собранного приложения
- `npm run lint` — ESLint
- `npm run format` — форматирование Prettier’ом
- `npm run format:check` — проверка форматирования

## Переменные окружения

Создайте `.env.local` на основе `.env.local.example`. Дополнительные переменные будут добавлены по мере реализации интеграций.
