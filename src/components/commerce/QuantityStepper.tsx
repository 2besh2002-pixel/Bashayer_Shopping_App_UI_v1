import { Pressable, View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { Icon } from "@/src/components/ui/Icon";
import { useTranslation } from "@/src/hooks/useTranslation";
import { colors } from "@/src/theme/tokens";

interface QuantityStepperProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

/** Quantity stepper (from `.stepper`). Disables at bounds. */
export function QuantityStepper({ value, onIncrease, onDecrease, min = 1, max = 10 }: QuantityStepperProps) {
  const { t } = useTranslation();
  return (
    <View className="h-8 flex-row items-center rounded-lg border border-line">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("decreaseQty")}
        disabled={value <= min}
        onPress={onDecrease}
        className={`h-full w-[31px] items-center justify-center ${value <= min ? "opacity-30" : "active:opacity-60"}`}
      >
        <Icon name="minus" size={14} color="#736b64" />
      </Pressable>
      <AppText weight={500} className="w-[25px] text-center text-[10px] text-ink">
        {value}
      </AppText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={t("increaseQty")}
        disabled={value >= max}
        onPress={onIncrease}
        className={`h-full w-[31px] items-center justify-center ${value >= max ? "opacity-30" : "active:opacity-60"}`}
      >
        <Icon name="plus" size={14} color={colors.muted} />
      </Pressable>
    </View>
  );
}