# Application RTL checklist

## Routed screens

Arabic server-rendered route smoke: every route below returned content with the
document direction set to `rtl`. Screen direction is supplied by the shared
`Screen` component, except the web document root and not-found route, which also
set Arabic direction explicitly.

- [x] Home — `/` — `app/(tabs)/index.tsx`
- [x] Categories — `/categories` — `app/(tabs)/categories.tsx`
- [x] Wishlist — `/wishlist` — `app/(tabs)/wishlist.tsx`
- [x] Cart — `/cart` — `app/(tabs)/cart.tsx`
- [x] Account/profile — `/account` — `app/(tabs)/account.tsx`
- [x] Legacy demo tab — `/two` — `app/(tabs)/two.tsx`
- [x] Search and results — `/search` — `app/search.tsx`
- [x] Product details — `/product/[id]` — `app/product/[id].tsx`
- [x] Size guide — `/size-guide` — `app/size-guide.tsx`
- [x] Login — `/login` — `app/login.tsx`
- [x] Registration — `/register` — `app/register.tsx`
- [x] Checkout, delivery, payment, and review — `/checkout` — `app/checkout.tsx`
- [x] Order history — `/orders` — `app/orders.tsx`
- [x] Order details — `/order/[id]` — `app/order/[id].tsx`
- [x] Notifications — `/notifications` — `app/notifications.tsx`
- [x] Settings/language selection — `/settings` — `app/settings.tsx`
- [x] Address management — `/addresses` — `app/addresses.tsx`
- [x] Customer support — `/support` — `app/support.tsx`
- [x] Order confirmation — `/confirmation` — `app/confirmation.tsx`
- [x] Modal route — `/modal` — `app/modal.tsx`
- [x] Not-found fallback — unknown route — `app/+not-found.tsx`

## Shared components

- [x] `Screen` — propagates selected layout direction to screen content.
- [x] `AppText` and `AppTextInput` — use Arabic/Latin fonts and switch writing
  direction with the persisted language.
- [x] `PageHeader` and `BackButton` — follow screen direction and mirror the
  back arrow semantically.
- [x] `BottomNav` — reverses tab order for Arabic and keeps the selected circle
  attached to the active tab.
- [x] `HomeHeader` — inherits screen direction; logical edge positioning.
- [x] `Icon` and `IconButton` — mirror only directional icons.
- [x] `Button` — inherits direction and gives forward arrows the correct
  language-specific orientation.
- [x] `Dialog`, `ConfirmDialog`, and `AuthPromptDialog` — modal content follows
  selected direction.
- [x] `ModalSheet` and `CurrencySheet` — sheet content follows selected
  direction; inputs use `AppTextInput`.
- [x] `ProductCard` / `ProductGrid` — RTL-aware ordering and logical edge
  positions.
- [x] `EmptyState`, `QuantityStepper`, `SectionHeader`, and `SummaryRow` —
  inherit direction from their screen.
- [x] Legacy Expo helpers `Themed.Text`, `Themed.View`, `MonoText`,
  `EditScreenInfo`, and `ExternalLink` — text, typography, and layout inherit the
  selected language direction.

## Verification

- [x] Arabic default and stored language restoration — `settingsStore.test.ts`.
- [x] Shared text and input direction switches between Arabic and English —
  `rtlLayout.test.tsx`.
- [x] Arabic route smoke across all routed screens.
- [x] `npm test -- --runInBand`
- [x] `npm run typecheck`
- [x] `npm run lint` (no errors; existing warnings remain)
- [ ] Native-device visual pass for every route and visible modal/sheet in both
  languages. The available Expo web preview is server-rendered without
  interactive client handlers, and no native simulator/device is attached.
