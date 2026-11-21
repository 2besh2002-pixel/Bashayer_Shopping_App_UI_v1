import { Image, Pressable, ScrollView, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { EmptyState } from '@/src/components/commerce/EmptyState';
import { Icon } from '@/src/components/ui/Icon';
import { QuantityStepper } from '@/src/components/commerce/QuantityStepper';
import { Screen } from '@/src/components/ui/Screen';
import { SummaryRow } from '@/src/components/commerce/SummaryRow';
import { AuthPromptDialog } from '@/src/components/ui/AuthPromptDialog';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useCartDetailed } from '@/src/hooks/useCartDetailed';
import { useCartStore } from '@/src/stores/cartStore';
import { usePrice } from '@/src/hooks/usePrice';
import { useUiStore } from '@/src/stores/uiStore';
import { useAuthStore } from '@/src/stores/authStore';
import { pick } from '@/src/utils/format';

export default function CartScreen() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const price = usePrice();
  const { lines, subtotalSar } = useCartDetailed();
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const remove = useCartStore((s) => s.remove);
  const showToast = useUiStore((s) => s.showToast);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [authPrompt, setAuthPrompt] = useState(false);

  if (lines.length === 0) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="border-b border-line bg-paper px-4 py-3">
          <AppText weight={700} className="text-[16px] text-ink">
            {t('titleCart')}
          </AppText>
        </View>
        <EmptyState
          icon="bag"
          title={t('cartEmptyTitle')}
          text={t('cartEmptyText')}
          actionLabel={t('startShopping')}
          onAction={() => router.push('/(tabs)')}
        />
      </Screen>
    );
  }

  const handleCheckout = () => {
    if (isAuthenticated) router.push('/checkout');
    else setAuthPrompt(true);
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="border-b border-line bg-paper px-4 py-3">
        <AppText weight={700} className="text-[16px] text-ink">
          {t('titleCart')}
        </AppText>
      </View>
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        <View className="mb-3 flex-row items-center gap-2 rounded-xl bg-[#f4eee9] p-3">
          <Icon name="truck" size={18} color="#6b2637" />
          <View className="flex-1">
            <AppText weight={700} className="text-[10px] text-ink">
              {t('freeDelivery')}
            </AppText>
            <AppText className="text-[9px] text-muted">{t('freeDeliveryHint')}</AppText>
          </View>
        </View>

        {lines.map(({ item, product }) => (
          <View key={item.id} className="mb-3 flex-row gap-3 rounded-2xl border border-line bg-paper p-3">
            <Image source={{ uri: product.images[0] }} className="h-[80px] w-[68px] rounded-xl" resizeMode="cover" />
            <View className="flex-1">
              <AppText weight={600} className="text-[11px] text-ink">
                {pick(product.name, lang)}
              </AppText>
              <AppText className="mt-0.5 text-[9px] text-muted">
                {t('sizeLabel')}: {item.sizeId ?? '-'} · {t('colorLabel')}: {item.colorId ?? '-'}
              </AppText>
              <AppText weight={600} className="mt-1 text-[11px] text-wine">
                {price(product.price)}
              </AppText>
              <View className="mt-2 flex-row items-center justify-between">
                <QuantityStepper
                  value={item.quantity}
                  onIncrease={() => increment(item.id)}
                  onDecrease={() => decrement(item.id)}
                />
                <Pressable
                  onPress={() => {
                    remove(item.id);
                    showToast(t('itemRemovedFromCart'));
                  }}
                  className="h-[32px] w-[32px] items-center justify-center rounded-lg border border-line active:opacity-70"
                >
                  <Icon name="trash" size={16} color="#211e1c" />
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        <View className="mt-2 rounded-2xl border border-line bg-paper p-4">
          <AppText weight={700} className="mb-2 text-[12px] text-ink">
            {t('bagSummary')}
          </AppText>
          <SummaryRow label={t('subtotal')} value={price(subtotalSar)} />
          <SummaryRow label={t('discounts')} value="—" />
          <SummaryRow label={t('delivery')} value={t('calculatedLater')} />
          <View className="my-2 h-px bg-line" />
          <SummaryRow label={t('total')} value={price(subtotalSar)} strong />
        </View>

        <Button onPress={handleCheckout} className="mt-4" iconRight="arrow">
          {t('continueToCheckout')}
        </Button>
      </ScrollView>

      <AuthPromptDialog
        visible={authPrompt}
        onClose={() => setAuthPrompt(false)}
        onLogin={() => {
          setAuthPrompt(false);
          router.push('/login');
        }}
        onRegister={() => {
          setAuthPrompt(false);
          router.push('/register');
        }}
      />
    </Screen>
  );
}
