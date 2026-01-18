# Architecture Design Document: ROAST.cards (v2.0)


## 1. Multi-Dimensional Content Strategy

Главное изменение: переход к архитектуре **Context-Aware Content**. Каждая единица контента (текст, изображение, верстка) теперь определяется вектором: (Locale, Gender, Persona).



* **Gender:** male (hard/depressive), female (soft/shareable).
* **Locale:** ru (CIS context), en (Western context/cultural adaptation).
* **Persona:** Архетип, рассчитанный в ходе квиза.


## 2. Updated Technology Stack



* **i18n & Context:** i18next + i18next-browser-languagedetector.
    * *Change:* Использование динамических пространств имен (namespaces) для разделения ru-female, ru-male и en версий.
* **State Management:** Zustand.
    * *New State:* Добавлен UserPreferenceSlice для хранения gender и выбранного culturalContext.
* **Visual Themes:** Tailwind CSS (Configured with CSS Variables).
    * *Justification:* Позволяет менять палитру (например, с "думерского" серого на "эстетичный" пастельный) на уровне корневого класса data-theme="female".


## 3. Data Modeling: Content Schema (JSON)
Все локализации и варианты архетипов должны строго соответствовать следующей структуре. Это гарантирует, что UI сможет корректно отобразить карту независимо от языка или пола.
```json
{
  "metadata": {
    "locale": "string (ru|en)",
    "gender": "string (male|female|neutral)"
  },
  "ui": {
    "buttons": { "share": "string", "restart": "string" },
    "onboarding": { "title": "string" }
  },
  "archetypes": {
    "{archetype_id}": {
      "title": "string",
      "tagline": "string",
      "description": "string (adapted tone of voice)",
      "visual_config": {
        "theme_id": "string",
        "asset_path": "string",
        "overlay_type": "string"
      },
      "share_content": {
        "title": "string",
        "caption": "string"
      }
    }
  }
}
```

## 4. Revised Project Structure

```Bash

/
├── public/
│   ├── assets/
│   │   └── archetypes/          # Структура: /{id}/{gender}/{locale}.webp
│   └── locales/                 # JSON-файлы по схеме из п.3
├── src/
│   ├── features/
│   │   ├── personalization/     # Onboarding: выбор пола и языка
│   │   ├── quiz/                # Core: механика свайпов и скоринг
│   │   └── result/              # Logic: маппинг ответов на {archetype_id}
│   ├── shared/
│   │   ├── ui/                  # Компоненты, меняющие стиль через data-theme
│   │   └── lib/                 # ContentProvider (Asset Resolver)
│   └── data/
│       └── scoring_matrix.ts    # Математика расчета архетипов
```


## 5. Localization & Adaptation Logic


### 5.1. Asset Resolution

Приложение использует логику "мягкого отката" (Fallback):

1. Запрос: archetype_id + gender + locale.

2. Если специфический визуал для female-en отсутствует, используется neutral-en.


### 5.2. Tone of Voice Adaptation

- RU-Male: Прямая ирония, жесткий сарказм, "думерская" эстетика.

- RU-Female: Снижение токсичности, акцент на эстетичность (Instagram-friendly), самоирония вместо агрессии.

- EN-Global: Транскреация смыслов. Использование локальных западных мемов (например, замена "офисного терпилы" на "Corporate Girly").


## 6. Shareability & Viral Features (Social UX)



* **Dynamic Metadata:** Генерация OG-тегов на основе выбранного пола и архетипа.
* **Share Canvas:** Компонент ResultCard меняет свою верстку:
    * Female: Больше отступов (whitespace), чистая типографика, фокус на "эстетичность".
    * Male: Более агрессивный, "шумный" дизайн, акцент на жесткий юмор.


## 7. Infrastructure updates



* **Image Optimization:** Все изображения в WebP с поддержкой разных разрешений под ретину.
* **Caching Strategy:** * JSON-файлы локализации теперь имеют hash в имени (через Vite), чтобы мгновенно обновлять контент у пользователя при правке текстов через ИИ-пайплайн.
