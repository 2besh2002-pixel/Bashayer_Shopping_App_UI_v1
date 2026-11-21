import { useRef, useState } from "react";

type Lang = "ar" | "en";
type Screen =
  | "home"
  | "categories"
  | "wishlist"
  | "cart"
  | "profile"
  | "search"
  | "product"
  | "size"
  | "login"
  | "register"
  | "checkout"
  | "orders"
  | "notifications"
  | "settings"
  | "confirmation";

type IconName =
  | "home"
  | "grid"
  | "heart"
  | "bag"
  | "user"
  | "search"
  | "bell"
  | "globe"
  | "chevron"
  | "arrow"
  | "star"
  | "filter"
  | "sliders"
  | "plus"
  | "minus"
  | "close"
  | "check"
  | "truck"
  | "card"
  | "pin"
  | "box"
  | "settings"
  | "logout"
  | "camera"
  | "help"
  | "edit"
  | "trash"
  | "eye";

const paths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  ),
  bag: (
    <>
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  arrow: (
    <>
      <path d="M20 12H4" />
      <path d="m10 18-6-6 6-6" />
    </>
  ),
  star: (
    <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.2-5.6-2.9L6.4 20l1.1-6.2-4.6-4.4 6.3-.9L12 2.8Z" />
  ),
  filter: (
    <>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12 4 4L19 6" />,
  truck: (
    <>
      <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  box: (
    <>
      <path d="m4 7 8-4 8 4-8 4-8-4Z" />
      <path d="M4 7v10l8 4 8-4V7M12 11v10" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
  logout: (
    <>
      <path d="M10 17v3H4V4h6v3M15 17l5-5-5-5M20 12H9" />
    </>
  ),
  camera: (
    <>
      <path d="M4 7h4l2-3h4l2 3h4v13H4z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 9a2.3 2.3 0 1 1 3.5 2c-1.3.7-1.3 1.5-1.3 2.5M12 17h.01" />
    </>
  ),
  edit: (
    <>
      <path d="m14 5 5 5M4 20l3.5-.8L20 6.7 17.3 4 4.8 16.5 4 20Z" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
};

function Icon({
  name,
  size = 20,
  filled = false,
}: {
  name: IconName;
  size?: number;
  filled?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const productData = [
  {
    id: 1,
    ar: "فستان لورين بطيات ناعمة",
    en: "Laurène Pleated Dress",
    price: 429,
    old: 520,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85",
    badge: "حصري",
  },
  {
    id: 2,
    ar: "حقيبة كالي الجلدية",
    en: "Cali Leather Bag",
    price: 315,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85",
    badge: "جديد",
  },
  {
    id: 3,
    ar: "معطف صوف بقصة مستقيمة",
    en: "Tailored Wool Coat",
    price: 690,
    old: 820,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=700&q=85",
    badge: "الأكثر مبيعاً",
  },
  {
    id: 4,
    ar: "حذاء جلدي بكعب منحوت",
    en: "Sculpted Leather Heel",
    price: 380,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=85",
    badge: "وصل حديثاً",
  },
];

const categories = [
  {
    ar: "فساتين",
    en: "Dresses",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80",
  },
  {
    ar: "رجالي",
    en: "Men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=400&q=80",
  },
  {
    ar: "أحذية",
    en: "Shoes",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80",
  },
  {
    ar: "حقائب",
    en: "Bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
  },
  {
    ar: "إكسسوارات",
    en: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=400&q=80",
  },
];

const currencies = [
  { code: "SAR", symbol: "ر.س", ar: "الريال السعودي", en: "Saudi Riyal" },
  { code: "AED", symbol: "د.إ", ar: "الدرهم الإماراتي", en: "UAE Dirham" },
  { code: "USD", symbol: "$", ar: "الدولار الأمريكي", en: "US Dollar" },
  { code: "EUR", symbol: "€", ar: "اليورو", en: "Euro" },
  { code: "GBP", symbol: "£", ar: "الجنيه الإسترليني", en: "British Pound" },
];

export default function App() {
  const [lang, setLang] = useState<Lang>("ar");
  const [screen, setScreen] = useState<Screen>("home");
  const [history, setHistory] = useState<Screen[]>([]);
  const [currency, setCurrency] = useState(currencies[0]);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currencySearch, setCurrencySearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [cart, setCart] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("عنابي");
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [loggedIn, setLoggedIn] = useState(false);
  const [authPrompt, setAuthPrompt] = useState(false);
  const [logoutPrompt, setLogoutPrompt] = useState(false);
  const [notice, setNotice] = useState("");
  const [checkoutStep, setCheckoutStep] = useState(0);
  const isAr = lang === "ar";

  const t = (ar: string, en: string) => (isAr ? ar : en);
  const go = (next: Screen) => {
    if (next !== screen) setHistory((h) => [...h, screen]);
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    const next = history.at(-1) || "home";
    setHistory((h) => h.slice(0, -1));
    setScreen(next);
  };
  const price = (value: number) =>
    `${value.toLocaleString(isAr ? "ar-SA" : "en-US")} ${currency.symbol}`;
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  };
  const toggleFavorite = (id: number) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
    notify(t("تم تحديث قائمة الأمنيات", "Wishlist updated"));
  };
  const addToCart = (id = 1) => {
    if (!cart.includes(id)) setCart((c) => [...c, id]);
    notify(t("تمت الإضافة إلى السلة", "Added to your bag"));
  };

  const navItems: { id: Screen; icon: IconName; ar: string; en: string }[] = [
    { id: "profile", icon: "user", ar: "حسابي", en: "Profile" },
    { id: "cart", icon: "bag", ar: "السلة", en: "Cart" },
    { id: "home", icon: "home", ar: "الرئيسية", en: "Home" },
    { id: "wishlist", icon: "heart", ar: "المفضلة", en: "Wishlist" },
    { id: "categories", icon: "grid", ar: "الأقسام", en: "Categories" },
  ];

  const rootScreens: Screen[] = ["home", "categories", "wishlist", "cart", "profile"];

  return (
    <div className="app-shell" dir={isAr ? "rtl" : "ltr"} lang={lang}>
      <div className="phone">
        <div className="top-safe" />
        {screen === "home" ? (
          <HomeHeader
            t={t}
            lang={lang}
            currency={currency.code}
            loggedIn={loggedIn}
            onLanguage={() => setLang(lang === "ar" ? "en" : "ar")}
            onCurrency={() => setCurrencyOpen(true)}
            onSearch={() => go("search")}
            onNotifications={() => go("notifications")}
            onLogin={() => go("login")}
            onRegister={() => go("register")}
            onLogout={() => setLogoutPrompt(true)}
          />
        ) : (
          <PageHeader
            title={getTitle(screen, t)}
            root={rootScreens.includes(screen)}
            isAr={isAr}
            onBack={back}
            action={screen === "categories" ? <Icon name="search" /> : undefined}
          />
        )}

        <main className={`main ${rootScreens.includes(screen) ? "with-nav" : ""}`}>
          {screen === "home" && (
            <HomeScreen
              t={t}
              isAr={isAr}
              favorites={favorites}
              price={price}
              go={go}
              toggleFavorite={toggleFavorite}
            />
          )}
          {screen === "categories" && <CategoriesScreen t={t} go={go} />}
          {screen === "wishlist" && (
            <WishlistScreen
              t={t}
              ids={favorites}
              price={price}
              remove={toggleFavorite}
              add={addToCart}
              go={go}
            />
          )}
          {screen === "cart" && (
            <CartScreen
              t={t}
              ids={cart}
              quantity={quantity}
              setQuantity={setQuantity}
              price={price}
              go={go}
              onCheckout={() => (loggedIn ? go("checkout") : setAuthPrompt(true))}
            />
          )}
          {screen === "profile" && (
            <ProfileScreen
              t={t}
              loggedIn={loggedIn}
              go={go}
              login={() => go("login")}
              logout={() => setLogoutPrompt(true)}
            />
          )}
          {screen === "search" && (
            <SearchScreen
              t={t}
              price={price}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              go={go}
            />
          )}
          {screen === "product" && (
            <ProductScreen
              t={t}
              price={price}
              isFavorite={favorites.includes(1)}
              toggleFavorite={() => toggleFavorite(1)}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              add={() => addToCart(1)}
              go={go}
            />
          )}
          {screen === "size" && <SizeGuide t={t} unit={unit} setUnit={setUnit} />}
          {(screen === "login" || screen === "register") && (
            <AuthScreen
              mode={screen}
              t={t}
              go={go}
              onSuccess={() => {
                setLoggedIn(true);
                go(cart.length ? "checkout" : "home");
                notify(t("مرحباً بعودتك", "Welcome back"));
              }}
            />
          )}
          {screen === "checkout" && (
            <CheckoutScreen
              t={t}
              price={price}
              step={checkoutStep}
              setStep={setCheckoutStep}
              go={go}
            />
          )}
          {screen === "orders" && <OrdersScreen t={t} price={price} />}
          {screen === "notifications" && <NotificationsScreen t={t} />}
          {screen === "settings" && (
            <SettingsScreen
              t={t}
              lang={lang}
              currency={currency.code}
              toggleLang={() => setLang(lang === "ar" ? "en" : "ar")}
              openCurrency={() => setCurrencyOpen(true)}
            />
          )}
          {screen === "confirmation" && <ConfirmationScreen t={t} go={go} />}
        </main>

        {rootScreens.includes(screen) && (
          <nav className="bottom-nav" aria-label={t("التنقل الرئيسي", "Main navigation")}>
            {navItems.map((item) => {
              const active = screen === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${active ? "active" : ""} ${item.id === "home" ? "home-nav" : ""}`}
                  onClick={() => {
                    setScreen(item.id);
                    setHistory([]);
                  }}
                >
                  <span className="nav-icon">
                    <Icon
                      name={item.icon}
                      size={item.id === "home" ? 22 : 21}
                      filled={active && item.icon === "heart"}
                    />
                    {item.id === "cart" && cart.length > 0 && <b>{cart.length}</b>}
                  </span>
                  <small>{isAr ? item.ar : item.en}</small>
                </button>
              );
            })}
          </nav>
        )}

        {currencyOpen && (
          <CurrencySheet
            t={t}
            isAr={isAr}
            selected={currency.code}
            query={currencySearch}
            setQuery={setCurrencySearch}
            select={(c) => {
              setCurrency(c);
              setCurrencyOpen(false);
              notify(t(`تم اختيار ${c.ar}`, `${c.en} selected`));
            }}
            close={() => setCurrencyOpen(false)}
          />
        )}
        {authPrompt && (
          <AuthPrompt
            t={t}
            close={() => setAuthPrompt(false)}
            go={(s) => {
              setAuthPrompt(false);
              go(s);
            }}
          />
        )}
        {logoutPrompt && (
          <ConfirmDialog
            t={t}
            close={() => setLogoutPrompt(false)}
            confirm={() => {
              setLoggedIn(false);
              setLogoutPrompt(false);
              setScreen("home");
              notify(t("تم تسجيل الخروج بأمان", "You have been logged out"));
            }}
          />
        )}
        {notice && (
          <div className="toast">
            <span>
              <Icon name="check" size={16} />
            </span>
            {notice}
          </div>
        )}
      </div>
    </div>
  );
}

function HomeHeader({
  t,
  lang,
  currency,
  loggedIn,
  onLanguage,
  onCurrency,
  onSearch,
  onNotifications,
  onLogin,
  onRegister,
  onLogout,
}: any) {
  return (
    <header className="home-header">
      <div className="header-row">
        <button
          className="wordmark"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          NASEEJ<span>نسيج</span>
        </button>
        <div className="header-tools">
          <button className="pill-tool" onClick={onLanguage}>
            <Icon name="globe" size={15} />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <button className="pill-tool" onClick={onCurrency}>
            {currency}
            <Icon name="chevron" size={12} />
          </button>
          <button
            className="icon-btn dot-wrap"
            onClick={onNotifications}
            aria-label={t("الإشعارات", "Notifications")}
          >
            <Icon name="bell" size={20} />
            <i />
          </button>
        </div>
      </div>
      <div className="account-strip">
        <button className="search-trigger" onClick={onSearch}>
          <Icon name="search" size={18} />
          <span>{t("ابحثي عن فستان، حقيبة، أو علامة...", "Search dresses, bags or brands...")}</span>
        </button>
        {loggedIn ? (
          <button className="account-link" onClick={onLogout}>
            {t("خروج", "Logout")}
          </button>
        ) : (
          <div className="guest-actions">
            <button onClick={onLogin}>{t("دخول", "Log in")}</button>
            <em />
            <button onClick={onRegister}>{t("حساب جديد", "Register")}</button>
          </div>
        )}
      </div>
    </header>
  );
}

function PageHeader({
  title,
  root,
  isAr,
  onBack,
  action,
}: {
  title: string;
  root: boolean;
  isAr: boolean;
  onBack: () => void;
  action?: React.ReactNode;
}) {
  return (
    <header className="page-header">
      {!root ? (
        <button className="back-btn" onClick={onBack} aria-label="Back">
          <span style={{ transform: isAr ? "rotate(180deg)" : undefined }}>
            <Icon name="arrow" size={20} />
          </span>
        </button>
      ) : (
        <span className="header-placeholder" />
      )}
      <h1>{title}</h1>
      <button className="header-action">{action || <span />}</button>
    </header>
  );
}

function getTitle(screen: Screen, t: (a: string, b: string) => string) {
  const map: Record<Screen, [string, string]> = {
    home: ["الرئيسية", "Home"],
    categories: ["الأقسام", "Categories"],
    wishlist: ["قائمة الأمنيات", "Wishlist"],
    cart: ["سلة التسوق", "Shopping Bag"],
    profile: ["حسابي", "My Profile"],
    search: ["البحث", "Search"],
    product: ["تفاصيل القطعة", "Product Details"],
    size: ["دليل المقاسات", "Size Guide"],
    login: ["تسجيل الدخول", "Log In"],
    register: ["إنشاء حساب", "Create Account"],
    checkout: ["إتمام الطلب", "Checkout"],
    orders: ["طلباتي", "My Orders"],
    notifications: ["الإشعارات", "Notifications"],
    settings: ["الإعدادات", "Settings"],
    confirmation: ["تم الطلب", "Order Confirmed"],
  };
  return t(...map[screen]);
}

function HomeScreen({ t, isAr, favorites, price, go, toggleFavorite }: any) {
  return (
    <>
      <section className="hero">
        <img
          src="/naseej-hero.png"
          alt={t("عارضة ترتدي إطلالة من مجموعة نسيج", "Model wearing the NASEEJ collection")}
        />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <span>{t("تحرير الموسم · ٢٠٢٥", "THE SEASON EDIT · 2025")}</span>
          <h1>
            {t(
              <>
                أناقةٌ
                <br />
                تُشبهكِ
              </>,
              <>
                Elegance,
                <br />
                your way.
              </>,
            )}
          </h1>
          <p>
            {t(
              "قصّات انسيابية بألوان الموسم الدافئة",
              "Fluid silhouettes in the season’s warmest tones",
            )}
          </p>
          <button onClick={() => go("categories")}>
            {t("تسوّقي المجموعة", "Shop the collection")}
            <Icon name="arrow" size={16} />
          </button>
        </div>
        <div className="hero-dots">
          <i className="selected" />
          <i />
          <i />
        </div>
      </section>

      <SectionHead
        title={t("تسوّقي حسب القسم", "Shop by category")}
        action={t("عرض الكل", "View all")}
        onClick={() => go("categories")}
      />
      <div className="category-rail">
        {categories.map((cat, i) => (
          <button
            className="category-bubble"
            key={cat.en}
            onClick={() => go(i === 0 ? "categories" : "search")}
          >
            <span>
              <img src={cat.image} alt="" />
            </span>
            <b>{isAr ? cat.ar : cat.en}</b>
          </button>
        ))}
      </div>

      <section className="mood-banner" onClick={() => go("categories")}>
        <div>
          <small>{t("تحرير نسيج", "NASEEJ EDIT")}</small>
          <h3>{t("درجاتٌ من العنّابي", "Notes of burgundy")}</h3>
          <p>{t("مجموعة مختارة للحظات الخريف", "A curated collection for autumn moments")}</p>
        </div>
        <span>
          <Icon name="arrow" size={18} />
        </span>
      </section>

      <SectionHead
        title={t("وصل حديثاً", "New arrivals")}
        action={t("عرض الكل", "View all")}
        onClick={() => go("categories")}
      />
      <div className="product-grid">
        {productData.map((p: any) => (
          <ProductCard
            key={p.id}
            product={p}
            t={t}
            price={price}
            favorite={favorites.includes(p.id)}
            toggle={() => toggleFavorite(p.id)}
            open={() => go("product")}
          />
        ))}
      </div>
      <p className="prototype-note">
        {t(
          "محتوى وأسعار العرض توضيحية للنموذج الأولي.",
          "Product content and prices are illustrative prototype data.",
        )}
      </p>
    </>
  );
}

function SectionHead({ title, action, onClick }: any) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <button onClick={onClick}>
        {action}
        <Icon name="chevron" size={14} />
      </button>
    </div>
  );
}

function ProductCard({ product, t, price, favorite, toggle, open }: any) {
  return (
    <article className="product-card">
      <div className="product-image" onClick={open}>
        <img src={product.image} alt={t(product.ar, product.en)} />
        <span className="badge">
          {t(
            product.badge,
            product.badge === "جديد"
              ? "New"
              : product.badge === "حصري"
                ? "Exclusive"
                : product.badge,
          )}
        </span>
        <button
          className={`heart-btn ${favorite ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggle();
          }}
          aria-label={t("إضافة للمفضلة", "Add to wishlist")}
        >
          <Icon name="heart" size={18} filled={favorite} />
        </button>
      </div>
      <button className="product-info" onClick={open}>
        <h3>{t(product.ar, product.en)}</h3>
        <div className="rating">
          <Icon name="star" size={12} filled /> {product.rating}{" "}
          <span>({product.id * 28 + 36})</span>
        </div>
        <div className="price">
          <strong>{price(product.price)}</strong>
          {product.old && <del>{price(product.old)}</del>}
        </div>
      </button>
    </article>
  );
}

function CategoriesScreen({ t, go }: any) {
  const groups = [
    {
      title: t("نسائي", "Women"),
      image: categories[0].image,
      items: [
        t("فساتين", "Dresses"),
        t("توبات وقمصان", "Tops & shirts"),
        t("عبايات ومعاطف", "Abayas & coats"),
        t("بناطيل وتنانير", "Trousers & skirts"),
      ],
    },
    {
      title: t("رجالي", "Men"),
      image: categories[1].image,
      items: [
        t("قمصان", "Shirts"),
        t("تيشيرتات", "T-shirts"),
        t("بناطيل", "Trousers"),
        t("جاكيتات", "Jackets"),
      ],
    },
    {
      title: t("الأحذية والحقائب", "Shoes & bags"),
      image: categories[3].image,
      items: [
        t("أحذية نسائية", "Women’s shoes"),
        t("أحذية رجالية", "Men’s shoes"),
        t("حقائب يد", "Handbags"),
        t("حقائب ظهر", "Backpacks"),
      ],
    },
  ];
  return (
    <div className="categories-page">
      <div className="segmented">
        <button className="active">{t("الكل", "All")}</button>
        <button>{t("نسائي", "Women")}</button>
        <button>{t("رجالي", "Men")}</button>
        <button>{t("أطفال", "Kids")}</button>
      </div>
      {groups.map((group, i) => (
        <section className="category-group" key={group.title}>
          <button className="category-cover" onClick={() => go("search")}>
            <img src={group.image} alt="" />
            <div />
            <h2>{group.title}</h2>
            <span>
              {t("اكتشفي المجموعة", "Explore collection")} <Icon name="arrow" size={15} />
            </span>
          </button>
          <div className="category-links">
            {group.items.map((item: string) => (
              <button key={item} onClick={() => go("search")}>
                <span>{item}</span>
                <Icon name="chevron" size={16} />
              </button>
            ))}
          </div>
          {i < groups.length - 1 && <hr />}
        </section>
      ))}
    </div>
  );
}

function WishlistScreen({ t, ids, price, remove, add, go }: any) {
  const items = productData.filter((p) => ids.includes(p.id));
  if (!items.length)
    return (
      <EmptyState
        icon="heart"
        title={t("قائمتك بانتظار اختياراتك", "Your wishlist is waiting")}
        text={t(
          "احفظي القطع التي تحبينها لتعودي إليها بسهولة.",
          "Save the pieces you love and come back anytime.",
        )}
        action={t("اكتشفي الجديد", "Discover new arrivals")}
        onClick={() => go("home")}
      />
    );
  return (
    <div className="wishlist-list">
      {items.map((p) => (
        <article className="wishlist-item" key={p.id}>
          <button onClick={() => go("product")}>
            <img src={p.image} alt="" />
          </button>
          <div>
            <small>{t("متوفر", "In stock")}</small>
            <h3>{t(p.ar, p.en)}</h3>
            <div className="rating">
              <Icon name="star" size={12} filled /> {p.rating}
            </div>
            <strong>{price(p.price)}</strong>
            <div className="row-actions">
              <button className="primary-small" onClick={() => add(p.id)}>
                <Icon name="bag" size={16} />
                {t("أضيفي للسلة", "Add to bag")}
              </button>
              <button className="square-btn" onClick={() => remove(p.id)}>
                <Icon name="trash" size={17} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function CartScreen({ t, ids, quantity, setQuantity, price, go, onCheckout }: any) {
  const items = productData.filter((p) => ids.includes(p.id));
  const subtotal = items.reduce((sum, p) => sum + p.price, 0) * quantity;
  if (!items.length)
    return (
      <EmptyState
        icon="bag"
        title={t("سلتك فارغة", "Your bag is empty")}
        text={t(
          "ابدئي بإضافة قطعك المفضلة، وسنحتفظ بها هنا.",
          "Add your favorite pieces and we’ll keep them here.",
        )}
        action={t("ابدئي التسوق", "Start shopping")}
        onClick={() => go("home")}
      />
    );
  return (
    <div className="cart-page">
      <div className="delivery-note">
        <Icon name="truck" />
        <div>
          <b>{t("توصيل مجاني", "Complimentary delivery")}</b>
          <span>{t("تُحسب الأهلية وفق عنوان التوصيل", "Eligibility is based on your address")}</span>
        </div>
      </div>
      {items.map((p) => (
        <article className="cart-item" key={p.id}>
          <img src={p.image} alt="" />
          <div className="cart-copy">
            <h3>{t(p.ar, p.en)}</h3>
            <p>{t("المقاس: M · اللون: عنابي", "Size: M · Color: Burgundy")}</p>
            <strong>{price(p.price)}</strong>
            <div className="cart-controls">
              <div className="stepper">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Icon name="minus" size={14} />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Icon name="plus" size={14} />
                </button>
              </div>
              <button>
                <Icon name="trash" size={17} />
              </button>
            </div>
          </div>
        </article>
      ))}
      <div className="coupon">
        <div>
          <span>{t("رمز القسيمة", "Coupon code")}</span>
          <input placeholder={t("أدخلي الرمز", "Enter code")} />
        </div>
        <button>{t("تطبيق", "Apply")}</button>
      </div>
      <div className="summary-card">
        <h3>{t("ملخص السلة", "Bag summary")}</h3>
        <SummaryRow label={t("المجموع الفرعي", "Subtotal")} value={price(subtotal)} />
        <SummaryRow label={t("الخصومات", "Discounts")} value={t("—", "—")} />
        <SummaryRow
          label={t("رسوم التوصيل", "Delivery")}
          value={t("تُحسب لاحقاً", "Calculated later")}
        />
        <hr />
        <SummaryRow label={t("الإجمالي", "Total")} value={price(subtotal)} strong />
      </div>
      <button className="primary-btn sticky-action" onClick={onCheckout}>
        {t("متابعة الدفع", "Continue to checkout")}
        <Icon name="arrow" size={18} />
      </button>
    </div>
  );
}

function ProfileScreen({ t, loggedIn, go, login, logout }: any) {
  if (!loggedIn)
    return (
      <div className="guest-profile">
        <div className="profile-art">
          <Icon name="user" size={36} />
        </div>
        <span>{t("أهلاً بكِ في نسيج", "Welcome to NASEEJ")}</span>
        <h2>{t("كل اختياراتكِ في مكانٍ واحد", "Your style, all in one place")}</h2>
        <p>
          {t(
            "سجّلي الدخول لتتبّع الطلبات، وإدارة العناوين، والعودة إلى قوائمك من أي جهاز.",
            "Log in to track orders, manage addresses, and access your lists from any device.",
          )}
        </p>
        <button className="primary-btn" onClick={login}>
          {t("تسجيل الدخول", "Log in")}
        </button>
        <button className="secondary-btn" onClick={() => go("register")}>
          {t("إنشاء حساب جديد", "Create an account")}
        </button>
        <div className="benefits">
          <div>
            <Icon name="truck" />
            <span>
              <b>{t("تتبّع الطلب", "Order tracking")}</b>
              <small>{t("تحديثات واضحة خطوة بخطوة", "Clear step-by-step updates")}</small>
            </span>
          </div>
          <div>
            <Icon name="heart" />
            <span>
              <b>{t("مفضّلاتك محفوظة", "Saved favorites")}</b>
              <small>{t("من أي جهاز وفي أي وقت", "On every device, anytime")}</small>
            </span>
          </div>
        </div>
      </div>
    );
  const links = [
    ["box", t("طلباتي", "My orders"), "orders"],
    ["heart", t("قائمة الأمنيات", "My wishlist"), "wishlist"],
    ["pin", t("عناويني", "My addresses"), "settings"],
    ["settings", t("الإعدادات", "Settings"), "settings"],
    ["help", t("المساعدة والأسئلة الشائعة", "Support & FAQ"), "settings"],
  ] as [IconName, string, Screen][];
  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="avatar">ن</div>
        <div>
          <span>{t("مرحباً بعودتكِ", "Welcome back")}</span>
          <h2>{t("نورة العتيبي", "Noura Alotaibi")}</h2>
          <p>noura@example.com</p>
        </div>
        <button>
          <Icon name="edit" size={18} />
        </button>
      </div>
      <div className="profile-links">
        {links.map(([icon, label, target]) => (
          <button key={label} onClick={() => go(target)}>
            <span>
              <Icon name={icon} />
              {label}
            </span>
            <Icon name="chevron" size={16} />
          </button>
        ))}
      </div>
      <button className="logout-link" onClick={logout}>
        <Icon name="logout" />
        {t("تسجيل الخروج", "Log out")}
      </button>
    </div>
  );
}

function SearchScreen({ t, price, favorites, toggleFavorite, go }: any) {
  const [query, setQuery] = useState("");
  return (
    <div className="search-page">
      <div className="search-input">
        <Icon name="search" size={19} />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("ابحثي في نسيج", "Search NASEEJ")}
        />
        <button onClick={() => setQuery("")}>
          {query ? <Icon name="close" size={17} /> : <Icon name="camera" size={18} />}
        </button>
      </div>
      {!query ? (
        <>
          <div className="search-block">
            <h3>{t("عمليات البحث الأخيرة", "Recent searches")}</h3>
            <button>{t("مسح الكل", "Clear all")}</button>
            <div className="chips">
              <span>{t("فستان سهرة", "Evening dress")} ×</span>
              <span>{t("حقيبة جلد", "Leather bag")} ×</span>
            </div>
          </div>
          <div className="search-block">
            <h3>{t("الأكثر بحثاً", "Popular now")}</h3>
            <ol>
              <li>
                <b>01</b>
                {t("فساتين الكتان", "Linen dresses")}
                <em>{t("رائج", "Trending")}</em>
              </li>
              <li>
                <b>02</b>
                {t("أحذية بكعب", "Heeled shoes")}
              </li>
              <li>
                <b>03</b>
                {t("إطلالات العيد", "Occasion edits")}
              </li>
            </ol>
          </div>
        </>
      ) : (
        <>
          <div className="result-toolbar">
            <div>
              <b>{t("نتائج البحث", "Search results")}</b>
              <small>
                {productData.length} {t("قطع", "items")}
              </small>
            </div>
            <button>
              <Icon name="sliders" size={18} />
              {t("تصفية", "Filter")}
            </button>
            <button>
              <Icon name="filter" size={18} />
              {t("ترتيب", "Sort")}
            </button>
          </div>
          <div className="product-grid">
            {productData.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                t={t}
                price={price}
                favorite={favorites.includes(p.id)}
                toggle={() => toggleFavorite(p.id)}
                open={() => go("product")}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProductScreen({
  t,
  price,
  isFavorite,
  toggleFavorite,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  add,
  go,
}: any) {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  return (
    <div className="product-page">
      <section className="product-gallery">
        <img src={productData[0].image} alt="" />
        <button className={`heart-btn ${isFavorite ? "liked" : ""}`} onClick={toggleFavorite}>
          <Icon name="heart" filled={isFavorite} />
        </button>
        <span className="image-count">1 / 4</span>
        <div className="gallery-dots">
          <i className="selected" />
          <i />
          <i />
          <i />
        </div>
      </section>
      <div className="product-detail">
        <small className="eyebrow">NASEEJ EDIT</small>
        <h1>{t(productData[0].ar, productData[0].en)}</h1>
        <div className="detail-rating">
          <span>
            <Icon name="star" size={14} filled /> 4.8
          </span>
          <button>
            {t("١٢٨ تقييماً", "128 reviews")}
            <Icon name="chevron" size={13} />
          </button>
        </div>
        <div className="detail-price">
          <strong>{price(429)}</strong>
          <del>{price(520)}</del>
          <span>{t("وفّري ١٨٪", "Save 18%")}</span>
        </div>
        <hr />
        <div className="option-head">
          <div>
            <b>{t("اللون", "Color")}</b>
            <span>{t(selectedColor, selectedColor === "عنابي" ? "Burgundy" : "Ivory")}</span>
          </div>
        </div>
        <div className="swatches">
          <button
            className={selectedColor === "عنابي" ? "active" : ""}
            onClick={() => setSelectedColor("عنابي")}
            style={{ "--swatch": "#632c36" } as React.CSSProperties}
          />
          <button
            className={selectedColor === "عاجي" ? "active" : ""}
            onClick={() => setSelectedColor("عاجي")}
            style={{ "--swatch": "#e7dfd0" } as React.CSSProperties}
          />
          <button disabled style={{ "--swatch": "#1f2930" } as React.CSSProperties} />
        </div>
        <div className="option-head">
          <div>
            <b>{t("المقاس", "Size")}</b>
            <span>{selectedSize}</span>
          </div>
          <button onClick={() => go("size")}>
            {t("دليل المقاسات", "Size guide")}
            <Icon name="chevron" size={13} />
          </button>
        </div>
        <div className="sizes">
          {sizes.map((s) => (
            <button
              className={s === selectedSize ? "active" : ""}
              disabled={s === "XS"}
              onClick={() => setSelectedSize(s)}
              key={s}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="stock-note">
          <i />
          <b>{t("متوفر", "In stock")}</b> ·{" "}
          {t("اختاري المقاس قبل الإضافة", "Select a size before adding")}
        </p>
        <button className="primary-btn add-btn" onClick={add}>
          <Icon name="bag" />
          {t("أضيفي إلى السلة", "Add to bag")}
          <span>{price(429)}</span>
        </button>
        <div className="accordions">
          <button>
            <span>
              <Icon name="eye" />
              {t("التفاصيل والخامة", "Details & material")}
            </span>
            <Icon name="plus" />
          </button>
          <button>
            <span>
              <Icon name="truck" />
              {t("التوصيل والإرجاع", "Delivery & returns")}
            </span>
            <Icon name="plus" />
          </button>
          <button onClick={() => go("size")}>
            <span>
              <Icon name="help" />
              {t("المقاسات والملاءمة", "Size & fit")}
            </span>
            <Icon name="chevron" />
          </button>
        </div>
        <div className="editorial-copy">
          <small>{t("تفاصيل القطعة", "THE DETAILS")}</small>
          <p>
            {t(
              "وصف توضيحي للنموذج الأولي. تُعرض تفاصيل الخامة والقصّة والعناية فقط عند توفر بيانات المنتج الفعلية.",
              "Illustrative prototype description. Material, fit and care details appear only when verified product data is available.",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function SizeGuide({ t, unit, setUnit }: any) {
  const val = (cm: number) => (unit === "cm" ? cm : (cm / 2.54).toFixed(1));
  const rows = [
    ["S", 84, 68, 92, 136],
    ["M", 89, 73, 97, 137],
    ["L", 95, 79, 103, 138],
    ["XL", 101, 85, 109, 139],
  ];
  return (
    <div className="size-page">
      <div className="size-intro">
        <span>NASEEJ</span>
        <h2>{t("دليل مقاسات الفستان", "Dress size guide")}</h2>
        <p>
          {t(
            "قياسات المنتج الفعلية تختلف عن قياسات الجسم. قارنيها بقطعة تناسبكِ جيداً.",
            "Product measurements differ from body measurements. Compare them with a garment that fits you well.",
          )}
        </p>
      </div>
      <div className="unit-toggle">
        <span>{t("وحدة القياس", "Measurement unit")}</span>
        <div>
          <button className={unit === "cm" ? "active" : ""} onClick={() => setUnit("cm")}>
            {t("سم", "cm")}
          </button>
          <button className={unit === "in" ? "active" : ""} onClick={() => setUnit("in")}>
            {t("بوصة", "in")}
          </button>
        </div>
      </div>
      <h3>{t("قياسات المنتج", "Product measurements")}</h3>
      <p className="table-note">
        {t(
          "جميع القياسات تقريبية وقابلة للقراءة كنص.",
          "All measurements are approximate and available as readable text.",
        )}
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{t("المقاس", "Size")}</th>
              <th>{t("الصدر", "Bust")}</th>
              <th>{t("الخصر", "Waist")}</th>
              <th>{t("الأرداف", "Hips")}</th>
              <th>{t("الطول", "Length")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) => (
                  <td key={i}>{i ? val(c as number) : c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="measurement-tip">
        <Icon name="help" />
        <div>
          <b>{t("كيف تقيسين؟", "How to measure")}</b>
          <p>
            {t(
              "استخدمي شريط قياس مرناً دون شدّه. قياس الصدر حول أوسع نقطة، والخصر حول أضيق نقطة.",
              "Use a flexible tape without pulling. Measure the bust at its fullest point and the waist at its narrowest.",
            )}
          </p>
        </div>
      </div>
      <button className="secondary-btn">
        {t("ساعديني في اختيار مقاسي", "Help me find my size")}
      </button>
      <small className="estimate-note">
        {t(
          "التوصية تقديرية ولا تضمن الملاءمة.",
          "Recommendations are estimates and do not guarantee fit.",
        )}
      </small>
    </div>
  );
}

function AuthScreen({ mode, t, go, onSuccess }: any) {
  const login = mode === "login";
  const [stage, setStage] = useState<"form" | "otp" | "success">("form");
  const [countryOpen, setCountryOpen] = useState(false);
  const [country, setCountry] = useState({
    code: "+966",
    flag: "SA",
    ar: "السعودية",
    en: "Saudi Arabia",
  });
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const countries = [
    { code: "+966", flag: "SA", ar: "السعودية", en: "Saudi Arabia" },
    { code: "+971", flag: "AE", ar: "الإمارات العربية المتحدة", en: "United Arab Emirates" },
    { code: "+1", flag: "US", ar: "الولايات المتحدة", en: "United States" },
    { code: "+44", flag: "GB", ar: "المملكة المتحدة", en: "United Kingdom" },
  ];
  const cleanPhone = phone.replace(/\D/g, "");
  const maskedPhone = cleanPhone
    ? `${country.code} ••• ••• ${cleanPhone.slice(-3).padStart(3, "•")}`
    : `${country.code} ••• ••• •••`;

  const submitDetails = () => {
    if (!cleanPhone || cleanPhone.length < 7) {
      setError(t("أدخلي رقم جوال صحيحاً للمتابعة.", "Enter a valid mobile number to continue."));
      return;
    }
    if (!login && (!fullName.trim() || !email.includes("@"))) {
      setError(
        t(
          "أكملي الاسم الكامل والبريد الإلكتروني الصحيح.",
          "Complete your full name and a valid email address.",
        ),
      );
      return;
    }
    setError("");
    setStage("otp");
  };

  const updateOtp = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((current) => current.map((item, i) => (i === index ? digit : item)));
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const verifyPrototype = () => {
    if (otp.some((digit) => !digit)) {
      setError(t("أدخلي رمز التحقق المكوّن من ٦ أرقام.", "Enter the 6-digit verification code."));
      return;
    }
    setError("");
    setStage("success");
  };

  if (stage === "success") {
    return (
      <div className="auth-page auth-success">
        <div className="auth-success-icon">
          <Icon name="check" size={34} />
        </div>
        <span className="eyebrow">NASEEJ</span>
        <h2>
          {login
            ? t("مرحباً بعودتكِ", "Welcome back")
            : t("أصبح حسابكِ جاهزاً", "Your account is ready")}
        </h2>
        <p>
          {login
            ? t(
                "هذه معاينة لحالة نجاح تسجيل الدخول في النموذج الأولي.",
                "This is the successful login state for the UI prototype.",
              )
            : t(
                "هذه معاينة لحالة نجاح إنشاء الحساب في النموذج الأولي.",
                "This is the successful account creation state for the UI prototype.",
              )}
        </p>
        <div className="prototype-disclosure success-disclosure">
          <Icon name="help" size={18} />
          <span>
            {t(
              "لم يتم إرسال رسالة نصية أو التحقق من رقم فعلي.",
              "No SMS was sent and no real phone number was verified.",
            )}
          </span>
        </div>
        <button className="primary-btn" onClick={onSuccess}>
          {t("المتابعة إلى الرئيسية", "Continue to home")}
          <Icon name="arrow" size={18} />
        </button>
      </div>
    );
  }

  if (stage === "otp") {
    return (
      <div className="auth-page otp-page">
        <div className="auth-mark">N</div>
        <span className="eyebrow">NASEEJ</span>
        <h2>{t("تحققي من رقم جوالكِ", "Verify your phone number")}</h2>
        <p>
          {t("أدخلي رمز التحقق المكوّن من ٦ أرقام للرقم", "Enter the 6-digit verification code for")}
          <strong className="masked-phone" dir="ltr">
            {maskedPhone}
          </strong>
        </p>

        <div className="prototype-disclosure">
          <Icon name="help" size={18} />
          <span>
            {t(
              "معاينة واجهة فقط — لم يتم إرسال رمز SMS فعلي. أدخلي أي ٦ أرقام لاستعراض حالة النجاح.",
              "UI preview only — no real SMS was sent. Enter any 6 digits to preview the success state.",
            )}
          </span>
        </div>

        <fieldset className="otp-fieldset">
          <legend>{t("رمز التحقق", "Verification code")}</legend>
          <div className="otp-inputs" dir="ltr">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  otpRefs.current[index] = node;
                }}
                value={digit}
                onChange={(event) => updateOtp(index, event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && !digit && index > 0) {
                    otpRefs.current[index - 1]?.focus();
                  }
                }}
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                aria-label={`${t("رقم", "Digit")} ${index + 1}`}
                maxLength={1}
              />
            ))}
          </div>
        </fieldset>

        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}

        <div className="otp-actions">
          <span>
            {t("يمكنكِ إعادة الإرسال بعد", "You can resend in")} <b dir="ltr">00:38</b>
          </span>
          <button disabled>{t("إعادة إرسال الرمز", "Resend code")}</button>
        </div>
        <button className="primary-btn" onClick={verifyPrototype}>
          {t("تحقق ومتابعة", "Verify and continue")}
        </button>
        <button
          className="edit-phone"
          onClick={() => {
            setStage("form");
            setOtp(["", "", "", "", "", ""]);
            setError("");
          }}
        >
          <Icon name="edit" size={16} />
          {t("تعديل رقم الجوال", "Edit phone number")}
        </button>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-mark">N</div>
      <span className="eyebrow">NASEEJ</span>
      <h2>{login ? t("مرحباً بعودتكِ", "Welcome back") : t("انضمّي إلى نسيج", "Join NASEEJ")}</h2>
      <p>
        {login
          ? t(
              "سجّلي الدخول بسهولة باستخدام رقم جوالكِ المسجّل.",
              "Sign in easily using your registered mobile number.",
            )
          : t(
              "أنشئي حسابكِ باستخدام بياناتكِ ورقم جوالكِ.",
              "Create your account with your details and mobile number.",
            )}
      </p>
      {!login && (
        <Field
          label={t("الاسم الكامل", "Full name")}
          placeholder={t("اكتبي اسمكِ", "Your full name")}
          value={fullName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFullName(event.target.value)}
          autoComplete="name"
        />
      )}
      <label className="phone-field">
        <span className="phone-field-labels">
          <b>{t("مفتاح الدولة", "Country code")}</b>
          <b>{t("رقم الجوال", "Mobile number")}</b>
        </span>
        <div className="phone-control">
          <button
            type="button"
            className="country-trigger"
            onClick={() => setCountryOpen((open) => !open)}
            aria-expanded={countryOpen}
            aria-label={t("اختيار مفتاح الدولة", "Choose country code")}
          >
            <span className="country-flag">{country.flag}</span>
            <b dir="ltr">{country.code}</b>
            <Icon name="chevron" size={13} />
          </button>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={t("5X XXX XXXX", "Mobile number")}
            dir="ltr"
            aria-label={t("رقم الجوال", "Mobile number")}
          />
        </div>
        {countryOpen && (
          <div className="country-menu">
            <div className="country-menu-title">
              {t("اختاري مفتاح الدولة", "Choose country code")}
            </div>
            {countries.map((item) => (
              <button
                type="button"
                key={`${item.flag}-${item.code}`}
                className={item.flag === country.flag ? "selected" : ""}
                onClick={() => {
                  setCountry(item);
                  setCountryOpen(false);
                }}
              >
                <span className="country-flag">{item.flag}</span>
                <span>{t(item.ar, item.en)}</span>
                <b dir="ltr">{item.code}</b>
                {item.flag === country.flag && <Icon name="check" size={15} />}
              </button>
            ))}
          </div>
        )}
        <small className="field-hint">
          {t(
            "اختاري مفتاح الدولة ثم أدخلي الرقم دون الصفر الأول.",
            "Choose a country code, then enter the mobile number.",
          )}
        </small>
      </label>
      {!login && (
        <Field
          label={t("البريد الإلكتروني", "Email address")}
          placeholder="name@example.com"
          type="email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          autoComplete="email"
        />
      )}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      <button className="primary-btn auth-submit" onClick={submitDetails}>
        {login ? t("متابعة", "Continue") : t("إنشاء حساب", "Create account")}
        <Icon name="arrow" size={18} />
      </button>
      <p className="auth-switch">
        {login
          ? t("ليس لديك حساب؟", "Don’t have an account?")
          : t("لديكِ حساب بالفعل؟", "Already have an account?")}{" "}
        <button onClick={() => go(login ? "register" : "login")}>
          {login ? t("إنشاء حساب", "Create account") : t("تسجيل الدخول", "Log in")}
        </button>
      </p>
      <p className="terms">
        {t(
          "بالمتابعة، أنتِ توافقين على الشروط وسياسة الخصوصية.",
          "By continuing, you agree to our Terms and Privacy Policy.",
        )}
      </p>
    </div>
  );
}

function Field({ label, placeholder, type = "text", ...inputProps }: any) {
  return (
    <label className="field">
      <span>{label}</span>
      <div>
        <input type={type} placeholder={placeholder} {...inputProps} />
      </div>
    </label>
  );
}

function CheckoutScreen({ t, price, step, setStep, go }: any) {
  const steps = [
    t("العنوان", "Address"),
    t("التوصيل", "Delivery"),
    t("الدفع", "Payment"),
    t("المراجعة", "Review"),
  ];
  return (
    <div className="checkout-page">
      <div className="progress">
        {steps.map((s: string, i: number) => (
          <div key={s} className={i <= step ? "active" : ""}>
            <span>{i < step ? <Icon name="check" size={13} /> : i + 1}</span>
            <small>{s}</small>
          </div>
        ))}
      </div>
      {step === 0 && (
        <div className="checkout-section">
          <h2>{t("اختاري عنوان التوصيل", "Choose delivery address")}</h2>
          <label className="choice-card selected">
            <input type="radio" defaultChecked />
            <span className="choice-icon">
              <Icon name="pin" />
            </span>
            <div>
              <b>{t("المنزل", "Home")}</b>
              <p>{t("نورة العتيبي · الرياض", "Noura Alotaibi · Riyadh")}</p>
              <small>{t("شارع توضيحي، حي نموذجي", "Illustrative street, sample district")}</small>
            </div>
            <button>
              <Icon name="edit" size={17} />
            </button>
          </label>
          <button className="outline-add">
            <Icon name="plus" />
            {t("إضافة عنوان جديد", "Add new address")}
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="checkout-section">
          <h2>{t("طريقة التوصيل", "Delivery method")}</h2>
          <p className="section-copy">
            {t(
              "تظهر الخيارات والرسوم المتاحة فعلياً لعنوانك فقط.",
              "Only methods and fees actually available for your address are shown.",
            )}
          </p>
          <label className="choice-card selected">
            <input type="radio" defaultChecked />
            <span className="choice-icon">
              <Icon name="truck" />
            </span>
            <div>
              <b>{t("التوصيل القياسي", "Standard delivery")}</b>
              <p>{t("تفاصيل الموعد عند توفرها", "Timing shown when available")}</p>
            </div>
            <strong>{t("يُحسب لاحقاً", "Calculated later")}</strong>
          </label>
          <label className="choice-card disabled">
            <input type="radio" disabled />
            <span className="choice-icon">
              <Icon name="truck" />
            </span>
            <div>
              <b>{t("التوصيل السريع", "Express delivery")}</b>
              <p>{t("غير متاح لهذا العنوان", "Not available for this address")}</p>
            </div>
          </label>
        </div>
      )}
      {step === 2 && (
        <div className="checkout-section">
          <h2>{t("طريقة الدفع", "Payment method")}</h2>
          <p className="section-copy">
            {t(
              "اختاري من الطرق المتاحة لهذا الطلب.",
              "Choose from methods available for this order.",
            )}
          </p>
          <label className="choice-card selected">
            <input type="radio" defaultChecked />
            <span className="choice-icon">
              <Icon name="card" />
            </span>
            <div>
              <b>{t("بطاقة ائتمانية أو مدى", "Credit or debit card")}</b>
              <p>Visa · Mastercard · mada</p>
            </div>
            <Icon name="check" />
          </label>
          <div className="card-form">
            <Field
              label={t("الاسم على البطاقة", "Cardholder name")}
              placeholder={t("كما يظهر على البطاقة", "As shown on card")}
            />
            <Field label={t("رقم البطاقة", "Card number")} placeholder="••••  ••••  ••••  ••••" />
            <div className="split-fields">
              <Field label={t("تاريخ الانتهاء", "Expiry")} placeholder="MM / YY" />
              <Field label={t("رمز الأمان", "Security code")} placeholder="CVV" />
            </div>
          </div>
          <label className="choice-card disabled">
            <input type="radio" disabled />
            <span className="choice-icon">
              <Icon name="card" />
            </span>
            <div>
              <b>{t("الدفع عند الاستلام", "Cash on delivery")}</b>
              <p>{t("غير متاح لهذا الطلب", "Not available for this order")}</p>
            </div>
          </label>
        </div>
      )}
      {step === 3 && (
        <div className="checkout-section review">
          <h2>{t("راجعي طلبكِ", "Review your order")}</h2>
          <article className="mini-order">
            <img src={productData[0].image} alt="" />
            <div>
              <b>{t(productData[0].ar, productData[0].en)}</b>
              <p>{t("M · عنابي · الكمية ١", "M · Burgundy · Qty 1")}</p>
              <strong>{price(429)}</strong>
            </div>
          </article>
          <div className="review-block">
            <span>
              <Icon name="pin" />
              <b>{t("عنوان التوصيل", "Delivery address")}</b>
            </span>
            <p>
              {t(
                "نورة العتيبي، الرياض · عنوان توضيحي",
                "Noura Alotaibi, Riyadh · illustrative address",
              )}
            </p>
          </div>
          <div className="review-block">
            <span>
              <Icon name="truck" />
              <b>{t("التوصيل القياسي", "Standard delivery")}</b>
            </span>
            <p>{t("الموعد والرسوم عند توفر البيانات", "Timing and fees when data is available")}</p>
          </div>
          <div className="review-block">
            <span>
              <Icon name="card" />
              <b>{t("بطاقة دفع", "Payment card")}</b>
            </span>
            <p>•••• 4242</p>
          </div>
          <div className="summary-card">
            <SummaryRow label={t("المجموع الفرعي", "Subtotal")} value={price(429)} />
            <SummaryRow
              label={t("التوصيل", "Delivery")}
              value={t("يُحسب لاحقاً", "Calculated later")}
            />
            <hr />
            <SummaryRow label={t("الإجمالي", "Total")} value={price(429)} strong />
          </div>
        </div>
      )}
      <button
        className="primary-btn checkout-next"
        onClick={() => (step < 3 ? setStep(step + 1) : go("confirmation"))}
      >
        {step < 3 ? t("متابعة", "Continue") : t("تأكيد الطلب", "Place order")}
        <Icon name="arrow" />
      </button>
    </div>
  );
}

function OrdersScreen({ t, price }: any) {
  return (
    <div className="orders-page">
      <div className="segmented">
        <button className="active">{t("الكل", "All")}</button>
        <button>{t("قيد التنفيذ", "Active")}</button>
        <button>{t("مكتملة", "Completed")}</button>
      </div>
      <article className="order-card">
        <div className="order-top">
          <div>
            <small>{t("طلب تجريبي", "Sample order")}</small>
            <b>#NSJ—••••</b>
          </div>
          <span>{t("قيد التجهيز", "Processing")}</span>
        </div>
        <div className="order-products">
          <img src={productData[0].image} />
          <img src={productData[1].image} />
          <div>
            <p>{t("قطعتان", "2 items")}</p>
            <strong>{price(744)}</strong>
          </div>
        </div>
        <div className="timeline-mini">
          <i className="done" />
          <i className="done" />
          <i />
          <i />
        </div>
        <button className="secondary-btn">
          {t("عرض التفاصيل والتتبّع", "View details & tracking")}
        </button>
      </article>
    </div>
  );
}

function NotificationsScreen({ t }: any) {
  const items = [
    [
      "box",
      t("تحديث على طلبكِ", "Your order has an update"),
      t("اطّلعي على آخر حالة للطلب من صفحة التتبّع.", "See the latest status on the tracking page."),
      t("منذ ساعتين", "2h ago"),
    ],
    [
      "heart",
      t("قطعة من مفضّلاتكِ متاحة", "A wishlist item is available"),
      t("عادت القطعة التي حفظتِها إلى المخزون.", "An item you saved is back in stock."),
      t("أمس", "Yesterday"),
    ],
    [
      "bell",
      t("اكتشفي تحرير الموسم", "Discover the season edit"),
      t("اختيارات جديدة وصلت إلى نسيج.", "New selections have arrived at NASEEJ."),
      t("منذ ٣ أيام", "3d ago"),
    ],
  ] as [IconName, string, string, string][];
  return (
    <div className="notifications-page">
      <div className="notification-top">
        <span>{t("٣ إشعارات", "3 notifications")}</span>
        <button>{t("تحديد الكل كمقروء", "Mark all as read")}</button>
      </div>
      {items.map((n, i) => (
        <article className={i === 0 ? "unread" : ""} key={n[1]}>
          <span className="notification-icon">
            <Icon name={n[0]} />
          </span>
          <div>
            <h3>{n[1]}</h3>
            <p>{n[2]}</p>
            <small>{n[3]}</small>
          </div>
          {i === 0 && <i />}
        </article>
      ))}
    </div>
  );
}

function SettingsScreen({ t, lang, currency, toggleLang, openCurrency }: any) {
  const rows = [
    [t("المعلومات الشخصية", "Personal information"), "user"],
    [t("إدارة العناوين", "Address management"), "pin"],
    [t("تفضيلات الإشعارات", "Notification preferences"), "bell"],
    [t("الخصوصية والشروط", "Privacy & terms"), "eye"],
    [t("سياسة الإرجاع", "Return policy"), "box"],
    [t("تواصل معنا", "Contact support"), "help"],
  ] as [string, IconName][];
  return (
    <div className="settings-page">
      <h3>{t("التفضيلات", "Preferences")}</h3>
      <button className="setting-row" onClick={toggleLang}>
        <span>
          <Icon name="globe" />
          {t("اللغة", "Language")}
        </span>
        <b>{lang === "ar" ? "العربية" : "English"}</b>
      </button>
      <button className="setting-row" onClick={openCurrency}>
        <span>
          <Icon name="card" />
          {t("العملة", "Currency")}
        </span>
        <b>{currency}</b>
      </button>
      <h3>{t("الحساب والمساعدة", "Account & support")}</h3>
      {rows.map(([label, icon]) => (
        <button className="setting-row" key={label}>
          <span>
            <Icon name={icon} />
            {label}
          </span>
          <Icon name="chevron" size={16} />
        </button>
      ))}
    </div>
  );
}

function ConfirmationScreen({ t, go }: any) {
  return (
    <div className="confirmation-page">
      <div className="success-rings">
        <span>
          <Icon name="check" size={38} />
        </span>
      </div>
      <small>NASEEJ</small>
      <h1>{t("شكراً لكِ، تم استلام طلبكِ", "Thank you, your order is received")}</h1>
      <p>
        {t(
          "سنرسل تفاصيل التأكيد والتحديثات إلى بريدكِ الإلكتروني عند توفرها.",
          "We’ll send confirmation and updates to your email when available.",
        )}
      </p>
      <div className="confirmation-card">
        <span>{t("رقم الطلب التوضيحي", "Illustrative order number")}</span>
        <b>#NSJ—••••</b>
        <hr />
        <span>{t("حالة الطلب", "Order status")}</span>
        <strong>{t("بانتظار التأكيد", "Awaiting confirmation")}</strong>
      </div>
      <button className="primary-btn" onClick={() => go("orders")}>
        {t("عرض تفاصيل الطلب", "View order details")}
      </button>
      <button className="secondary-btn" onClick={() => go("home")}>
        {t("متابعة التسوق", "Continue shopping")}
      </button>
    </div>
  );
}

function CurrencySheet({ t, isAr, selected, query, setQuery, select, close }: any) {
  const filtered = currencies.filter((c) =>
    `${c.code} ${c.ar} ${c.en}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="sheet">
        <div className="sheet-handle" />
        <div className="sheet-head">
          <div>
            <h2>{t("اختاري العملة", "Choose currency")}</h2>
            <p>{t("تُعرض الأسعار دون خلط بين العملات", "Prices are never mixed across currencies")}</p>
          </div>
          <button onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        <div className="search-input">
          <Icon name="search" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("ابحثي بالاسم أو الرمز", "Search name or code")}
          />
        </div>
        <div className="currency-list">
          {filtered.map((c) => (
            <button
              key={c.code}
              className={selected === c.code ? "selected" : ""}
              onClick={() => select(c)}
            >
              <span className="currency-symbol">{c.symbol}</span>
              <div>
                <b>{isAr ? c.ar : c.en}</b>
                <small>
                  {c.code} · {c.symbol}
                </small>
              </div>
              {selected === c.code && (
                <span className="selected-check">
                  <Icon name="check" size={15} />
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="sheet-note">
          {t(
            "تُحدّث الأسعار عند توفر بيانات تحويل موثوقة من المتجر؛ لا يعرض النموذج أسعار صرف افتراضية.",
            "Prices update only when verified store conversion data is available; this prototype does not fabricate exchange rates.",
          )}
        </p>
      </div>
    </div>
  );
}

function AuthPrompt({ t, close, go }: any) {
  return (
    <div className="overlay">
      <div className="dialog">
        <button className="dialog-close" onClick={close}>
          <Icon name="close" />
        </button>
        <div className="dialog-icon">
          <Icon name="bag" size={28} />
        </div>
        <h2>{t("خطوة واحدة قبل الدفع", "One step before checkout")}</h2>
        <p>
          {t(
            "سجّلي الدخول أو أنشئي حساباً لإكمال الطلب. سنحتفظ بالسلة والمفضّلات كما هي.",
            "Log in or create an account to complete your order. Your bag and wishlist will stay exactly as they are.",
          )}
        </p>
        <button className="primary-btn" onClick={() => go("login")}>
          {t("تسجيل الدخول", "Log in")}
        </button>
        <button className="secondary-btn" onClick={() => go("register")}>
          {t("إنشاء حساب", "Create account")}
        </button>
        <button className="text-btn" onClick={close}>
          {t("متابعة التسوق", "Continue shopping")}
        </button>
      </div>
    </div>
  );
}

function ConfirmDialog({ t, close, confirm }: any) {
  return (
    <div className="overlay">
      <div className="dialog">
        <button className="dialog-close" onClick={close}>
          <Icon name="close" />
        </button>
        <div className="dialog-icon muted">
          <Icon name="logout" size={27} />
        </div>
        <h2>{t("تسجيل الخروج؟", "Log out?")}</h2>
        <p>
          {t(
            "ستعودين إلى تجربة الزائر. ستبقى العناصر المحلية في سلتكِ وقائمة أمنياتكِ.",
            "You’ll return to the guest experience. Local bag and wishlist items will be preserved.",
          )}
        </p>
        <button className="primary-btn danger" onClick={confirm}>
          {t("نعم، تسجيل الخروج", "Yes, log out")}
        </button>
        <button className="secondary-btn" onClick={close}>
          {t("البقاء في الحساب", "Stay signed in")}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, text, action, onClick }: any) {
  return (
    <div className="empty-state">
      <div>
        <Icon name={icon} size={34} />
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      <button className="primary-btn" onClick={onClick}>
        {action}
      </button>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }: any) {
  return (
    <div className={`summary-row ${strong ? "strong" : ""}`}>
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
