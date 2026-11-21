import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { Icon } from '@/src/components/ui/Icon';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { SummaryRow } from '@/src/components/commerce/SummaryRow';
import { useTranslation } from '@/src/hooks/useTranslation';
import { usePrice } from '@/src/hooks/usePrice';
import { repositories } from '@/src/repositories';
import type { Order, OrderStatus } from '@/src/types';
import { pick } from '@/src/utils/format';

export default function OrderDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, lang } = useTranslation();
  const price = usePrice();
  const [order, setOrder] = useState<Order | undefined>();

  useEffect(() => {
    if (id) repositories.orders.get(id).then(setOrder);
  }, [id]);

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

  if (!order) {
    return (
      <Screen edges={['top', 'bottom']}>
        <PageHeader title={t('titleOrderDetails')} showBack />
        <View className="flex-1 items-center justify-center">
          <AppText className="text-muted">{t('loading')}</AppText>
        </View>
      </Screen>
    );
  }

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleOrderDetails')} showBack />
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        <View className="mb-4 rounded-2xl border border-line bg-paper p-4">
          <View className="flex-row items-center justify-between">
            <AppText weight={700} className="text-[13px] text-ink">
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
        </View>

        <AppText weight={700} className="mb-2 text-[12px] text-ink">
          {t('orderTimeline')}
        </AppText>
        <View className="mb-4 rounded-2xl border border-line bg-paper p-4">
          {['processing', 'shipped', 'delivered'].map((s, i) => {
            const done =
              order.status === 'delivered' ||
              (order.status === 'shipped' && i <= 1) ||
              (order.status === 'processing' && i === 0);
            return (
              <View key={s} className="mb-2 flex-row items-center gap-3">
                <View
                  className={`h-6 w-6 items-center justify-center rounded-full ${
                    done ? 'bg-wine' : 'bg-chipBg'
                  }`}
                >
                  {done ? <Icon name="check" size={12} color="#fff" /> : null}
                </View>
                <AppText className={`text-[10px] ${done ? 'text-ink' : 'text-muted'}`}>
                  {s === 'processing'
                    ? t('processing')
                    : s === 'shipped'
                      ? t('shipped')
                      : t('delivered')}
                </AppText>
              </View>
            );
          })}
        </View>

        <AppText weight={700} className="mb-2 text-[12px] text-ink">
          {t('items')}
        </AppText>
        <View className="mb-4 rounded-2xl border border-line bg-paper p-4">
          {order.lines.map((line, i) => (
            <View key={i} className="mb-2 flex-row items-center justify-between">
              <View className="flex-1">
                <AppText weight={600} className="text-[10px] text-ink">
                  {pick(line.name, lang)}
                </AppText>
                <AppText className="text-[9px] text-muted">
                  {line.sizeLabel ? `${t('sizeLabel')}: ${line.sizeLabel}` : ''}{' '}
                  {line.colorName ? `· ${pick(line.colorName, lang)}` : ''} · {t('qty')} {line.quantity}
                </AppText>
              </View>
              <AppText weight={600} className="text-[10px] text-wine">
                {price(line.unitPrice * line.quantity)}
              </AppText>
            </View>
          ))}
          <View className="mt-2 h-px bg-line" />
          <SummaryRow label={t('subtotal')} value={price(order.subtotal)} />
          <SummaryRow label={t('delivery')} value={price(order.deliveryFee)} />
          <SummaryRow label={t('total')} value={price(order.total)} strong />
        </View>
      </ScrollView>
    </Screen>
  );
}
