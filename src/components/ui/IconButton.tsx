import { Pressable } from "react-native";

import { Icon, type IconName } from "@/src/components/ui/Icon";
import { colors } from "@/src/theme/tokens";

interface IconButtonProps {
  name: IconName;
  onPress?: () => void;
  size?: number;
  color?: string;
  /** Render a filled heart / star. */
  filled?: boolean;
  /** Circular bordered button (header / square buttons). */
  variant?: "plain" | "circle" | "square";
  /** Flip horizontally in RTL (for directional icons). */
  rtlFlip?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
}

export function IconButton({
  name,
  onPress,
  size = 20,
  color = colors.ink,
  filled,
  variant = "plain",
  rtlFlip,
  disabled,
  accessibilityLabel,
}: IconButtonProps) {
  const content = (
    <Icon
      name={name}
      size={size}
      color={color}
      filled={filled}
      direction={rtlFlip ? (name === "arrow" ? "back" : "forward") : undefined}
    />
  );

  if (variant === "plain") {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        onPress={onPress}
        hitSlop={8}
        className={disabled ? "opacity-40" : "active:opacity-60"}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      className={`items-center justify-center border border-line bg-white ${
        variant === "circle" ? "h-[38px] w-[38px] rounded-full" : "h-[36px] w-[36px] rounded-lg"
      } ${disabled ? "opacity-40" : "active:opacity-70"}`}
    >
      {content}
    </Pressable>
  );
}