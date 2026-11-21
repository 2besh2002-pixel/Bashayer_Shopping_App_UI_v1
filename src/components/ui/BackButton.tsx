import { Pressable } from "react-native";
import { useRouter } from "expo-router";

import { Icon } from "@/src/components/ui/Icon";
import { useTranslation } from "@/src/hooks/useTranslation";
import { colors } from "@/src/theme/tokens";

export function BackButton() {
  const router = useRouter();
  const { t } = useTranslation();

  const goBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace("/(tabs)");
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={t("back")}
      onPress={goBack}
      className="h-[38px] w-[38px] items-center justify-center rounded-full border border-line bg-white active:opacity-70"
      hitSlop={6}
    >
      <Icon name="arrow" size={20} color={colors.ink} direction="back" />
    </Pressable>
  );
}
