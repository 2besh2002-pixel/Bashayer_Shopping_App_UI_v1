import { Image, Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { Icon } from '@/src/components/ui/Icon';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { CATEGORY_GROUPS } from '@/src/data/products';
import { pick } from '@/src/utils/format';

export default function CategoriesScreen() {
  const router = useRouter();
  const { t, lang } = useTranslation();

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="border-b border-line bg-paper px-4 py-3">
        <AppText weight={700} className="text-[16px] text-ink">
          {t('titleCategories')}
        </AppText>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="mt-2 flex-row gap-2 px-[18px]">
          {[t('all'), t('women'), t('men'), t('kids')].map((label, i) => (
            <View
              key={label}
              className={`rounded-full px-3 py-1.5 ${i === 0 ? 'bg-ink' : 'bg-chipBg'}`}
            >
              <AppText weight={600} className={`text-[10px] ${i === 0 ? 'text-white' : 'text-ink'}`}>
                {label}
              </AppText>
            </View>
          ))}
        </View>

        {CATEGORY_GROUPS.map((group, i) => (
          <View key={group.id} className="mt-5">
            <Pressable
              onPress={() => router.push('/search')}
              className="mx-[18px] overflow-hidden rounded-2xl active:opacity-90"
            >
              <View className="relative h-[150px]">
                <Image source={{ uri: group.image }} className="h-full w-full" resizeMode="cover" />
                <View className="absolute inset-0 bg-black/30" />
                <View className="absolute bottom-0 left-0 right-0 p-4">
                  <AppText serif weight={700} className="text-[20px] text-white">
                    {pick(group.name, lang)}
                  </AppText>
                  <AppText className="mt-1 text-[10px] text-white/90">
                    {t('exploreCollection')}
                  </AppText>
                </View>
              </View>
            </Pressable>
            <View className="mt-3 px-[18px]">
              {group.items.map((item) => (
                <Pressable
                  key={pick(item, lang)}
                  onPress={() => router.push('/search')}
                  className="flex-row items-center justify-between border-b border-line py-3 active:opacity-70"
                >
                  <AppText className="text-[11px] text-ink">{pick(item, lang)}</AppText>
                  <Icon name="chevron" size={16} color="#78706a" direction="forward" />
                </Pressable>
              ))}
            </View>
            {i < CATEGORY_GROUPS.length - 1 ? <View className="mx-[18px] mt-4 h-px bg-line" /> : null}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}


