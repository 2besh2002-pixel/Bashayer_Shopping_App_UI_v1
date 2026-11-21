import { TextInput, type TextInputProps } from "react-native";

import { useSettingsStore } from "@/src/stores/settingsStore";
import { fontFamilyFor } from "@/src/theme/typography";

export function AppTextInput({ style, ...props }: TextInputProps) {
  const lang = useSettingsStore((state) => state.lang);

  return (
    <TextInput
      {...props}
      style={[
        {
          direction: lang === "ar" ? "rtl" : "ltr",
          writingDirection: lang === "ar" ? "rtl" : "ltr",
          textAlign: lang === "ar" ? "right" : "left",
          fontFamily: fontFamilyFor(lang),
        },
        style,
      ]}
    />
  );
}
