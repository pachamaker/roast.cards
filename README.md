# ROAST.CARDS

Сатирический мобильный веб‑тест в стиле dark comic / neo‑brutalism. Пользователь свайпает карточки с вопросами и получает прожаренный архетип.

## Стек

- React 18 + Vite + TypeScript
- Tailwind CSS
- Zustand
- Framer Motion
- React Router v6
- lucide-react

## Локальный запуск

```bash
npm install
npm run dev
```

Приложение будет доступно на `http://localhost:5173`.

## Сборка и предпросмотр

```bash
npm run build
npm run preview
```

## Docker (production‑like)

```bash
docker compose up --build
```

Приложение будет доступно на `http://localhost:5173`.

## Экспорт карточек

Доступен служебный экран `http://localhost:5173/export` для пакетной генерации PNG‑картинок архетипов. Страница закрыта от индексации.

## Аналитика (GA4)

События, которые отправляются в Google Analytics:

- `intro` — показ стартового экрана.
- `quiz_start` — клик по кнопке «НАЧАТЬ».
- `quiz_started` — пользователь видит первую карточку.
- `quiz_answer` — ответ на вопрос (`card_number`, `answer`, `swipe`).
- `result_page` — показ финального результата (`title`, `id`).
- `retry_quiz` — клик «Заново».
- `social_sharing` — клик «В сторис».
- `click_on_logo` — клик по логотипу.

## Ассеты

- `public/assets/archetypes/` — изображения архетипов (`.webp` для UI, `.png` для шаринга).
- `public/assets/qrcode.png` — QR‑код на финальной карточке.
- `public/assets/favicon.png` → `public/assets/favicon.ico`.
- `public/assets/og-image-v1.png` — Open Graph.

## Структура

```text
src/
  app/          # провайдеры, глобальные стили, App
  features/     # бизнес‑логика
  shared/       # переиспользуемые компоненты/утилиты
  data/         # статические данные
```
