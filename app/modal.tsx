import { StatusBar } from 'expo-status-bar';
import { Platform, View } from 'react-native';
import { AppText } from '@/src/components/ui/AppText';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';

export default function ModalScreen() {
  const { t } = useTranslation();
  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('brandName')} showBack />
      <View className="flex-1 items-center justify-center px-8">
        <AppText weight={700} className="text-center text-[16px] text-ink">
          {t('demoBadge')}
        </AppText>
        <AppText className="mt-2 text-center text-[11px] text-muted">
          {t('brandTagline')}
        </AppText>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Screen>
  );
}
