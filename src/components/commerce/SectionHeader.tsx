import { Pressable, View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { Icon } from "@/src/components/ui/Icon";

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
}

/** Section heading with an optional "View all ›" action (from `.section-head`). */
export function SectionHeader({ title, actionLabel, onPressAction }: SectionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-[18px] pb-3.5 pt-7">
      <AppText weight={700} className="text-[19px] tracking-[-0.3px] text-ink">
        {title}
      </AppText>
      {actionLabel ? (
        <Pressable
          accessibilityRole="button"
          onPress={onPressAction}
          className="flex-row items-center gap-0.5 active:opacity-60"
        >
          <AppText className="text-[11px] text-muted">{actionLabel}</AppText>
          <Icon name="chevron" size={14} color="#78706a" direction="forward" />
        </Pressable>
      ) : null}
    </View>
  );
}