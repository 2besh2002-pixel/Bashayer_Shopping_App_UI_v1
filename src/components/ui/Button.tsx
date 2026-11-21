import { ActivityIndicator, Pressable, type ViewStyle } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { Icon, type IconName } from "@/src/components/ui/Icon";
import { colors } from "@/src/theme/tokens";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  /** Optional icon on the leading edge (flipped in RTL). */
  iconLeft?: IconName;
  /** Optional icon on the trailing edge (flipped in RTL). */
  iconRight?: IconName;
  className?: string;
  style?: ViewStyle;
}

const BG: Record<Variant, string> = {
  primary: "bg-wine",
  secondary: "bg-white border border-line",
  danger: "bg-wine-dark",
  ghost: "bg-transparent",
};

const FG: Record<Variant, string> = {
  primary: "text-white",
  secondary: "text-ink",
  danger: "text-white",
  ghost: "text-wine",
};

/**
 * Shared button. Matches the reference `.primary-btn` / `.secondary-btn`
 * styling: full width, 50px tall, 12px radius.
 */
export function Button({
  children,
  onPress,
  variant = "primary",
  disabled,
  loading,
  iconLeft,
  iconRight,
  className = "",
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      className={`h-[50px] w-full flex-row items-center justify-center gap-2.5 rounded-xl px-4 ${BG[variant]} ${
        isDisabled ? "opacity-50" : "active:opacity-80"
      } ${className}`}
      style={style}
    >
      {loading ? (
        <ActivityIndicator color={variant === "secondary" || variant === "ghost" ? colors.ink : "#fff"} />
      ) : (
        <>
          {iconLeft ? (
            <Icon
              name={iconLeft}
              size={18}
              color={variant === "secondary" || variant === "ghost" ? colors.ink : "#fff"}
            />
          ) : null}
          <AppText weight={700} className={`text-[12px] ${FG[variant]}`}>
            {children}
          </AppText>
          {iconRight ? (
            <Icon
              name={iconRight}
              size={18}
              color={variant === "secondary" || variant === "ghost" ? colors.ink : "#fff"}
              direction="forward"
            />
          ) : null}
        </>
      )}
    </Pressable>
  );
}