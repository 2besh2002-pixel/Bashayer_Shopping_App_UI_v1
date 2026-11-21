import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { Icon } from '@/src/components/ui/Icon';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { usePrice } from '@/src/hooks/usePrice';
import { repositories } from '@/src/repositories';
import type { Order, OrderStatus } from '@/src/types';
import { pick } from '@/src/utils/format';

export default function OrdersScreen() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const price = usePrice();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    repositories.orders.list().then(setOrders);
  }, []);

  const filtered = orders.filter((o) => {
    if (filter === 'all') return true;
    if (filter === 'active') return o.status === 'processing' || o.status === 'shipped';
    return o.status === 'delivered' || o.status === 'cancelled';
  });

  const statusLabel = (s: OrderStatus) => {
    switch (s) {
      case 'processing':
        return t('processing');
      case 'shipped':
        return t('shipped');
      case 'delivered':
        return t('delivered');
      case 'cancelled':
        return t('cancelled');
    }
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleOrders')} showBack />
      <View className="flex-row gap-2 px-[18px] py-3">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 ${filter === f ? 'bg-ink' : 'bg-chipBg'}`}
          >
            <AppText weight={600} className={`text-[10px] ${filter === f ? 'text-white' : 'text-ink'}`}>
              {f === 'all' ? t('allOrders') : f === 'active' ? t('activeOrders') : t('completedOrders')}
            </AppText>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        {filtered.length === 0 ? (
          <View className="items-center justify-center py-16">
            <AppText weight={700} className="text-[16px] text-ink">
              {t('orderEmpty')}
            </AppText>
            <AppText className="mt-2 text-center text-[11px] text-muted">
              {t('orderEmptyText')}
            </AppText>
          </View>
        ) : (
          filtered.map((order) => (
            <Pressable
              key={order.id}
              onPress={() => router.push(`/order/${order.id}`)}
              className="mb-3 rounded-2xl border border-line bg-paper p-4 active:opacity-70"
            >
              <View className="flex-row items-center justify-between">
                <AppText weight={700} className="text-[12px] text-ink">
                  {order.id}
                </AppText>
                <View className="rounded-full bg-chipBg px-2 py-1">
                  <AppText weight={600} className="text-[9px] text-wine">
                    {statusLabel(order.status)}
                  </AppText>
                </View>
              </View>
              <AppText className="mt-1 text-[9px] text-muted">
                {new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}
              </AppText>
              <View className="mt-2 flex-row items-center justify-between">
                <AppText className="text-[10px] text-muted">
                  {order.lines.length} {t('items')}
                </AppText>
                <AppText weight={700} className="text-[12px] text-wine">
                  {price(order.total)}
                </AppText>
              </View>
              <AppText className="mt-2 text-[9px] text-muted">{t('viewOrderDetails')}</AppText>
            </Pressable>
          ))
        )}
      </ScrollView>
    </Screen>
  );
}
