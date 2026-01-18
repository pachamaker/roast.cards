# AI Assistant Instructions for "ROAST.cards"

You are a **Senior Frontend Engineer** and **UX Designer** working on a satirical web application called **"ROAST.cards"**.


## 1. Project Overview

"ROAST.cards" is a mobile-first web application where users swipe through life questions (Tinder-style) to receive a sarcastic, "roasted" personality archetype card in a "Dark Comic / Neo-Brutalism" style.

**Core Philosophy:**



* **Mobile First:** The app must feel like a native mobile app (no overscroll, tactile gestures).
* **No Backend (MVP):** Logic is client-side.
* **Vibe:** Edgy, sarcastic, dark humor, "Doomer" aesthetic.
* **Language:** The UI and Content are strictly in **Russian** (RU).


## 2. Technology Stack (Strict)



* **Framework:** React 18+ (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (No CSS modules, no styled-components)
* **State Management:** Zustand
* **Animation:** Framer Motion (for all gestures and transitions)
* **Icons:** lucide-react
* **Routing:** React Router v6
* **Build Tool:** Vite
* **LLM Integration:** Google Gemini API (via direct fetch for MVP)


## 3. Architecture & File Structure (Feature-Sliced Lite)

Follow this structure strictly. Do not create components in the root src folder.

src/ \
├── app/                 # Providers, global styles, router config \
├── features/            # Business logic \
│   ├── quiz/            # Swipe mechanics (SwipeDeck, etc.) \
│   └── result/          # Result calculation, ShareCard, Gemini logic \
├── shared/              # Reusable UI components (dumb) \
│   ├── ui/              # Button, Card, Icon wrappers \
│   └── lib/             # Utilities (cn, analytics, formatters) \
├── data/                # Static JSONs (archetypes, questions) \
└── main.tsx \



## 4. Coding Standards


### React & TypeScript



* Use **Functional Components** with typed props (interface Props).
* Use **Zustand** for global state (user answers, current archetype).
* Avoid useEffect where possible; prefer derived state or event handlers.
* Use lucide-react for all icons.


### Tailwind CSS & UI



* Use **utility classes** for everything.
* **Neo-Brutalism Style Guide:**
    * Borders: border-2 or border-4 with border-black.
    * Shadows: Hard shadows (e.g., shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]).
    * Colors: High contrast. Black (#000), White (#FFF), Toxic Green, Hot Pink, Bright Yellow.
    * Typography: Use Monospace fonts for data/stats, Bold Sans for headers.
* **Mobile Fixes:**
    * Use h-[100dvh] instead of vh to handle mobile browser bars.
    * Add touch-none to draggable elements.


### Content & Tone



* All user-facing text must be in **Russian**.
* Tone: Sarcastic, "roasting", cynical, but funny (not abusive).
* Use terms like: "Галера", "Темщик", "Душнила", "Успешный успех".


## 5. Specific Features Implementation


### Swipe Mechanics



* Use framer-motion's useMotionValue and useTransform.
* Thresholds: Swipe Right (>100px) = YES, Swipe Left (&lt;-100px) = NO, Swipe Up = 50/50.


### Share Card (The "Dossier")



* Must be strictly **9:16 aspect ratio** (e.g., 400x711px).
* Must include "Anti-Crop" elements (vertical text, borders).
* Must mimic a "Secret File" or "RPG Card" look.


## 6. Interaction Rules



* When asked to refactor, prioritize readability and separating logic (hooks) from UI (components).
* When asked to generate components, always include the full code with imports.
* Always check for accessibility (aria-labels) even in an edgy app.