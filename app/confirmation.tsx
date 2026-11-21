import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Icon } from '@/src/components/ui/Icon';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';

export default function ConfirmationScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleConfirmation')} showBack={false} />
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        <View className="items-center py-8">
          <View className="mb-4 h-[80px] w-[80px] items-center justify-center rounded-full bg-[#f3e6e8]">
            <Icon name="check" size={40} color="#6b2637" />
          </View>
          <AppText weight={700} className="text-center text-[20px] text-ink">
            {t('confirmationTitle')}
          </AppText>
          <AppText className="mt-2 text-center text-[11px] text-muted">
            {t('confirmationText')}
          </AppText>
        </View>

        <View className="rounded-2xl border border-line bg-paper p-4">
          <View className="flex-row items-center justify-between">
            <AppText className="text-[10px] text-muted">{t('illustrativeOrderNumber')}</AppText>
            <AppText weight={700} className="text-[12px] text-ink">
              NSJ-0001
            </AppText>
          </View>
          <View className="mt-2 flex-row items-center justify-between">
            <AppText className="text-[10px] text-muted">{t('orderStatus')}</AppText>
            <AppText weight={700} className="text-[10px] text-wine">
              {t('awaitingConfirmation')}
            </AppText>
          </View>
        </View>

        <View className="mt-5 gap-2">
          <Button onPress={() => router.push('/orders')}>
            {t('viewOrder')}
          </Button>
          <Button variant="secondary" onPress={() => router.replace('/(tabs)')}>
            {t('continueShopping')}
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}
