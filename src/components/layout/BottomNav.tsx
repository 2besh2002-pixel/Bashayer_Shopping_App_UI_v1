import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "expo-router/js-tabs";

import { AppText } from "@/src/components/ui/AppText";
import { Icon, type IconName } from "@/src/components/ui/Icon";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useCartStore } from "@/src/stores/cartStore";
import type { TranslationKey } from "@/src/i18n/translations";

interface TabDef {
  key: string;
  route: string;
  icon: IconName;
  label: TranslationKey;
}

const TABS_LTR: TabDef[] = [
  { key: "categories", route: "categories", icon: "grid", label: "navCategories" },
  { key: "wishlist", route: "wishlist", icon: "heart", label: "navWishlist" },
  { key: "home", route: "index", icon: "home", label: "navHome" },
  { key: "cart", route: "cart", icon: "bag", label: "navCart" },
  { key: "account", route: "account", icon: "user", label: "navAccount" },
];

const TABS_RTL = [...TABS_LTR].reverse();

export function BottomNav({ state, navigateToTab }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { t, isRTL } = useTranslation();
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const tabs = isRTL ? TABS_RTL : TABS_LTR;

  const activeRoute = state.routes[state.index]?.name;

  const handlePress = (routeName: string) => {
    const target = state.routes.find((r) => r.name === routeName);
    if (target) navigateToTab(target.key);
  };

  return (
    <View
      className="border-t border-line bg-paper"
      style={{ paddingBottom: Math.max(insets.bottom, 6), direction: isRTL ? "rtl" : "ltr" }}
    >
      <View
        className="h-[68px] flex-row"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        {tabs.map((tab) => {
          const active = tab.route === activeRoute;
          return (
            <Pressable
              key={tab.key}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={t(tab.label)}
              onPress={() => handlePress(tab.route)}
              className="flex-1 items-center active:opacity-70"
              style={{ paddingTop: 6 }}
            >
              <View className="h-10 items-center justify-center">
                {active ? (
                  <View
                    pointerEvents="none"
                    className="absolute h-[46px] w-[46px] rounded-full bg-black"
                  />
                ) : null}
                <Icon
                  name={tab.icon}
                  size={tab.key === "home" ? 22 : 21}
                  color={active ? "#ffffff" : "#918982"}
                  filled={active && tab.key === "wishlist"}
                />
                {tab.key === "cart" && cartCount > 0 ? (
                  <View className="absolute -top-0.5 h-[15px] min-w-[15px] items-center justify-center rounded-full border-2 border-white bg-wine px-0.5" style={{ end: -8 }}>
                    <AppText weight={700} className="text-[8px] text-white">
                      {cartCount > 9 ? "9+" : cartCount}
                    </AppText>
                  </View>
                ) : null}
              </View>
              <AppText
                weight={active ? 700 : 500}
                numberOfLines={1}
                className={`mt-0.5 text-[8px] ${active ? "text-wine" : "text-[#918982]"}`}
              >
                {t(tab.label)}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
