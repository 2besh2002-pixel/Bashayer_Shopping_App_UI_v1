import { Modal, Pressable, View } from "react-native";
import { useTranslation } from "@/src/hooks/useTranslation";

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/** Centered modal dialog (from `.dialog`) used for auth/logout prompts. */
export function Dialog({ visible, onClose, children }: DialogProps) {
  const { dir } = useTranslation();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <View className="flex-1 items-center justify-center bg-black/55 px-4" style={{ direction: dir }}>
        <Pressable className="absolute inset-0" onPress={onClose} accessibilityLabel="Close" />
        <View className="w-full max-w-[430px] rounded-[20px] bg-paper px-[22px] pb-5 pt-7">
          {children}
        </View>
      </View>
    </Modal>
  );
}