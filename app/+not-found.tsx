import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';

export default function NotFoundScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Screen edges={['top', 'bottom']}>
        <View className="flex-1 items-center justify-center px-8">
          <AppText weight={700} className="mb-4 text-center text-[16px] text-ink">
            {t('somethingWrong')}
          </AppText>
          <Button onPress={() => router.replace('/(tabs)')}>
            {t('titleHome')}
          </Button>
        </View>
      </Screen>
    </>
  );
}
