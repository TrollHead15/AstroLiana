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

Создайте `.env.local` на основе `.env.local.example` и заполните ключи интеграций:

- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — отправка уведомлений в Telegram
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` — рассылка писем с PDF вложениями
- `NEXT_PUBLIC_MAPBOX_API_KEY` — подсказки городов через Mapbox
- `POSTHOG_API_KEY` / `NEXT_PUBLIC_POSTHOG_KEY` — аналитика PostHog (сервер + клиент)
- `PLAUSIBLE_DOMAIN` — подключение трекинга Plausible

## Интеграции

- ✅ API-маршруты для всех лид-магнитов с валидацией и rate limit
- ✅ Уведомления в Telegram о новых лидах
- ✅ Отправка чек-листа и гайда через Resend с PDF вложениями
- ✅ Автодополнение города в форме натальной карты через Mapbox
- ✅ Аналитика PostHog и Plausible (page view, modal, формы, письма, Telegram)
