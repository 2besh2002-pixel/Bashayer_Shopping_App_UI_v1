import { Pressable, View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { Button } from "@/src/components/ui/Button";
import { Dialog } from "@/src/components/ui/Dialog";
import { Icon, type IconName } from "@/src/components/ui/Icon";
import { useTranslation } from "@/src/hooks/useTranslation";

interface AuthPromptDialogProps {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

/** Guest checkout prompt (from `.dialog`): explains an account is required. */
export function AuthPromptDialog({ visible, onClose, onLogin, onRegister }: AuthPromptDialogProps) {
  const { t } = useTranslation();
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
      <View className="mb-4 h-[65px] w-[65px] items-center justify-center self-center rounded-full bg-[#f3e6e8]">
        <Icon name="bag" size={28} color="#6b2637" />
      </View>
      <AppText weight={700} className="mb-1.5 text-center text-[19px] text-ink">
        {t("guestCheckoutTitle")}
      </AppText>
      <AppText className="mb-5 text-center text-[10px] leading-[1.8] text-muted">
        {t("guestCheckoutText")}
      </AppText>
      <Button onPress={onLogin} className="mb-2">
        {t("loginLong")}
      </Button>
      <Button variant="secondary" onPress={onRegister}>
        {t("createAccount")}
      </Button>
      <Pressable accessibilityRole="button" onPress={onClose} className="mt-4 active:opacity-60">
        <AppText weight={700} className="text-center text-[10px] text-wine">
          {t("continueShopping")}
        </AppText>
      </Pressable>
    </Dialog>
  );
}