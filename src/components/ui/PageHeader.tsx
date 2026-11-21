import { View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { BackButton } from "@/src/components/ui/BackButton";
import { useTranslation } from "@/src/hooks/useTranslation";

interface PageHeaderProps {
  title: string;
  /** Show a back button (secondary screens). Root tabs hide it. */
  showBack?: boolean;
  /** Optional trailing action node (e.g. search icon). */
  right?: React.ReactNode;
}

/**
 * Compact secondary/primary page header (ported from `.page-header`):
 * 42/1fr/42 grid with a centered title and a back button on the leading edge.
 */
export function PageHeader({ title, showBack, right }: PageHeaderProps) {
  const { isRTL } = useTranslation();
  return (
    <View
      className="h-[61px] flex-row items-center border-b border-[#f0ebe4] bg-paper px-4"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <View className="w-[42px] items-start">
        {showBack ? <BackButton /> : null}
      </View>
      <AppText
        weight={700}
        numberOfLines={1}
        className="flex-1 text-center text-[16px] text-ink"
      >
        {title}
      </AppText>
      <View className="w-[42px] items-end">{right}</View>
    </View>
  );
}