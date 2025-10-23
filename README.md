# AstroLiana

Платформа для астрологических консультаций и услуг.

## Технологический стек

### Основные технологии
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Runtime**: Node.js

### Интеграции
- **Email**: Resend
- **Messaging**: Telegram Bot API
- **Analytics**: PostHog, Plausible
- **Maps**: Mapbox Geocoding

### Дизайн-система
- **Цвета**:
  - Primary: `#2D2B55` (мистический фиолетовый)
  - Background: `#F9F6EE` (теплый бежевый)
  - Accent: `#D4AF37` (золотой акцент)
- **Типографика**:
  - Заголовки: Cormorant Garamond
  - Текст: Inter

## Требования

- Node.js 18.x или выше
- npm или yarn

## Установка

```bash
# Клонировать репозиторий
git clone <repository-url>
cd astroliana

# Установить зависимости
npm install
# или
yarn install
```

## Переменные окружения

Создайте файл `.env.local` в корне проекта:

```env
# API Keys
RESEND_API_KEY=your_resend_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your_domain

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Запуск проекта

### Режим разработки

```bash
npm run dev
# или
yarn dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

### Production сборка

```bash
npm run build
npm start
# или
yarn build
yarn start
```

### Линтинг

```bash
npm run lint
# или
yarn lint
```

## MCP Server (Model Context Protocol)

MCP сервер предоставляет контекстную информацию о проекте для AI-ассистентов и инструментов разработки.

### Запуск MCP сервера

```bash
npm run mcp:dev
# или
yarn mcp:dev
```

### Структура конфигурации

MCP сервер использует конфигурационные файлы из директории `.context7/`:

```
.context7/
├── config.json              # Главная конфигурация
├── architecture.md          # Описание архитектуры
├── design-system.md         # Дизайн-система
└── coding-standards.md      # Стандарты кодирования
```

### Конфигурация MCP

Файл `.context7/config.json` содержит:

- **project**: Информация о проекте (название, версия, тип)
- **techStack**: Технологический стек и инструменты
- **designSystem**: Цвета, типографика, анимации
- **architecture**: Структура проекта и паттерны
- **codingStandards**: Правила написания кода
- **accessibility**: Требования по доступности (WCAG 2.2 AA)
- **performance**: Метрики производительности (Lighthouse ≥ 95)

### Использование контекста

MCP сервер предоставляет функцию `getContext()` для получения информации:

```javascript
// Получить весь контекст
getContext()

// Получить конкретный раздел
getContext('project.name')
getContext('techStack.framework')
getContext('designSystem.colors')
getContext('codingStandards.react')
```

### Обновление контекста

Для обновления контекстной информации:

1. Отредактируйте соответствующий файл в `.context7/`
2. Перезапустите MCP сервер

```bash
# Остановить сервер (Ctrl+C)
# Запустить снова
npm run mcp:dev
```

## Структура проекта

```
astroliana/
├── app/                      # Next.js App Router
│   ├── (routes)/            # Группы маршрутов
│   ├── api/                 # API endpoints
│   ├── layout.tsx           # Корневой layout
│   └── page.tsx             # Главная страница
├── components/              # React компоненты
│   ├── ui/                  # UI примитивы
│   ├── forms/               # Компоненты форм
│   ├── layout/              # Layout компоненты
│   └── features/            # Специфичные компоненты
├── lib/                     # Утилиты и хелперы
│   ├── utils.ts             # Общие утилиты
│   ├── validations.ts       # Zod схемы
│   └── api/                 # API клиенты
├── hooks/                   # Пользовательские React hooks
├── types/                   # TypeScript типы
├── config/                  # Конфигурационные файлы
├── public/                  # Статические файлы
├── .context7/               # MCP конфигурация
│   ├── config.json
│   ├── architecture.md
│   ├── design-system.md
│   └── coding-standards.md
└── mcp-server.js            # MCP сервер
```

## Архитектура

### Server Components (по умолчанию)

Next.js 14 использует Server Components по умолчанию. Используйте их для:
- Статического контента
- Получения данных из базы данных
- Доступа к backend ресурсам
- Уменьшения размера клиентского JavaScript

### Client Components

Добавляйте `'use client'` только когда нужны:
- Browser APIs (localStorage, window)
- React hooks (useState, useEffect)
- Обработчики событий
- Библиотеки, использующие browser features

## Стандарты кодирования

### TypeScript

- Включен strict mode
- Всегда указывайте типы для функций и компонентов
- Используйте type inference где возможно

### React

- Только функциональные компоненты
- Named exports для компонентов (кроме pages)
- Server Components по умолчанию

### Стилизация

- Tailwind CSS utility-first подход
- Mobile-first responsive design
- Framer Motion для анимаций

### Формы

- React Hook Form для state management
- Zod для валидации
- Типизация через `z.infer<>`

Подробнее см. `.context7/coding-standards.md`

## Требования по доступности

Проект соответствует стандарту **WCAG 2.2 Level AA**:

- ✅ Семантический HTML
- ✅ ARIA labels где необходимо
- ✅ Полная поддержка клавиатурной навигации
- ✅ Видимые индикаторы фокуса
- ✅ Контрастность текста ≥ 4.5:1
- ✅ Поддержка screen readers
- ✅ Уважение prefers-reduced-motion

## Требования по производительности

Целевые метрики **Lighthouse**:

- Performance: **≥ 95**
- Accessibility: **≥ 95**
- Best Practices: **≥ 95**
- SEO: **≥ 95**

**Core Web Vitals**:
- LCP (Largest Contentful Paint): **< 2.5s**
- FID (First Input Delay): **< 100ms**
- CLS (Cumulative Layout Shift): **< 0.1**

## Git Workflow

### Ветки

- `main` - production-ready код
- `develop` - разработка
- `feat/*` - новые features
- `fix/*` - исправления багов

### Commit сообщения

Используйте [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: добавить компонент профиля пользователя
fix: исправить наложение меню навигации
docs: обновить API документацию
style: форматирование кода
refactor: упростить логику валидации форм
test: добавить тесты для контактной формы
chore: обновить зависимости
```

## Деплой

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Деплой происходит автоматически при push в `main`

### Другие платформы

Проект может быть задеплоен на любой платформе, поддерживающей Next.js:
- Netlify
- AWS Amplify
- Google Cloud Run
- Self-hosted с Docker

## Документация

- [Архитектура](.context7/architecture.md)
- [Дизайн-система](.context7/design-system.md)
- [Стандарты кодирования](.context7/coding-standards.md)

## Лицензия

Проприетарное ПО - все права защищены.

## Контакты

По вопросам разработки обращайтесь к команде разработки.

---

**Последнее обновление**: 2024
