# 🚀 MCP Server - Быстрый старт

## Что такое MCP?

MCP (Model Context Protocol) сервер предоставляет структурированный контекст о проекте AstroLiana для AI-ассистентов, инструментов разработки и членов команды.

## Установка и запуск

### 1. Установите зависимости

```bash
npm install
```

### 2. Запустите MCP сервер

```bash
npm run mcp:dev
```

Вы увидите:
```
🚀 MCP Server for AstroLiana starting...
📁 Config loaded from: /home/engine/project/.context7/config.json
🎯 Project: AstroLiana
✅ Context ready with 11 top-level keys
```

## Быстрый тест

### Запустите тесты

```bash
npm run mcp:test
```

Это запустит 10 тестов, проверяющих все основные функции MCP сервера.

### Запустите демо

```bash
npm run mcp:demo
```

Это покажет интерактивную демонстрацию всех возможностей сервера.

## Основные команды

| Команда | Описание |
|---------|----------|
| `npm run mcp:dev` | Запустить MCP сервер |
| `npm run mcp:test` | Запустить тесты |
| `npm run mcp:demo` | Запустить демонстрацию |

## Использование в коде

### Базовое использование

```javascript
const MCPServer = require('./mcp-server');
const server = new MCPServer();

// Получить всю информацию
const context = server.getContext();

// Получить конкретное значение
const projectName = server.getContext('project.name');
// => "AstroLiana"
```

### Примеры запросов

```javascript
// Информация о проекте
server.getContext('project.name')              // "AstroLiana"
server.getContext('project.framework')         // "Next.js 14"
server.getContext('project.version')           // "1.0.0"

// Технологический стек
server.getContext('techStack.framework')       // "Next.js 14"
server.getContext('techStack.language')        // "TypeScript"
server.getContext('techStack.styling.primary') // "Tailwind CSS"

// Дизайн-система
server.getContext('designSystem.colors.primary')      // "#2D2B55"
server.getContext('designSystem.colors.background')   // "#F9F6EE"
server.getContext('designSystem.colors.accent')       // "#D4AF37"
server.getContext('designSystem.typography.headings') // { fontFamily: "Cormorant Garamond", ... }

// Стандарты кодирования
server.getContext('codingStandards.react.components.style')
// => "Functional components only"

// Требования по доступности
server.getContext('accessibility.standard')
// => "WCAG 2.2 Level AA"

// Целевые метрики производительности
server.getContext('performance.targets.lighthouse.performance')
// => "≥ 95"
```

## Доступные разделы контекста

1. **project** - Информация о проекте
2. **techStack** - Технологический стек
3. **designSystem** - Дизайн-система (цвета, шрифты, анимации)
4. **codingStandards** - Стандарты кодирования
5. **architecture** - Архитектура проекта
6. **accessibility** - Требования по доступности
7. **performance** - Метрики производительности
8. **testing** - Стратегия тестирования
9. **git** - Git workflow
10. **documentation** - Документация
11. **timestamp** - Время загрузки контекста

## Практические сценарии

### Сценарий 1: Создание нового компонента

```javascript
const server = new MCPServer();

// Получить цвета из дизайн-системы
const colors = server.getContext('designSystem.colors');
console.log(`Primary: ${colors.primary}`);

// Получить стандарты компонентов
const componentStandards = server.getContext('codingStandards.react.components');
console.log(`Style: ${componentStandards.style}`);

// Теперь создайте компонент, следуя стандартам!
```

### Сценарий 2: Настройка формы

```javascript
const server = new MCPServer();

// Узнать, какую библиотеку использовать
const formLib = server.getContext('techStack.forms.library');
const validation = server.getContext('techStack.forms.validation');

console.log(`Use ${formLib} with ${validation} validation`);
// => "Use React Hook Form with Zod validation"
```

### Сценарий 3: Проверка требований доступности

```javascript
const server = new MCPServer();

const a11yStandard = server.getContext('accessibility.standard');
const requirements = server.getContext('accessibility.requirements');

console.log(`Standard: ${a11yStandard}`);
console.log('Requirements:', requirements);
```

### Сценарий 4: Интеграция с внешними сервисами

```javascript
const server = new MCPServer();

const integrations = server.getContext('techStack.integrations');

console.log(`Email service: ${integrations.email}`);        // "Resend"
console.log(`Messaging: ${integrations.messaging}`);        // "Telegram Bot API"
console.log(`Analytics: ${integrations.analytics.join(', ')}`); // "PostHog, Plausible"
```

## Структура конфигурации

Конфигурация хранится в `.context7/config.json`:

```
.context7/
├── config.json           # Главная конфигурация (JSON)
├── architecture.md       # Описание архитектуры
├── design-system.md      # Дизайн-система
├── coding-standards.md   # Стандарты кодирования
├── overview.md           # Обзор проекта
├── quick-start.md        # Руководство для разработчиков
├── mcp-usage.md         # Подробное руководство по MCP
└── README.md            # Индекс документации
```

## Обновление контекста

Если вы изменили конфигурацию в `.context7/config.json`:

1. Сохраните изменения
2. Перезапустите MCP сервер:
   ```bash
   # Остановите текущий сервер (Ctrl+C)
   npm run mcp:dev
   ```

## Отладка

### Проверка загрузки конфигурации

```bash
node -e "console.log(JSON.stringify(require('./.context7/config.json'), null, 2))"
```

### Проверка конкретного значения

```bash
node -e "const MCP = require('./mcp-server'); const s = new MCP(); console.log(s.getContext('project.name'))"
```

### Список всех доступных ключей

```bash
node -e "const MCP = require('./mcp-server'); const s = new MCP(); console.log(Object.keys(s.getContext()))"
```

## Интеграция с AI-ассистентами

MCP сервер можно использовать с AI-ассистентами для:

- ✅ Автоматического следования стандартам проекта
- ✅ Генерации кода в соответствии с дизайн-системой
- ✅ Проверки соответствия требованиям доступности
- ✅ Использования правильных библиотек и инструментов

## Полезные ресурсы

- 📚 [Полная документация](README.md)
- 🏗️ [Архитектура](.context7/architecture.md)
- 🎨 [Дизайн-система](.context7/design-system.md)
- 💻 [Стандарты кодирования](.context7/coding-standards.md)
- 🔧 [Подробное руководство по MCP](.context7/mcp-usage.md)

## Поддержка

Если что-то не работает:

1. Убедитесь, что установлены зависимости: `npm install`
2. Проверьте наличие файла `.context7/config.json`
3. Запустите тесты: `npm run mcp:test`
4. Проверьте логи при запуске сервера

## Следующие шаги

1. ✅ Запустите `npm run mcp:demo` для ознакомления
2. ✅ Изучите `.context7/config.json`
3. ✅ Прочитайте документацию в `.context7/`
4. ✅ Начните использовать MCP в своих задачах!

---

**Версия:** 1.0.0  
**Последнее обновление:** 2024-10-23  
**Статус:** ✅ Готов к использованию
