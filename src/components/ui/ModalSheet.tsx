import { Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "@/src/hooks/useTranslation";

interface ModalSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Bottom sheet modal (from `.overlay` + `.sheet`): dimmed backdrop that closes on
 * tap, rounded top panel anchored to the bottom with safe-area padding.
 */
export function ModalSheet({ visible, onClose, children }: ModalSheetProps) {
  const insets = useSafeAreaInsets();
  const { dir } = useTranslation();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View className="flex-1 justify-end bg-black/55" style={{ direction: dir }}>
        <Pressable className="flex-1" onPress={onClose} accessibilityLabel="Close" />
        <View
          className="max-h-[85%] rounded-t-[24px] bg-paper px-5 pt-2.5"
          style={{ paddingBottom: Math.max(insets.bottom, 20) + 8 }}
        >
          <View className="mb-4 h-1 w-10 self-center rounded-full bg-[#d5cdc5]" />
          {children}
        </View>
      </View>
    </Modal>
  );
}