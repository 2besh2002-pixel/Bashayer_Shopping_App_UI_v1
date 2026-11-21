import { Text as RNText, type TextProps } from "react-native";

import { fontFamilyFor, type FontWeight } from "@/src/theme/typography";
import { useSettingsStore } from "@/src/stores/settingsStore";

export interface AppTextProps extends TextProps {
  weight?: FontWeight;
  /** Use the display serif (Latin) / bold Arabic face. */
  serif?: boolean;
  italic?: boolean;
}

/**
 * Language-aware text. Picks the correct font family for Arabic vs English so
 * screens never hardcode font names. Styling (size/colour) is applied via
 * NativeWind `className` or `style`.
 */
export function AppText({ weight = 400, serif, italic, style, ...props }: AppTextProps) {
  const lang = useSettingsStore((s) => s.lang);
  const family = fontFamilyFor(lang, { weight, serif, italic });
  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: family,
          direction: lang === "ar" ? "rtl" : "ltr",
          writingDirection: lang === "ar" ? "rtl" : "ltr",
        },
        style,
      ]}
    />
  );
}