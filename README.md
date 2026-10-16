# TARANG'26 – Event & Festival Website

A responsive, animated website for a 3-day tech and cultural festival, built for the Pixel Wizard 24-hour web development competition.

## Features
- Day-wise schedule with day and track filters
- Event detail pages with problem statement, rules, judging, prizes and what to carry (hash routing, no router library)
- Activities, venue map (inline SVG), rules and eligibility, FAQ
- Registration form with validation, saved in localStorage
- "Ask Tarang" doubt assistant: rule-based, answers from the site's own data (English and Hinglish), no external API
- Live countdown, scroll progress, accessible and responsive UI, reduced-motion support

## Tech Stack
HTML, CSS, React (Vite), Tailwind CSS and Vanilla JavaScript only. No other libraries.

## Run Locally
```bash
npm install
npm run dev
```
Build for production: `npm run build`

## Project Structure
- `src/components` – UI sections and widgets
- `src/hooks` – custom hooks (countdown, hash routing, assistant)
- `src/utils` – answer engine for the assistant
- `src/data/eventData.js` – all festival content in one place

## Team
Team name: xyz