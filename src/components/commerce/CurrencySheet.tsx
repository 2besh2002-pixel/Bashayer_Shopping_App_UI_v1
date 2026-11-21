import { useMemo, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { AppTextInput } from "@/src/components/ui/AppTextInput";
import { Icon } from "@/src/components/ui/Icon";
import { ModalSheet } from "@/src/components/ui/ModalSheet";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useSettingsStore } from "@/src/stores/settingsStore";
import { useUiStore } from "@/src/stores/uiStore";
import { CURRENCIES } from "@/src/utils/currency";

interface CurrencySheetProps {
  visible: boolean;
  onClose: () => void;
}

/** Currency selector bottom sheet (from `.currency-list`). */
export function CurrencySheet({ visible, onClose }: CurrencySheetProps) {
  const { t, lang } = useTranslation();
  const currency = useSettingsStore((s) => s.currency);
  const setCurrency = useSettingsStore((s) => s.setCurrency);
  const showToast = useUiStore((s) => s.showToast);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter((c) =>
      `${c.code} ${c.name.ar} ${c.name.en} ${c.symbol}`.toLowerCase().includes(q),
    );
  }, [query]);

  const select = (code: typeof currency, name: string) => {
    setCurrency(code);
    onClose();
    showToast(`${t("currencySelected")} ${name}`);
  };

  return (
    <ModalSheet visible={visible} onClose={onClose}>
      <View className="mb-3.5 flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <AppText weight={700} className="text-[18px] text-ink">
            {t("chooseCurrency")}
          </AppText>
          <AppText className="mt-1 text-[9px] text-muted">{t("currencySheetHint")}</AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("back")}
          onPress={onClose}
          className="h-[34px] w-[34px] items-center justify-center rounded-full border border-line active:opacity-70"
        >
          <Icon name="close" size={18} color="#211e1c" />
        </Pressable>
      </View>

      <View className="h-[46px] flex-row items-center gap-2 rounded-xl border border-line bg-white px-3">
        <Icon name="search" size={18} color="#78706a" />
        <AppTextInput
          value={query}
          onChangeText={setQuery}
          placeholder={t("searchCurrency")}
          placeholderTextColor="#9a928b"
          className="flex-1 text-[11px] text-ink"
          style={{ padding: 0 }}
        />
      </View>

      <ScrollView className="mt-2.5" showsVerticalScrollIndicator={false}>
        {filtered.map((c) => {
          const selected = c.code === currency;
          return (
            <Pressable
              key={c.code}
              accessibilityRole="button"
              onPress={() => select(c.code, lang === "ar" ? c.name.ar : c.name.en)}
              className="h-[61px] flex-row items-center gap-3 border-b border-line active:opacity-70"
            >
              <View className="h-[35px] w-[35px] items-center justify-center rounded-full bg-[#f0ebe5]">
                <AppText weight={700} className="text-[10px] text-ink">
                  {c.symbol}
                </AppText>
              </View>
              <View className="flex-1">
                <AppText weight={600} className="text-[10px] text-ink">
                  {lang === "ar" ? c.name.ar : c.name.en}
                </AppText>
                <AppText className="text-[8px] text-muted">
                  {c.code} · {c.symbol}
                </AppText>
              </View>
              {selected ? (
                <View className="h-6 w-6 items-center justify-center rounded-full bg-wine">
                  <Icon name="check" size={15} color="#ffffff" />
                </View>
              ) : null}
            </Pressable>
          );
        })}
        {filtered.length === 0 ? (
          <AppText className="py-6 text-center text-[11px] text-muted">{t("noResults")}</AppText>
        ) : null}
      </ScrollView>

      <View className="mt-3 rounded-lg bg-chipBg p-2.5">
        <AppText className="text-[8px] leading-[1.7] text-muted">{t("currencyDemoNote")}</AppText>
      </View>
    </ModalSheet>
  );
}