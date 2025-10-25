# Lead Magnets Application

Приложение с модальными окнами для сбора данных лид-магнитов.

## Функционал

### Три лид-магнета с формами:

1. **Натальная карта** - форма с расширенным набором полей:
   - Имя
   - Email
   - Дата рождения (date picker)
   - Время рождения (input с маской HH:mm)
   - Место рождения (автозаполнение через Mapbox)
   - Чекбокс согласия на обработку данных

2. **Чек-лист** - упрощенная форма:
   - Имя
   - Email
   - Чекбокс согласия

3. **Гайд** - упрощенная форма:
   - Имя
   - Email
   - Чекбокс согласия

## Технологии

- **Next.js** - React фреймворк
- **TypeScript** - типизация
- **React Hook Form** - управление формами
- **Zod** - валидация данных
- **Framer Motion** - анимации модальных окон
- **Tailwind CSS** - стилизация
- **react-datepicker** - выбор даты
- **react-input-mask** - маска для времени
- **react-hot-toast** - уведомления
- **Mapbox Geocoding API** - автозаполнение городов

## Установка и запуск

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` на основе `.env.example`:
```bash
cp .env.example .env
```

3. Добавьте ваш Mapbox API токен в `.env`:
```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

4. Запустите dev сервер:
```bash
npm run dev
```

5. Откройте [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
/components
  /modals
    LeadMagnetModal.tsx       # Общий компонент модалки
    NatalChartForm.tsx        # Форма натальной карты
    ChecklistForm.tsx         # Форма чек-листа
    GuideForm.tsx             # Форма гайда
  /ui
    Input.tsx                 # Текстовый input
    DatePickerInput.tsx       # Date picker
    TimeInput.tsx             # Input с маской времени
    PlaceAutocomplete.tsx     # Автозаполнение городов
    Checkbox.tsx              # Чекбокс
    Button.tsx                # Кнопка
/lib
  /schemas
    lead-magnet-schemas.ts    # Zod схемы валидации
/pages
  /api
    /lead-magnets
      natal-chart.ts          # API для натальной карты
      checklist.ts            # API для чек-листа
      guide.ts                # API для гайда
  index.tsx                   # Главная страница
  _app.tsx                    # App wrapper
/styles
  globals.css                 # Глобальные стили
```

## Особенности реализации

### Модальные окна
- Анимация через Framer Motion (slide from bottom)
- Блокировка прокрутки body при открытии
- Закрытие по Esc, клику на overlay, кнопке закрытия
- Focus trap для доступности
- Автофокус на первое поле

### Формы
- Валидация через Zod schemas
- Отображение ошибок под полями
- Loading state на кнопке отправки
- Toast уведомления об успехе/ошибке
- Reset формы после успешной отправки

### Адаптивность
- Desktop: модалка 500px width
- Mobile: full-width с padding 20px
- Адаптивная сетка для карточек лид-магнитов

### Доступность
- ARIA labels для всех полей
- Focus trap внутри модалки
- Keyboard navigation (Tab, Shift+Tab, Esc)
- Error announcements для screen readers

## API Routes

Все формы отправляют данные на соответствующие API routes:
- `/api/lead-magnets/natal-chart` - POST
- `/api/lead-magnets/checklist` - POST
- `/api/lead-magnets/guide` - POST

В текущей реализации API routes логируют данные в консоль. В продакшене здесь должна быть интеграция с:
- Email сервисом (SendGrid, Mailchimp и т.д.)
- CRM системой
- База данных для хранения лидов

## Mapbox Integration

Для работы автозаполнения городов необходим Mapbox API токен:
1. Зарегистрируйтесь на [mapbox.com](https://www.mapbox.com/)
2. Получите API токен
3. Добавьте в `.env` файл

Автозаполнение использует Mapbox Geocoding API с:
- Debounce 300ms для оптимизации запросов
- Фильтрация по типам: place, locality
- Язык: русский
- Лимит: 5 suggestions
