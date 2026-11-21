import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { CurrencySheet } from '@/src/components/commerce/CurrencySheet';
import { Icon } from '@/src/components/ui/Icon';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useSettingsStore } from '@/src/stores/settingsStore';

export default function SettingsScreen() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const currency = useSettingsStore((s) => s.currency);
  const toggleLang = useSettingsStore((s) => s.toggleLang);
  const [currencyVisible, setCurrencyVisible] = useState(false);

  const rows = [
    { icon: 'globe' as const, label: t('language'), value: lang === 'ar' ? 'العربية' : 'English', onPress: toggleLang },
    { icon: 'card' as const, label: t('currency'), value: currency, onPress: () => setCurrencyVisible(true) },
  ];

  const accountRows = [
    { icon: 'user' as const, label: t('personalInfo'), onPress: () => {} },
    { icon: 'pin' as const, label: t('addressManagement'), onPress: () => router.push('/addresses') },
    { icon: 'bell' as const, label: t('notificationPrefs'), onPress: () => {} },
  ];

  const supportRows = [
    { icon: 'help' as const, label: t('privacyTerms'), onPress: () => {} },
    { icon: 'box' as const, label: t('returnPolicy'), onPress: () => {} },
    { icon: 'edit' as const, label: t('contactSupport'), onPress: () => router.push('/support') },
  ];

  const renderSection = (title: string, items: { icon: any; label: string; value?: string; onPress: () => void }[]) => (
    <View className="mb-4">
      {title ? (
        <AppText weight={700} className="mb-2 px-[18px] text-[11px] text-muted">
          {title}
        </AppText>
      ) : null}
      <View className="mx-[18px] overflow-hidden rounded-2xl border border-line bg-paper">
        {items.map((item, i) => (
          <Pressable
            key={item.label}
            onPress={item.onPress}
            className={`flex-row items-center justify-between px-4 py-3.5 active:opacity-70 ${
              i < items.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <View className="flex-row items-center gap-3">
              <Icon name={item.icon} size={18} color="#211e1c" />
              <AppText weight={500} className="text-[11px] text-ink">
                {item.label}
              </AppText>
            </View>
            <View className="flex-row items-center gap-1">
              {item.value ? (
                <AppText className="text-[10px] text-muted">{item.value}</AppText>
              ) : null}
              <Icon name="chevron" size={16} color="#78706a" direction="forward" />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleSettings')} showBack />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {renderSection(t('preferences'), rows)}
        {renderSection(t('accountAndSupport'), accountRows)}
        {renderSection('', supportRows)}
      </ScrollView>

      <CurrencySheet visible={currencyVisible} onClose={() => setCurrencyVisible(false)} />
    </Screen>
  );
}
