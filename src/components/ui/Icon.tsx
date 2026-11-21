import { Feather, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { useTranslation } from "@/src/hooks/useTranslation";
import { colors } from "@/src/theme/tokens";

export type IconName =
  | "home"
  | "grid"
  | "heart"
  | "bag"
  | "user"
  | "search"
  | "bell"
  | "globe"
  | "chevron"
  | "arrow"
  | "star"
  | "filter"
  | "sliders"
  | "plus"
  | "minus"
  | "close"
  | "check"
  | "truck"
  | "card"
  | "pin"
  | "box"
  | "settings"
  | "logout"
  | "camera"
  | "help"
  | "edit"
  | "trash"
  | "eye";

const FEATHER: Record<IconName, React.ComponentProps<typeof Feather>["name"]> = {
  home: "home",
  grid: "grid",
  heart: "heart",
  bag: "shopping-bag",
  user: "user",
  search: "search",
  bell: "bell",
  globe: "globe",
  chevron: "chevron-right",
  arrow: "arrow-left",
  star: "star",
  filter: "filter",
  sliders: "sliders",
  plus: "plus",
  minus: "minus",
  close: "x",
  check: "check",
  truck: "truck",
  card: "credit-card",
  pin: "map-pin",
  box: "box",
  settings: "settings",
  logout: "log-out",
  camera: "camera",
  help: "help-circle",
  edit: "edit-3",
  trash: "trash-2",
  eye: "eye",
};

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  filled?: boolean;
  direction?: "back" | "forward";
}

/**
 * Single icon component wrapping the Feather set (with filled Ionicons for the
 * heart/star active states) so the whole app shares one icon vocabulary.
 */
export function Icon({ name, size = 20, color = colors.ink, filled = false, direction }: IconProps) {
  const { isRTL } = useTranslation();
  const shouldFlip =
    direction === "back"
      ? isRTL
      : direction === "forward"
        ? name === "arrow"
          ? !isRTL
          : name === "chevron" && isRTL
        : false;
  const icon =
    filled && (name === "heart" || name === "star") ? (
      <Ionicons name={name} size={size} color={color} />
    ) : (
      <Feather name={FEATHER[name]} size={size} color={color} />
    );

  return shouldFlip ? <View style={{ transform: [{ scaleX: -1 }] }}>{icon}</View> : icon;
}