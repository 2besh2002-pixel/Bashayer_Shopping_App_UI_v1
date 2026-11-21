import { Pressable, View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { Icon } from "@/src/components/ui/Icon";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useSettingsStore } from "@/src/stores/settingsStore";
import { useAuthStore } from "@/src/stores/authStore";
import { activeStore } from "@/store-configs";

interface HomeHeaderProps {
  onPressLanguage: () => void;
  onPressCurrency: () => void;
  onPressSearch: () => void;
  onPressNotifications: () => void;
  onPressLogin: () => void;
  onPressRegister: () => void;
  onPressLogout: () => void;
}

/**
 * Home top bar (ported from `.home-header`): wordmark, language + currency pills,
 * notification bell, and a search/account strip.
 */
export function HomeHeader({
  onPressLanguage,
  onPressCurrency,
  onPressSearch,
  onPressNotifications,
  onPressLogin,
  onPressRegister,
  onPressLogout,
}: HomeHeaderProps) {
  const { t, lang } = useTranslation();
  const currency = useSettingsStore((s) => s.currency);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <View className="bg-paper px-[18px] pb-3 pt-1">
      <View className="flex-row items-center justify-between gap-2.5">
        <View className="flex-row items-baseline gap-1.5">
          <AppText serif className="text-[21px] tracking-[3px] text-ink">
            {activeStore.name}
          </AppText>
          <AppText weight={500} className="text-[10px] text-wine">
            {activeStore.wordmark}
          </AppText>
        </View>

        <View className="flex-row items-center gap-1.5">
          <Pressable
            accessibilityRole="button"
            onPress={onPressLanguage}
            className="h-[34px] flex-row items-center gap-1 rounded-full border border-line bg-white px-2.5 active:opacity-70"
          >
            <Icon name="globe" size={15} color="#211e1c" />
            <AppText weight={700} className="text-[11px] text-ink">
              {lang === "ar" ? "EN" : "ع"}
            </AppText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={onPressCurrency}
            className="h-[34px] flex-row items-center gap-1 rounded-full border border-line bg-white px-2.5 active:opacity-70"
          >
            <AppText weight={700} className="text-[11px] text-ink">
              {currency}
            </AppText>
            <View style={{ transform: [{ rotate: "90deg" }] }}>
              <Icon name="chevron" size={12} color="#211e1c" />
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("notifications")}
            onPress={onPressNotifications}
            className="h-[38px] w-[38px] items-center justify-center rounded-full border border-line bg-white/80 active:opacity-70"
          >
            <Icon name="bell" size={20} color="#211e1c" />
            <View className="absolute top-[7px] h-1.5 w-1.5 rounded-full border border-white bg-wine" style={{ end: 7 }} />
          </Pressable>
        </View>
      </View>

      <View className="mt-2.5 flex-row items-center gap-2.5">
        <Pressable
          accessibilityRole="button"
          onPress={onPressSearch}
          className="h-[42px] min-w-0 flex-1 flex-row items-center gap-2 rounded-xl bg-chipBg px-3 active:opacity-80"
        >
          <Icon name="search" size={18} color="#847d76" />
          <AppText numberOfLines={1} className="text-[11px] text-[#847d76]">
            {t("searchPlaceholder")}
          </AppText>
        </Pressable>

        {isAuthenticated ? (
          <Pressable accessibilityRole="button" onPress={onPressLogout} className="active:opacity-70">
            <AppText weight={700} className="text-[11px] text-wine">
              {t("logout")}
            </AppText>
          </Pressable>
        ) : (
          <View className="flex-row items-center gap-1.5">
            <Pressable accessibilityRole="button" onPress={onPressLogin} className="active:opacity-70">
              <AppText weight={700} className="text-[10px] text-wine">
                {t("login")}
              </AppText>
            </Pressable>
            <View className="h-3 w-px bg-line" />
            <Pressable accessibilityRole="button" onPress={onPressRegister} className="active:opacity-70">
              <AppText weight={700} className="text-[10px] text-wine">
                {t("register")}
              </AppText>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}