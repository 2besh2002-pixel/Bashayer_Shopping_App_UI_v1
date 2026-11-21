import { View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";

interface SummaryRowProps {
  label: string;
  value: string;
  strong?: boolean;
  valueClassName?: string;
}

/** A single row in the cart/checkout summary card (from `.summary-row`). */
export function SummaryRow({ label, value, strong, valueClassName }: SummaryRowProps) {
  return (
    <View className="flex-row items-center justify-between gap-2.5 py-1.5">
      <AppText
        weight={strong ? 700 : 400}
        className={`text-[10px] ${strong ? "text-[13px] text-ink" : "text-muted"}`}
      >
        {label}
      </AppText>
      <AppText
        weight={strong ? 700 : 500}
        className={`text-[10px] ${strong ? "text-[13px] text-wine" : "text-ink"} ${valueClassName ?? ""}`}
      >
        {value}
      </AppText>
    </View>
  );
}