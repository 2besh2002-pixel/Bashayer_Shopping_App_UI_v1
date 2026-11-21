import { Pressable, ScrollView, View } from 'react-native';
import { AppText } from '@/src/components/ui/AppText';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { getProductById } from '@/src/data/products';

export default function SizeGuideScreen() {
  const { t } = useTranslation();
  const unit = useSettingsStore((s) => s.unit);
  const setUnit = useSettingsStore((s) => s.setUnit);
  const product = getProductById(1);

  const val = (cm: number) => (unit === 'cm' ? String(cm) : (cm / 2.54).toFixed(1));

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleSizeGuide')} showBack />
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        <View className="mb-4">
          <AppText serif weight={700} className="text-[18px] text-ink">
            {t('sizeGuideIntro')}
          </AppText>
          <AppText className="mt-2 text-[11px] leading-[1.7] text-muted">
            {t('sizeGuideText')}
          </AppText>
        </View>

        <View className="mb-4 flex-row items-center justify-between rounded-xl border border-line bg-paper p-3">
          <AppText weight={600} className="text-[11px] text-ink">
            {t('measurementUnit')}
          </AppText>
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setUnit('cm')}
              className={`rounded-full px-3 py-1.5 ${unit === 'cm' ? 'bg-ink' : 'bg-chipBg'}`}
            >
              <AppText weight={600} className={`text-[10px] ${unit === 'cm' ? 'text-white' : 'text-ink'}`}>
                {t('cm')}
              </AppText>
            </Pressable>
            <Pressable
              onPress={() => setUnit('in')}
              className={`rounded-full px-3 py-1.5 ${unit === 'in' ? 'bg-ink' : 'bg-chipBg'}`}
            >
              <AppText weight={600} className={`text-[10px] ${unit === 'in' ? 'text-white' : 'text-ink'}`}>
                {t('inch')}
              </AppText>
            </Pressable>
          </View>
        </View>

        <AppText weight={700} className="mb-2 text-[12px] text-ink">
          {t('productMeasurements')}
        </AppText>
        <AppText className="mb-3 text-[9px] text-muted">{t('measurementsNote')}</AppText>

        {product?.measurements && product.measurements.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="overflow-hidden rounded-xl border border-line">
              <View className="flex-row bg-chipBg">
                {[t('size'), t('bust'), t('waist'), t('hips'), t('length')].map((h) => (
                  <View key={h} className="w-[70px] items-center py-2">
                    <AppText weight={700} className="text-[9px] text-ink">
                      {h}
                    </AppText>
                  </View>
                ))}
              </View>
              {product.measurements.map((row) => (
                <View key={row.size} className="flex-row border-t border-line">
                  <View className="w-[70px] items-center py-2">
                    <AppText weight={600} className="text-[9px] text-ink">
                      {row.size}
                    </AppText>
                  </View>
                  <View className="w-[70px] items-center py-2">
                    <AppText className="text-[9px] text-muted">{val(row.bust)}</AppText>
                  </View>
                  <View className="w-[70px] items-center py-2">
                    <AppText className="text-[9px] text-muted">{val(row.waist)}</AppText>
                  </View>
                  <View className="w-[70px] items-center py-2">
                    <AppText className="text-[9px] text-muted">{val(row.hips)}</AppText>
                  </View>
                  <View className="w-[70px] items-center py-2">
                    <AppText className="text-[9px] text-muted">{val(row.length)}</AppText>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <AppText className="text-[11px] text-muted">{t('noMeasurements')}</AppText>
        )}

      </ScrollView>
    </Screen>
  );
}
