# «Воин Света» — сайт школы шаолиньского ушу

Одностраничный сайт школы шаолиньского ушу и кунг-фу **«Воин Света»** для детей
и подростков 7–18 лет (Солнечногорск и Зеленоград / д. Голубое). Главная цель —
заявки на **бесплатную пробную тренировку**.

## Технологии

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (через официальный плагин `@tailwindcss/vite`)
- Без UI-библиотек и тяжёлых зависимостей; анимации — CSS + IntersectionObserver

## Запуск

```bash
npm install    # установить зависимости
npm run dev    # дев-сервер → http://localhost:5173
npm run build  # прод-сборка в dist/ (tsc + vite build)
npm run preview# локальный просмотр прод-сборки → http://localhost:4173
```

## Структура

```
index.html                 — SEO, OpenGraph, JSON-LD (Organization + FAQ), шрифты
src/
  content.ts               — ВЕСЬ контент и контакты (править тексты здесь)
  lead.tsx                 — контекст заявки (передача локации/комментария в форму)
  App.tsx                  — порядок секций
  components/
    Header.tsx  Hero.tsx  LeadForm.tsx  Footer.tsx  Icons.tsx  ui.tsx
    sections/              — секции лендинга (Benefits, Program, Journey,
                             Schedule, Coaches, Tradition, Camp, Parents, Faq, FinalCta)
public/
  images/hero.jpg          — атмосферное изображение (замените на реальное фото)
  favicon.svg              — энсо + печать (логотип-заглушка)
  robots.txt
```

## Контакты школы

- Телефон: **+7 963 670 06 40**
- Email: **lubov.mir@mail.ru**
- Летние сборы / Telegram: **+7 910 535 32 40**
- Солнечногорск — Детская студия Fly, Рекинцо, д. 32, стр. 5 (Вт–Пт с 15:00)
- Зеленоград / д. Голубое — Breath Fitness, Сургутский проезд, д. 1, к. 1 (Пн и Чт с 17:00)

## Куда попадают заявки

Форма заявки **работает без сервера**: после валидации она показывает состояние
«Спасибо, мы свяжемся с вами», а заявка сохраняется в `localStorage`
(ключ `voin-sveta-leads`). Чтобы получать заявки по-настоящему, подключите в
`src/components/LeadForm.tsx` (функция `onSubmit`) любой приёмник:

- свой бэкенд: `fetch("/api/leads", { method: "POST", body: ... })`;
- сервис форм (Formspree, Getform и т.п.);
- Telegram-бот или CRM по API.

## Замены перед запуском «в бой»

1. **Фото**: замените `public/images/hero.jpg` на реальную фотографию зала /
   тренировки (согласие на использование — обязательно). Постеры тренеров —
   `src/components/sections/Coaches.tsx`.
2. **Домен**: обновите `og:url`/`sitemap` в `index.html` и `robots.txt`.
3. **Цена**: на сайте указано «абонемент от 4500 ₽/мес.» — подтвердите
   актуальность у администратора и при необходимости поправьте
   `src/components/sections/Faq.tsx` и `index.html` (FAQ JSON-LD).
4. **Карта**: заглушки-карточки ведут на Яндекс.Карты; при желании замените на
   интерактивный виджет.

## Деплой

`npm run build` создаёт статический сайт в `dist/` — подходит для любого
статического хостинга (Netlify, Vercel, GitHub Pages за прокси и т.д.).
