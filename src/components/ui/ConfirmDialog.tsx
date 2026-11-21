import { Pressable, View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { Button } from "@/src/components/ui/Button";
import { Dialog } from "@/src/components/ui/Dialog";
import { Icon, type IconName } from "@/src/components/ui/Icon";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  text: string;
  confirmLabel: string;
  cancelLabel: string;
  icon?: IconName;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

/** Reusable confirmation dialog (used for logout). */
export function ConfirmDialog({
  visible,
  title,
  text,
  confirmLabel,
  cancelLabel,
  icon = "logout",
  danger = true,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog visible={visible} onClose={onClose}>
      <Pressable
        accessibilityRole="button"
        onPress={onClose}
        className="absolute top-[13px] h-[33px] w-[33px] items-center justify-center rounded-full border border-line active:opacity-70"
        style={{ end: 13 }}
      >
        <Icon name="close" size={18} color="#211e1c" />
      </Pressable>
      <View
        className={`mb-4 h-[65px] w-[65px] items-center justify-center self-center rounded-full ${
          danger ? "bg-[#f3e6e8]" : "bg-[#efebe6]"
        }`}
      >
        <Icon name={icon} size={27} color={danger ? "#6b2637" : "#211e1c"} />
      </View>
      <AppText weight={700} className="mb-1.5 text-center text-[19px] text-ink">
        {title}
      </AppText>
      <AppText className="mb-5 text-center text-[10px] leading-[1.8] text-muted">{text}</AppText>
      <Button variant={danger ? "danger" : "primary"} onPress={onConfirm}>
        {confirmLabel}
      </Button>
      <Button variant="secondary" onPress={onClose} className="mt-2">
        {cancelLabel}
      </Button>
    </Dialog>
  );
}