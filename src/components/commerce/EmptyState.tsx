import { View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { Button } from "@/src/components/ui/Button";
import { Icon, type IconName } from "@/src/components/ui/Icon";

interface EmptyStateProps {
  icon: IconName;
  title: string;
  text: string;
  actionLabel: string;
  onAction: () => void;
}

/** Centered empty state (from `.empty-state`) with an icon medallion. */
export function EmptyState({ icon, title, text, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className="min-h-[420px] items-center justify-center px-8 py-10">
      <View className="mb-[22px] h-[82px] w-[82px] items-center justify-center rounded-full bg-[#f4eee9]">
        <Icon name={icon} size={34} color="#6b2637" />
      </View>
      <AppText weight={700} className="mb-2 text-center text-[20px] text-ink">
        {title}
      </AppText>
      <AppText className="mb-6 max-w-[280px] text-center text-[11px] leading-[1.8] text-muted">
        {text}
      </AppText>
      <View className="w-auto self-center">
        <Button onPress={onAction} className="px-6">
          {actionLabel}
        </Button>
      </View>
    </View>
  );
}