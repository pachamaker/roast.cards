# Architecture Design Document: ROAST.cards


## 1. Technology Stack



* **Runtime**
    * **Technology:** Node.js (Dev), Nginx (Prod)
    * **Justification:** Standard lightweight containerization.
* **Framework**
    * **Technology:** React 18
    * **Justification:** Ecosystem, declarative UI, component reusability.
* **Build Tool**
    * **Technology:** Vite
    * **Justification:** Extremely fast HMR, optimized production builds.
* **Language**
    * **Technology:** TypeScript
    * **Justification:** Type safety for critical logic (archetype calculations).
* **State**
    * **Technology:** Zustand
    * **Justification:** Lightweight state management (user answers, locale).
* **Styling**
    * **Technology:** Tailwind CSS
    * **Justification:** Mobile-first utility classes, dark mode support.
* **Motion**
    * **Technology:** Framer Motion
    * **Justification:** Complex gesture handling (swipe physics) & animations.
* **i18n**
    * **Technology:** i18next
    * **Justification:** Industry standard for localization. Async loading of locales.


## 2. Project Structure (Feature-Sliced Lite)

/ \
├── public/                  # Static assets served by Nginx \
│   ├── assets/ \
│   │   ├── archetypes/      # Optimized WebP images \
│   │   └── ui/              # Static UI elements \
│   └── locales/             # Translation JSONs (ru.json, en.json) \
├── src/ \
│   ├── app/                 # App setup, providers, routes \
│   ├── features/            # Business logic modules \
│   │   ├── quiz/            # Swipe mechanics, progress tracking \
│   │   └── result/          # Archetype calculation, sharing \
│   ├── shared/              # Reusable dumb components & utils \
│   │   ├── ui/              # Buttons, Cards, Modals \
│   │   └── lib/             # Analytics, formatters \
│   ├── data/                # Static data configuration (The "Brain") \
│   │   └── archetypes.ts    # Logic matrix and mappings \
│   └── main.tsx             # Entry point \
└── nginx.conf               # Production server config \



## 3. Localization Strategy



* **Default Locale:** ru (hardcoded initially or detected).
* **Storage:** localStorage to remember language selection.
* **Lazy Loading:** Translation files are loaded via HTTP request (/locales/{{lng}}.json) to keep the initial JS bundle small. This allows Cloudflare to cache translation files separately.


## 4. Mobile-First UX Requirements



* **Viewport:** Strict user-scalable=no (for app-like feel).
* **Height:** Usage of 100dvh to handle Safari/Chrome mobile address bars.
* **Gestures:** overscroll-behavior-y: contain on body to prevent pull-to-refresh on mobile while swiping cards.
* **Haptics:** Use navigator.vibrate (if available) on swipe interactions for tactile feedback.


## 5. Infrastructure & Caching



* **Docker:** Multi-stage build (Node build -> Nginx Alpine image).
* **Cloudflare:** Acts as Edge Cache.
* **Caching Rules:**
    * index.html: **No-Cache** (Must revalidate ETag).
    * Assets (/assets/*, *.js, *.css): **Immutable** (1 year).
    * Data (*.json): **Short TTL** (e.g., 1 hour) or hash-based if bundled.