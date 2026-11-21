import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { Icon } from '@/src/components/ui/Icon';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';

export default function SupportScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const faqs = [
    { q: t('faqReturnsQ'), a: t('faqReturnsA') },
    { q: t('faqShippingQ'), a: t('faqShippingA') },
    { q: t('faqSizeQ'), a: t('faqSizeA') },
  ];

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleSupport')} showBack />
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        <View className="mb-4 rounded-2xl bg-wine p-5">
          <AppText serif weight={700} className="text-[18px] text-white">
            {t('supportTitle')}
          </AppText>
          <AppText className="mt-2 text-[11px] text-white/90">
            {t('supportText')}
          </AppText>
          <View className="mt-4 flex-row items-center gap-2">
            <Icon name="card" size={16} color="#fff" />
            <AppText weight={700} className="text-[11px] text-white">
              {t('supportEmail')} support@naseej.com
            </AppText>
          </View>
        </View>

        <AppText weight={700} className="mb-2 text-[12px] text-ink">
          {t('supportFaqTitle')}
        </AppText>
        {faqs.map((f, i) => (
          <View key={i} className="mb-3 rounded-xl border border-line bg-paper p-4">
            <AppText weight={700} className="text-[11px] text-ink">
              {f.q}
            </AppText>
            <AppText className="mt-2 text-[10px] leading-[1.7] text-muted">
              {f.a}
            </AppText>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
