import { View } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import { useSettingsStore } from "@/src/stores/settingsStore";

interface ScreenProps {
  children: React.ReactNode;
  edges?: Edge[];
  className?: string;
  /** Scrollable screens pass a ScrollView instead. */
  bgClassName?: string;
}

/**
 * Standard screen wrapper: paper background + safe-area handling.
 * Bottom nav screens use edges={["top"]} because the shared BottomNav already
 * respects the bottom inset.
 */
export function Screen({
  children,
  edges = ["top"],
  className = "",
  bgClassName = "bg-paper",
}: ScreenProps) {
  const lang = useSettingsStore((s) => s.lang);
  const direction = lang === "ar" ? "rtl" : "ltr";
  return (
    <SafeAreaView edges={edges} className={`flex-1 ${bgClassName}`} style={{ direction }}>
      <View className={`flex-1 ${className}`}>
        {children}
      </View>
    </SafeAreaView>
  );
}