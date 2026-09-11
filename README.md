# «Воин Света» — сайт школы шаолиньского ушу

Одностраничный сайт школы шаолиньского ушу и кунг-фу **«Воин Света»** для детей
и подростков 7–18 лет (Солнечногорск и Зеленоград / д. Голубое). Главная цель —
заявки на **бесплатную пробную тренировку**.

Результаты последнего аудита и список улучшений — в [AUDIT.md](AUDIT.md).

## Технологии

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (через официальный плагин `@tailwindcss/vite`)
- Без UI-библиотек и тяжёлых зависимостей; анимации — CSS + IntersectionObserver
- Чат-бот «администратор» — чистый frontend, без API

## Запуск

```bash
npm install      # установить зависимости
npm run dev      # дев-сервер → http://localhost:5173
npm run build    # прод-сборка в dist/ (tsc + vite build)
npm run preview  # локальный просмотр прод-сборки → http://localhost:4173
npm run build:pages  # сборка для GitHub Pages (base=/voin-sveta/, 404.html, .nojekyll)
```

## Деплой на GitHub Pages

Деплой автоматизирован через GitHub Actions (`.github/workflows/deploy-pages.yml`):

1. При каждом push в `main` сайт собирается и публикуется на
   `https://<владелец>.github.io/voin-sveta/` (base подставляется автоматически).
2. Один раз включите Pages: **Settings → Pages → Source: GitHub Actions**
   (или выполните `gh api repos/<владелец>/voin-sveta/pages -X POST -f build_type=workflow`).
3. Для ручного запуска: вкладка **Actions → Deploy to GitHub Pages → Run workflow**.

Локальная проверка Pages-сборки: `npm run build:pages && npx vite preview --base=/voin-sveta/`.

Если переименуете репозиторий или заведёте свой домен — обновите canonical/og:url
в `index.html` и ссылки в `public/sitemap.xml`, `public/robots.txt`.

## Структура

```
index.html                 — SEO, OpenGraph, JSON-LD (Organization + FAQ), шрифты, preload hero
src/
  content.ts               — ВЕСЬ контент: контакты, цены, FAQ, база знаний чат-бота
  lead.tsx                 — контекст заявки (передача локации/комментария в форму)
  App.tsx                  — порядок секций + подключение чат-бота
  components/
    Header.tsx  Hero.tsx  LeadForm.tsx  ChatBot.tsx  Footer.tsx  Icons.tsx  ui.tsx
    sections/              — Benefits, Program, Journey, Pricing, Schedule,
                             Coaches, Tradition, Camp, Parents, Faq, FinalCta
scripts/postbuild.cjs      — 404.html + .nojekyll для GitHub Pages
public/
  images/hero.jpg          — атмосферное изображение (замените на реальное фото)
  favicon.svg              — энсо + печать (логотип-заглушка)
  robots.txt  sitemap.xml  .nojekyll
.github/workflows/deploy-pages.yml
```

## Ключевые блоки сайта

- **Цены**: пробная — 0 ₽; акция набора — абонемент в новые группы
  **от 3 900 ₽/мес** вместо обычных ~~от 4 900 ₽/мес~~, «торопитесь — идёт набор»,
  подробности по телефону.
- **Форма заявки**: телефон — обязателен; имя, email, локация, комментарий — по
  желанию. После отправки — «Спасибо, мы свяжемся с вами».
- **Чат-бот «администратор»** (без API): отвечает на основные вопросы (цены,
  расписание, возраст, безопасность, сборы, тренеры…), предлагает оставить
  заявку или позвонить тренеру. База знаний — `CHAT_RULES` в `src/content.ts`.
- **Прямая связь с тренером**: на все звонки по факту отвечает тренер
  Александр — этот акцент есть в чате, форме, CTA и FAQ.

## Контакты школы

- Телефон: **+7 963 670 06 40** (отвечает тренер Александр)
- Email: **lubov.mir@mail.ru**
- Летние сборы / Telegram: **+7 910 535 32 40**
- Солнечногорск — Детская студия Fly, Рекинцо, д. 32, стр. 5 (Вт–Пт с 15:00)
- Зеленоград / д. Голубое — Breath Fitness, Сургутский проезд, д. 1, к. 1 (Пн и Чт с 17:00)

## Куда попадают заявки

Форма **работает без сервера**: после валидации показывает «Спасибо, мы
свяжемся с вами», заявка сохраняется в `localStorage` (ключ `voin-sveta-leads`).
Чтобы получать заявки по-настоящему, подключите в
`src/components/LeadForm.tsx` (функция `onSubmit`) приёмник: свой бэкенд
(`fetch("/api/leads", …)`), сервис форм (Formspree/Getform), Telegram-бот или CRM.

## Замены перед запуском «в бой»

1. **Фото**: замените `public/images/hero.jpg` на реальную фотографию зала /
   тренировки (согласие получено). Аватары тренеров —
   `src/components/sections/Coaches.tsx`.
2. **Цена**: акция «от 3 900 ₽/мес» помечена как временная — не забудьте
   обновить/снять её после набора (`PRICE_OLD`, `PRICE_NEW` в `src/content.ts`
   и текст FAQ в `index.html`).
3. **Аналитика**: добавьте Яндекс.Метрику/GA4 в `index.html`.
4. **Форма**: подключите CRM/бэкенд (см. выше).
