# Техническое задание (ТЗ) — Balance Pay Next

> Живой документ-чеклист для AI-агентов и разработчиков.
> Каждый раздел пронумерован — можно ссылаться на конкретные пункты (`§1.2`, `§3.4` и т.д.).
> Статусы: ⬜ — не начато, 🔲 — в процессе, ✅ — готово.

---

## Текущее состояние проекта

| Параметр | Значение |
|----------|----------|
| Фреймворк | Next.js 16 (App Router, React Compiler) |
| React | 19 (RSC by default) |
| Стилизация | Tailwind CSS v4 + shadcn/ui (new-york, stone) |
| Язык | TypeScript (strict) |
| Менеджер пакетов | pnpm |
| Данные | Моки (JSON), без API |
| Авторизация | Нет |
| Тесты | Нет |
| i18n | Нет (тексты смешаны RU/EN) |

### Маршруты

| Путь | Статус | Описание |
|------|--------|----------|
| `/` | ⬜ Мок | Dashboard — виджеты, графики, таблица активов |
| `/transactions` | ⬜ Мок | Список транзакций из `data.json` |
| `/funds-connect` | ⬜ Шаблон | Шаблон, пока не трогать |
| `/cards` | ⬜ Мок | Финансовый дашборд карт |
| `/new-workspace` | ⬜ Мок | Создание нового workspace |
| `/profile` | ⬜ Мок | Настройки профиля (форма, KYC) |
| `/profile/account` | ⬜ | Настройки аккаунта |
| `/profile/whitelist` | ⬜ | Белый список адресов |
| `/profile/appearance` | ⬜ | Внешний вид (тема) |
| `/profile/notifications` | ⬜ | Уведомления |
| `/profile/sessions` | ⬜ | Сессии / устройства |

---

## §1. Типизация и общие типы

> **Цель:** Вынести переиспользуемые типы из компонентов в `src/types/`, обеспечить единый контракт данных.

- [x] **§1.1** Создать `src/types/index.ts` — точка реэкспорта всех типов.
- [x] **§1.2** Создать `src/types/transaction.ts` — типы транзакций:
  ```
  Transaction, TransactionType ('deposit' | 'withdraw' | 'send' | 'receive' | 'swap'),
  TransactionStatus ('completed' | 'pending' | 'failed'),
  TransactionFilters
  ```
- [x] **§1.3** Создать `src/types/user.ts` — типы пользователя:
  ```
  User, UserProfile, KYCStatus ('none' | 'pending' | 'verified' | 'rejected')
  ```
- [x] **§1.4** Создать `src/types/wallet.ts` — типы кошелька/актива:
  ```
  Asset, Wallet, Currency, CurrencyCode
  ```
- [x] **§1.5** Создать `src/types/workspace.ts` — типы workspace:
  ```
  Workspace, WorkspaceType ('personal' | 'cards' | 'business')
  ```
- [x] **§1.6** Создать `src/types/api.ts` — общие типы ответов API:
  ```
  ApiResponse<T>, PaginatedResponse<T>, ApiError
  ```
- [x] **§1.7** Заменить inline-типы в компонентах (напр. `assets-table.tsx`, `transactions-list.tsx`) на импорты из `src/types/`.

---

## §2. Слой данных и сервисы

> **Цель:** Создать абстракцию для работы с данными. Сейчас — моки, потом — реальный API. Компоненты не должны знать об источнике данных.

- [ ] **§2.1** Создать `src/services/api-client.ts` — базовый HTTP-клиент:
  ```
  - baseURL из env (NEXT_PUBLIC_API_URL)
  - Обработка ошибок (ApiError)
  - Автоподстановка токена авторизации (когда будет §3)
  - Типизированные методы: get<T>, post<T>, put<T>, delete<T>
  ```
- [ ] **§2.2** Создать `src/services/transactions.ts`:
  ```
  getTransactions(filters?: TransactionFilters): Promise<PaginatedResponse<Transaction>>
  getTransactionById(id: string): Promise<Transaction>
  ```
  Пока внутри — чтение из `data.json`, потом замена на API-вызовы.
- [ ] **§2.3** Создать `src/services/user.ts`:
  ```
  getCurrentUser(): Promise<User>
  updateProfile(data: Partial<UserProfile>): Promise<User>
  getKYCStatus(): Promise<KYCStatus>
  ```
- [ ] **§2.4** Создать `src/services/wallet.ts`:
  ```
  getAssets(): Promise<Asset[]>
  getWalletBalance(): Promise<Wallet>
  ```
- [ ] **§2.5** Создать `src/services/workspace.ts`:
  ```
  getWorkspaces(): Promise<Workspace[]>
  createWorkspace(type: WorkspaceType): Promise<Workspace>
  switchWorkspace(id: string): Promise<void>
  ```
- [ ] **§2.6** Создать `.env.example` с перечнем переменных:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:3001/api
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  ```
- [ ] **§2.7** Обновить `src/app/(app)/transactions/page.tsx` — заменить `fs.readFile` на вызов сервиса из §2.2.

---

## §3. Авторизация и защита маршрутов

> **Цель:** Реализовать авторизацию пользователей, защитить приватные маршруты.

- [ ] **§3.1** Определить стратегию авторизации (JWT / Session / OAuth) — требует обсуждения с командой.
- [ ] **§3.2** Создать `src/lib/auth.ts`:
  ```
  - getSession(): серверная функция получения текущей сессии
  - signIn(credentials): вход
  - signOut(): выход
  - refreshToken(): обновление токена
  ```
- [ ] **§3.3** Создать `src/middleware.ts`:
  ```
  - Проверка авторизации на всех маршрутах (app)
  - Редирект неавторизованных на /login
  - Пропуск публичных маршрутов (/login, /register, /forgot-password)
  ```
- [ ] **§3.4** Создать страницы авторизации:
  ```
  src/app/(auth)/login/page.tsx
  src/app/(auth)/register/page.tsx
  src/app/(auth)/forgot-password/page.tsx
  ```
  Route group `(auth)` — отдельный layout без sidebar/header.
- [ ] **§3.5** Обновить `UserMenu` (`src/components/layout/header/user-menu.tsx`) — реальные данные пользователя, кнопка выхода.
- [ ] **§3.6** Обновить `api-client.ts` (§2.1) — автоматическое добавление токена в заголовки.

---

## §4. Рефакторинг компонентов

> **Цель:** Привести структуру компонентов к единообразию, устранить дублирование.

- [x] **§4.1** Перенести `src/components/CardActionMenus.tsx` → `src/components/cards/card-action-menus.tsx`. Обновить все импорты.
- [x] **§4.2** Перенести `src/components/custom-date-range-picker.tsx` → `src/components/shared/date-range-picker.tsx`. Обновить импорт в `cards/page.tsx`.
- [x] **§4.3** Консолидировать компоненты Cards:
  ```
  Перенести src/app/(app)/cards/components/*.tsx → src/components/cards/
  Оставить в cards/page.tsx только компоновку.
  Создать src/components/cards/index.ts с реэкспортами.
  ```
- [x] **§4.4** Декомпозировать `assets-table.tsx` (1187 строк → 7 файлов):
  ```
  src/components/dashboard/assets-table/
    index.tsx          — основной компонент (~230 строк)
    columns.tsx        — определение колонок ColumnDef<Asset>[]
    toolbar.tsx        — десктопная панель фильтров
    mobile-filters.tsx — мобильные фильтры (Sheet)
    pagination.tsx     — пагинация
    types.ts           — AssetsFilterState, CurrencyTypeFilter
    data.ts            — мок-данные, CSV-экспорт, getCurrencyType
  ```
- [x] **§4.5** Декомпозировать `transactions-list.tsx` (1142 строки → 7 файлов):
  ```
  src/components/transactions/transactions-list/
    index.tsx          — основной компонент (~230 строк)
    columns.tsx        — определение колонок ColumnDef<Transaction>[]
    toolbar.tsx        — десктопная панель фильтров
    mobile-filters.tsx — мобильные фильтры (Sheet)
    pagination.tsx     — пагинация
    types.ts           — TransactionsFilterState
    utils.ts           — formatAmountParts, formatDateParts, CSV-экспорт
  ```
- [ ] **§4.6** Убрать закомментированный код:
  - `nav-main.tsx` — закомментированные пункты меню (Cards, Buy & Sell, Verification).
  - `app-sidebar.tsx` — закомментированные элементы дропдауна.
  Вместо комментирования — управлять видимостью через конфиг или feature flags.
- [x] **§4.7** Стандартизировать экспорты: все модули компонентов (`dashboard/`, `cards/`, `transactions/`, `shared/`) должны иметь `index.ts` с именованными экспортами.

---

## §5. Навигация и маршруты

> **Цель:** Централизовать конфигурацию навигации, убрать дублирование.

- [ ] **§5.1** Создать `src/config/navigation.ts` — единый источник истины для навигации:
  ```ts
  type NavItem = {
    title: string
    href: string
    icon: ComponentType
    iconActive?: ComponentType
    badge?: string
    disabled?: boolean
    visible?: boolean  // для feature flags
  }
  ```
  Заменить массив `navItems` в `nav-main.tsx` на импорт из конфига.
- [ ] **§5.2** Объединить `src/lib/page-titles.ts` с `navigation.ts` — заголовки страниц должны генерироваться из того же конфига.
- [ ] **§5.3** Создать `src/config/sidebar-nav.ts` — конфигурация боковой навигации Settings:
  ```
  Перенести массив items из src/app/(app)/profile/components/sidebar-nav.tsx в конфиг.
  ```
- [ ] **§5.4** (Опционально) Создать `src/config/index.ts` — общий конфиг приложения:
  ```
  APP_NAME, APP_DESCRIPTION, DEFAULT_THEME, SUPPORTED_CURRENCIES
  ```

---

## §6. State Management

> **Цель:** Определить подход к управлению состоянием по мере роста приложения.

- [ ] **§6.1** Для серверных данных — внедрить `@tanstack/react-query` (или SWR):
  ```
  - Кэширование запросов
  - Автоматическая инвалидация
  - Optimistic updates
  - Провайдер в корневом layout
  ```
- [ ] **§6.2** Для клиентского состояния — оценить необходимость:
  ```
  - Zustand (если > 3 глобальных состояний)
  - Или React Context (если состояний мало)
  ```
  Сейчас используется Context для Header и Sidebar — этого может быть достаточно на первое время.
- [ ] **§6.3** Создать `src/providers/` — папка для провайдеров:
  ```
  src/providers/
    query-provider.tsx    — TanStack Query Provider
    index.tsx             — композиция всех провайдеров
  ```
  Перенести провайдеры из `layout.tsx` (ThemeProvider, TooltipProvider) в единый `AppProviders`.

---

## §7. Обработка ошибок и UX

> **Цель:** Единообразная обработка ошибок, loading-состояния, пустые состояния.

- [ ] **§7.1** Создать `src/app/(app)/error.tsx` — глобальный обработчик ошибок для route group (app).
- [ ] **§7.2** Создать `src/app/(app)/loading.tsx` — глобальный loading-скелетон.
- [ ] **§7.3** Создать `src/app/(app)/not-found.tsx` — страница 404.
- [ ] **§7.4** Создать `src/components/shared/empty-state.tsx` — компонент пустого состояния (для таблиц, списков).
- [ ] **§7.5** Создать `src/components/shared/error-boundary.tsx` — клиентский Error Boundary с кнопкой «Повторить».
- [ ] **§7.6** Добавить Skeleton-компоненты для ключевых виджетов Dashboard (stat-cards, chart, table).
- [ ] **§7.7** Стандартизировать toast-уведомления (Sonner) — создать хелпер:
  ```ts
  // src/lib/toast.ts
  showSuccess(message: string)
  showError(message: string, error?: unknown)
  showLoading(message: string): Promise<...>
  ```

---

## §8. Интернационализация (i18n)

> **Цель:** Привести тексты к единому языку, подготовить к локализации.

- [ ] **§8.1** Определить основной язык интерфейса (EN или RU). Сейчас тексты смешаны:
  - `profile/page.tsx`: лейблы на RU («Дата рождения», «Город», «Индекс»), кнопки на EN («Update profile»).
  - Dashboard и остальные: на EN.
- [ ] **§8.2** Привести все тексты к одному языку (рекомендация: EN как основной, RU при необходимости через i18n).
- [ ] **§8.3** (Когда будет нужна многоязычность) Внедрить `next-intl` или аналог:
  ```
  src/messages/
    en.json
    ru.json
  src/i18n.ts — конфигурация
  ```

---

## §9. API Routes

> **Цель:** Создать серверные API-эндпоинты для фронтенд-клиента (или для проксирования к бэкенду).

- [ ] **§9.1** Создать `src/app/api/` — папка для API routes.
- [ ] **§9.2** `src/app/api/transactions/route.ts`:
  ```
  GET — список транзакций (с фильтрацией, пагинацией)
  ```
- [ ] **§9.3** `src/app/api/user/route.ts`:
  ```
  GET — текущий пользователь
  PUT — обновление профиля
  ```
- [ ] **§9.4** `src/app/api/wallet/route.ts`:
  ```
  GET — баланс, активы
  ```
- [ ] **§9.5** `src/app/api/auth/[...nextauth]/route.ts` (или кастомный):
  ```
  POST /login, POST /register, POST /logout, POST /refresh
  ```
- [ ] **§9.6** Создать middleware для API-routes:
  ```
  src/lib/api-middleware.ts — проверка токена, rate limiting, CORS
  ```

---

## §10. Тестирование

> **Цель:** Обеспечить стабильность кодовой базы через автотесты.

- [ ] **§10.1** Установить и настроить Vitest + React Testing Library:
  ```
  pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom
  Создать vitest.config.ts
  Добавить script "test" в package.json
  ```
- [ ] **§10.2** Написать unit-тесты для утилит:
  ```
  src/lib/__tests__/utils.test.ts — cn(), generateMeta()
  src/lib/__tests__/page-titles.test.ts — getPageTitle()
  ```
- [ ] **§10.3** Написать тесты для хуков:
  ```
  src/hooks/__tests__/use-mobile.test.ts
  src/hooks/__tests__/use-file-upload.test.ts
  ```
- [ ] **§10.4** Написать компонентные тесты для ключевых форм:
  ```
  Profile form — валидация, submit
  ```
- [ ] **§10.5** (Позже) Настроить E2E-тесты (Playwright):
  ```
  pnpm add -D @playwright/test
  Создать playwright.config.ts
  tests/e2e/ — основные пользовательские сценарии
  ```

---

## §11. CI/CD и DevOps

> **Цель:** Автоматизация проверок и деплоя.

- [ ] **§11.1** Создать `.github/workflows/ci.yml`:
  ```
  - lint (eslint)
  - type-check (tsc --noEmit)
  - test (vitest, когда §10 готово)
  - build (next build)
  ```
- [ ] **§11.2** Настроить pre-commit хуки (lint-staged + husky):
  ```
  pnpm add -D husky lint-staged
  Lint и format при коммите
  ```
- [ ] **§11.3** Добавить Prettier (или Biome) для единообразного форматирования:
  ```
  .prettierrc — конфиг
  Интеграция с ESLint
  ```

---

## §12. Производительность и оптимизация

> **Цель:** Оптимизировать производительность по мере роста приложения.

- [ ] **§12.1** Аудит `"use client"` директив — минимизировать клиентские компоненты:
  ```
  dashboard-content.tsx — вероятно, можно разбить на серверную обёртку + клиентские интерактивные виджеты.
  ```
- [ ] **§12.2** Добавить `loading.tsx` и `Suspense` для тяжёлых компонентов (графики, таблицы).
- [ ] **§12.3** Оптимизировать изображения: использовать `next/image` повсеместно (уже используется в `assets-table.tsx`).
- [ ] **§12.4** Реализовать ленивую загрузку для страниц Cards и Funds Connect:
  ```tsx
  const HeavyChart = dynamic(() => import("./heavy-chart"), {
    loading: () => <Skeleton />,
  });
  ```

---

## §13. Безопасность

> **Цель:** Базовые меры безопасности.

- [ ] **§13.1** Добавить Content Security Policy (CSP) headers в `next.config.ts`.
- [ ] **§13.2** Настроить CORS для API-routes (когда появятся).
- [ ] **§13.3** Валидация входных данных на сервере (zod-схемы для API-routes).
- [ ] **§13.4** Rate limiting для auth-эндпоинтов.
- [ ] **§13.5** Sanitization пользовательского ввода.

---

## Приоритеты реализации

### Фаза 1 — Фундамент (рекомендуется сделать первым)
| Пункт | Описание |
|-------|----------|
| §1 | Типизация |
| §4.1–§4.3 | Рефакторинг структуры компонентов |
| §4.4 | Декомпозиция assets-table |
| §5.1–§5.2 | Централизация навигации |
| §8.1–§8.2 | Унификация языка интерфейса |

### Фаза 2 — Данные и API
| Пункт | Описание |
|-------|----------|
| §2 | Сервисный слой |
| §6.1 | React Query |
| §7.1–§7.6 | Error/loading states |
| §9 | API routes |

### Фаза 3 — Авторизация
| Пункт | Описание |
|-------|----------|
| §3 | Auth + middleware |
| §13 | Безопасность |

### Фаза 4 — Качество
| Пункт | Описание |
|-------|----------|
| §10 | Тесты |
| §11 | CI/CD |
| §12 | Оптимизация |

### Фаза 5 — Масштабирование
| Пункт | Описание |
|-------|----------|
| §6.2–§6.3 | State management |
| §8.3 | i18n |

---

## Как использовать этот документ

1. **Ссылаться на пункт:** «Выполни §4.4 — декомпозиция assets-table».
2. **Ссылаться на раздел:** «Реализуй §2 — слой данных и сервисы».
3. **Ссылаться на фазу:** «Начни с Фазы 1».
4. **Агент должен:** прочитать этот файл, выполнить указанный пункт, отметить его как ✅.

> При выполнении пунктов агент должен также учитывать правила из `.cursor/rules/`.
