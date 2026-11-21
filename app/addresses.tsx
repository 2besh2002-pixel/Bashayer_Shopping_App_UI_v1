import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { AppTextInput } from '@/src/components/ui/AppTextInput';
import { Button } from '@/src/components/ui/Button';
import { Icon } from '@/src/components/ui/Icon';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { repositories } from '@/src/repositories';
import type { Address } from '@/src/types';
import { pick } from '@/src/utils/format';

export default function AddressesScreen() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [form, setForm] = useState({ recipient: '', city: '', line: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    repositories.addresses.list().then(setAddresses);
  }, []);

  const save = async () => {
    if (!form.recipient.trim() || !form.city.trim() || !form.line.trim()) {
      return;
    }
    const next = await repositories.addresses.add({
      id: `addr-${Date.now()}`,
      label: { ar: 'المنزل', en: 'Home' },
      recipient: form.recipient.trim(),
      city: { ar: form.city.trim(), en: form.city.trim() },
      line: { ar: form.line.trim(), en: form.line.trim() },
      isDefault: addresses.length === 0,
    });
    setAddresses(next);
    setForm({ recipient: '', city: '', line: '' });
    setShowForm(false);
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleAddresses')} showBack />
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        {addresses.map((a) => (
          <View key={a.id} className="mb-3 rounded-2xl border border-line bg-paper p-4">
            <View className="flex-row items-center justify-between">
              <AppText weight={700} className="text-[12px] text-ink">
                {pick(a.label, lang)}
              </AppText>
              {a.isDefault ? (
                <View className="rounded-full bg-chipBg px-2 py-1">
                  <AppText weight={600} className="text-[8px] text-wine">
                    {t('setDefault')}
                  </AppText>
                </View>
              ) : null}
            </View>
            <AppText className="mt-1 text-[10px] text-ink">{a.recipient}</AppText>
            <AppText className="text-[9px] text-muted">
              {pick(a.city, lang)} · {pick(a.line, lang)}
            </AppText>
          </View>
        ))}

        <Pressable
          onPress={() => setShowForm((v) => !v)}
          className="mt-2 flex-row items-center justify-center gap-2 rounded-xl border border-dashed border-line py-3 active:opacity-70"
        >
          <Icon name="plus" size={16} color="#6b2637" />
          <AppText weight={700} className="text-[10px] text-wine">
            {t('addNewAddress')}
          </AppText>
        </Pressable>

        {showForm && (
          <View className="mt-3 rounded-xl border border-line bg-paper p-3">
            <AppTextInput
              value={form.recipient}
              onChangeText={(v) => setForm((s) => ({ ...s, recipient: v }))}
              placeholder={t('recipient')}
              className="mb-2 h-[42px] rounded-lg border border-line px-3 text-[11px] text-ink"
            />
            <AppTextInput
              value={form.city}
              onChangeText={(v) => setForm((s) => ({ ...s, city: v }))}
              placeholder={t('city')}
              className="mb-2 h-[42px] rounded-lg border border-line px-3 text-[11px] text-ink"
            />
            <AppTextInput
              value={form.line}
              onChangeText={(v) => setForm((s) => ({ ...s, line: v }))}
              placeholder={t('addressLine')}
              className="mb-2 h-[42px] rounded-lg border border-line px-3 text-[11px] text-ink"
            />
            <Button onPress={save}>{t('saveAddress')}</Button>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
