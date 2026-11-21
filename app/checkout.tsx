import { Pressable, ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { AppTextInput } from '@/src/components/ui/AppTextInput';
import { Button } from '@/src/components/ui/Button';
import { Icon } from '@/src/components/ui/Icon';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { SummaryRow } from '@/src/components/commerce/SummaryRow';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useCartDetailed } from '@/src/hooks/useCartDetailed';
import { useCartStore } from '@/src/stores/cartStore';
import { usePrice } from '@/src/hooks/usePrice';
import { useUiStore } from '@/src/stores/uiStore';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { repositories } from '@/src/repositories';
import { demoOrderNumber, pick } from '@/src/utils/format';
import type { Address } from '@/src/types';

export default function CheckoutScreen() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const price = usePrice();
  const { lines, subtotalSar } = useCartDetailed();
  const clearCart = useCartStore((s) => s.clear);
  const showToast = useUiStore((s) => s.showToast);
  const currency = useSettingsStore((s) => s.currency);

  const [step, setStep] = useState(0);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [payment, setPayment] = useState<'card' | 'cod'>('card');
  const [submitting, setSubmitting] = useState(false);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrForm, setAddrForm] = useState({ recipient: '', city: '', line: '' });

  useEffect(() => {
    repositories.addresses.list().then((list) => {
      setAddresses(list);
      const def = list.find((a) => a.isDefault) ?? list[0];
      if (def) setSelectedAddress(def.id);
    });
  }, []);

  const selectedAddr = addresses.find((a) => a.id === selectedAddress);

  const saveAddress = async () => {
    if (!addrForm.recipient.trim() || !addrForm.city.trim() || !addrForm.line.trim()) {
      showToast(t('errAddressIncomplete'));
      return;
    }
    const next = await repositories.addresses.add({
      id: `addr-${Date.now()}`,
      label: { ar: 'المنزل', en: 'Home' },
      recipient: addrForm.recipient.trim(),
      city: { ar: addrForm.city.trim(), en: addrForm.city.trim() },
      line: { ar: addrForm.line.trim(), en: addrForm.line.trim() },
      isDefault: addresses.length === 0,
    });
    setAddresses(next);
    setSelectedAddress(next[next.length - 1].id);
    setShowAddressForm(false);
    setAddrForm({ recipient: '', city: '', line: '' });
  };

  const placeOrder = async () => {
    setSubmitting(true);
    const order = {
      id: demoOrderNumber(),
      createdAt: new Date().toISOString(),
      status: 'processing' as const,
      lines: lines.map(({ item, product }) => ({
        productId: product.id,
        name: product.name,
        image: product.images[0],
        colorName: product.colors.find((c) => c.id === item.colorId)?.name,
        sizeLabel: product.sizes.find((s) => s.id === item.sizeId)?.label,
        quantity: item.quantity,
        unitPrice: product.price,
      })),
      subtotal: subtotalSar,
      deliveryFee: 0,
      discount: 0,
      total: subtotalSar,
      currencyAtCheckout: currency,
      isDemo: true,
    };
    await repositories.orders.create(order as any);
    clearCart();
    setSubmitting(false);
    router.replace('/confirmation');
  };

  const stepTitles = [t('checkoutAddress'), t('checkoutDelivery'), t('checkoutPayment'), t('checkoutReview')];

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleCheckout')} showBack />
      <View className="px-[18px] py-3">
        <View className="flex-row items-center justify-between">
          {stepTitles.map((s, i) => (
            <View key={s} className="flex-1 items-center">
              <View
                className={`h-[26px] w-[26px] items-center justify-center rounded-full ${
                  i <= step ? 'bg-wine' : 'bg-chipBg'
                }`}
              >
                <AppText weight={700} className={`text-[10px] ${i <= step ? 'text-white' : 'text-muted'}`}>
                  {i < step ? '✓' : i + 1}
                </AppText>
              </View>
              <AppText className={`mt-1 text-[8px] ${i <= step ? 'text-wine' : 'text-muted'}`}>
                {s}
              </AppText>
            </View>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        {step === 0 && (
          <View>
            <AppText weight={700} className="mb-3 text-[13px] text-ink">
              {t('chooseAddress')}
            </AppText>
            {addresses.map((a) => (
              <Pressable
                key={a.id}
                onPress={() => setSelectedAddress(a.id)}
                className={`mb-2 flex-row items-start gap-3 rounded-xl border p-3 ${
                  selectedAddress === a.id ? 'border-wine bg-[#f7f1f2]' : 'border-line bg-paper'
                }`}
              >
                <View className="mt-0.5 h-5 w-5 items-center justify-center rounded-full border border-line">
                  {selectedAddress === a.id ? <View className="h-3 w-3 rounded-full bg-wine" /> : null}
                </View>
                <View className="flex-1">
                  <AppText weight={700} className="text-[11px] text-ink">
                    {a.recipient}
                  </AppText>
                  <AppText className="text-[9px] text-muted">
                    {pick(a.city, lang)} · {pick(a.line, lang)}
                  </AppText>
                </View>
                {selectedAddress === a.id ? <Icon name="check" size={16} color="#6b2637" /> : null}
              </Pressable>
            ))}
            <Pressable
              onPress={() => setShowAddressForm((v) => !v)}
              className="mt-2 flex-row items-center justify-center gap-2 rounded-xl border border-dashed border-line py-3 active:opacity-70"
            >
              <Icon name="plus" size={16} color="#6b2637" />
              <AppText weight={700} className="text-[10px] text-wine">
                {t('addNewAddress')}
              </AppText>
            </Pressable>

            {showAddressForm && (
              <View className="mt-3 rounded-xl border border-line bg-paper p-3">
                <AppTextInput
                  value={addrForm.recipient}
                  onChangeText={(v) => setAddrForm((s) => ({ ...s, recipient: v }))}
                  placeholder={t('recipient')}
                  className="mb-2 h-[42px] rounded-lg border border-line px-3 text-[11px] text-ink"
                />
                <AppTextInput
                  value={addrForm.city}
                  onChangeText={(v) => setAddrForm((s) => ({ ...s, city: v }))}
                  placeholder={t('city')}
                  className="mb-2 h-[42px] rounded-lg border border-line px-3 text-[11px] text-ink"
                />
                <AppTextInput
                  value={addrForm.line}
                  onChangeText={(v) => setAddrForm((s) => ({ ...s, line: v }))}
                  placeholder={t('addressLine')}
                  className="mb-2 h-[42px] rounded-lg border border-line px-3 text-[11px] text-ink"
                />
                <Button onPress={saveAddress}>{t('saveAddress')}</Button>
              </View>
            )}
          </View>
        )}

        {step === 1 && (
          <View>
            <AppText weight={700} className="mb-2 text-[13px] text-ink">
              {t('deliveryMethod')}
            </AppText>
            <AppText className="mb-3 text-[9px] text-muted">{t('deliveryHint')}</AppText>
            <View className="mb-2 flex-row items-center gap-3 rounded-xl border border-line bg-paper p-3">
              <View className="h-[36px] w-[36px] items-center justify-center rounded-full bg-chipBg">
                <Icon name="truck" size={18} color="#211e1c" />
              </View>
              <View className="flex-1">
                <AppText weight={700} className="text-[11px] text-ink">
                  {t('standardDelivery')}
                </AppText>
                <AppText className="text-[9px] text-muted">{t('deliveryTimingLater')}</AppText>
              </View>
              <AppText weight={700} className="text-[10px] text-wine">
                {t('calculatedLater')}
              </AppText>
            </View>
            <View className="flex-row items-center gap-3 rounded-xl border border-line bg-chipBg p-3 opacity-60">
              <View className="h-[36px] w-[36px] items-center justify-center rounded-full bg-chipBg">
                <Icon name="truck" size={18} color="#211e1c" />
              </View>
              <View className="flex-1">
                <AppText weight={700} className="text-[11px] text-ink">
                  {t('expressDelivery')}
                </AppText>
                <AppText className="text-[9px] text-muted">{t('unavailableForAddress')}</AppText>
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <AppText weight={700} className="mb-2 text-[13px] text-ink">
              {t('paymentMethod')}
            </AppText>
            <AppText className="mb-3 text-[9px] text-muted">{t('paymentHint')}</AppText>
            <Pressable
              onPress={() => setPayment('card')}
              className={`mb-2 flex-row items-center gap-3 rounded-xl border p-3 ${
                payment === 'card' ? 'border-wine bg-[#f7f1f2]' : 'border-line bg-paper'
              }`}
            >
              <Icon name="card" size={20} color="#211e1c" />
              <View className="flex-1">
                <AppText weight={700} className="text-[11px] text-ink">
                  {t('cardPayment')}
                </AppText>
                <AppText className="text-[9px] text-muted">Visa · Mastercard · mada</AppText>
              </View>
              {payment === 'card' ? <Icon name="check" size={16} color="#6b2637" /> : null}
            </Pressable>
            <Pressable
              onPress={() => setPayment('cod')}
              className={`flex-row items-center gap-3 rounded-xl border p-3 ${
                payment === 'cod' ? 'border-wine bg-[#f7f1f2]' : 'border-line bg-paper'
              }`}
            >
              <Icon name="box" size={20} color="#211e1c" />
              <View className="flex-1">
                <AppText weight={700} className="text-[11px] text-ink">
                  {t('cod')}
                </AppText>
              </View>
              {payment === 'cod' ? <Icon name="check" size={16} color="#6b2637" /> : null}
            </Pressable>

            {payment === 'card' && (
              <View className="mt-4 gap-2">
                <AppTextInput
                  placeholder={t('cardholderName')}
                  className="h-[42px] rounded-lg border border-line px-3 text-[11px] text-ink"
                />
                <AppTextInput
                  placeholder={t('cardNumber')}
                  className="h-[42px] rounded-lg border border-line px-3 text-[11px] text-ink"
                />
                <View className="flex-row gap-2">
                  <AppTextInput
                    placeholder={t('expiry')}
                    className="h-[42px] flex-1 rounded-lg border border-line px-3 text-[11px] text-ink"
                  />
                  <AppTextInput
                    placeholder={t('securityCode')}
                    className="h-[42px] flex-1 rounded-lg border border-line px-3 text-[11px] text-ink"
                  />
                </View>
              </View>
            )}
          </View>
        )}

        {step === 3 && (
          <View>
            <AppText weight={700} className="mb-3 text-[13px] text-ink">
              {t('reviewOrder')}
            </AppText>
            <View className="rounded-xl border border-line bg-paper p-3">
              <AppText className="mb-2 text-[10px] text-muted">
                {t('deliveryAddress')}
              </AppText>
              {selectedAddr ? (
                <View className="mb-3">
                  <AppText weight={600} className="text-[11px] text-ink">
                    {selectedAddr.recipient}
                  </AppText>
                  <AppText className="text-[9px] text-muted">
                    {pick(selectedAddr.city, lang)} · {pick(selectedAddr.line, lang)}
                  </AppText>
                </View>
              ) : null}
              <View className="h-px bg-line" />
              {lines.map(({ item, product }) => (
                <View key={item.id} className="mt-2 flex-row items-center justify-between">
                  <AppText className="text-[10px] text-ink">
                    {pick(product.name, lang)} × {item.quantity}
                  </AppText>
                  <AppText className="text-[10px] text-wine">
                    {price(product.price * item.quantity)}
                  </AppText>
                </View>
              ))}
              <View className="mt-3 h-px bg-line" />
              <SummaryRow label={t('subtotal')} value={price(subtotalSar)} />
              <SummaryRow label={t('delivery')} value={t('calculatedLater')} />
              <SummaryRow label={t('total')} value={price(subtotalSar)} strong />
            </View>
            <AppText className="mt-3 text-center text-[9px] text-muted">
              {t('checkoutDemoNotice')}
            </AppText>
          </View>
        )}

        <View className="mt-5 flex-row gap-2">
          {step > 0 && (
            <View className="flex-1">
              <Button variant="secondary" onPress={() => setStep((s) => s - 1)}>
                {t('back')}
              </Button>
            </View>
          )}
          <View className="flex-1">
            {step < 3 ? (
              <Button
                onPress={() => setStep((s) => s + 1)}
                disabled={step === 0 && !selectedAddress}
              >
                {t('continue')}
              </Button>
            ) : (
              <Button onPress={placeOrder} loading={submitting}>
                {t('placeOrder')}
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
