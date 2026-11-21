import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { Icon } from '@/src/components/ui/Icon';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { repositories } from '@/src/repositories';
import type { Notification } from '@/src/types';
import { pick } from '@/src/utils/format';

export default function NotificationsScreen() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [items, setItems] = useState<Notification[]>([]);

  useEffect(() => {
    repositories.notifications.list().then(setItems);
  }, []);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const iconFor = (icon: Notification['icon']) => (icon === 'box' ? 'box' : icon === 'heart' ? 'heart' : 'bell');

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleNotifications')} showBack />
      <View className="flex-row items-center justify-between px-[18px] py-3">
        <AppText className="text-[10px] text-muted">
          {items.filter((n) => !n.read).length} {t('unread')}
        </AppText>
        <Pressable onPress={markAllRead} className="active:opacity-70">
          <AppText weight={700} className="text-[10px] text-wine">
            {t('markAllRead')}
          </AppText>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        {items.length === 0 ? (
          <View className="items-center justify-center py-16">
            <AppText className="text-muted">{t('noNotifications')}</AppText>
          </View>
        ) : (
          items.map((n) => (
            <View
              key={n.id}
              className={`mb-2 flex-row gap-3 rounded-xl border p-3 ${
                n.read ? 'border-line bg-paper' : 'border-wine bg-[#f7f1f2]'
              }`}
            >
              <View className="h-[36px] w-[36px] items-center justify-center rounded-full bg-chipBg">
                <Icon name={iconFor(n.icon)} size={16} color="#6b2637" />
              </View>
              <View className="flex-1">
                <AppText weight={700} className="text-[11px] text-ink">
                  {pick(n.title, lang)}
                </AppText>
                <AppText className="mt-1 text-[9px] text-muted">
                  {pick(n.body, lang)}
                </AppText>
                <AppText className="mt-1 text-[8px] text-muted">
                  {pick(n.time, lang)}
                </AppText>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
