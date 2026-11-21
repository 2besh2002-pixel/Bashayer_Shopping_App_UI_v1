import { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { ConfirmDialog } from '@/src/components/ui/ConfirmDialog';
import { CurrencySheet } from '@/src/components/commerce/CurrencySheet';
import { HomeHeader } from '@/src/components/layout/HomeHeader';
import { Icon } from '@/src/components/ui/Icon';
import { ProductGrid } from '@/src/components/commerce/ProductCard';
import { Screen } from '@/src/components/ui/Screen';
import { SectionHeader } from '@/src/components/commerce/SectionHeader';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useAuthStore } from '@/src/stores/authStore';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { useUiStore } from '@/src/stores/uiStore';
import { CATEGORIES, PRODUCTS } from '@/src/data/products';
import { pick } from '@/src/utils/format';
import type { Product } from '@/src/types';

export default function HomeScreen() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const logout = useAuthStore((s) => s.logout);
  const toggleLang = useSettingsStore((s) => s.toggleLang);
  const showToast = useUiStore((s) => s.showToast);

  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const openProduct = (product: Product) => router.push(`/product/${product.id}`);

  const handleLogout = async () => {
    await logout();
    setLogoutVisible(false);
    showToast(t('loggedOutToast'));
  };

  return (
    <Screen edges={['top']}>
      <HomeHeader
        onPressLanguage={toggleLang}
        onPressCurrency={() => setCurrencyVisible(true)}
        onPressSearch={() => router.push('/search')}
        onPressNotifications={() => router.push('/notifications')}
        onPressLogin={() => router.push('/login')}
        onPressRegister={() => router.push('/register')}
        onPressLogout={() => setLogoutVisible(true)}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="mx-[18px] mt-2 overflow-hidden rounded-2xl">
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85' }}
            className="h-[360px] w-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/35" />
          <View className="absolute bottom-0 left-0 right-0 p-5">
            <AppText weight={500} className="text-[10px] tracking-[2px] text-white/90">
              {t('homeSeasonEdit')}
            </AppText>
            <AppText serif weight={700} className="mt-1 text-[28px] leading-[1.1] text-white">
              {t('homeHeroTitle').replace('\\n', '\n')}
            </AppText>
            <AppText className="mt-2 text-[11px] text-white/90">{t('homeHeroSubtitle')}</AppText>
            <Pressable
              onPress={() => router.push('/(tabs)/categories')}
              className="mt-4 h-[42px] flex-row items-center justify-center gap-2 rounded-xl bg-white px-5 active:opacity-80"
            >
              <AppText weight={700} className="text-[11px] text-ink">
                {t('shopCollection')}
              </AppText>
              <Icon name="arrow" size={16} color="#211e1c" direction="forward" />
            </Pressable>
          </View>
        </View>

        <SectionHeader title={t('shopByCategory')} actionLabel={t('viewAll')} onPressAction={() => router.push('/(tabs)/categories')} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 18, gap: 12 }}>
          {CATEGORIES.map((cat, i) => (
            <Pressable
              key={cat.id}
              onPress={() => router.push(i === 0 ? '/(tabs)/categories' : '/search')}
              className="w-[84px] items-center active:opacity-70"
            >
              <View className="h-[72px] w-[72px] overflow-hidden rounded-full bg-chipBg">
                <Image source={{ uri: cat.image }} className="h-full w-full" resizeMode="cover" />
              </View>
              <AppText weight={600} className="mt-2 text-center text-[9px] text-ink">
                {pick(cat.name, lang)}
              </AppText>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable
          onPress={() => router.push('/(tabs)/categories')}
          className="mx-[18px] mt-6 flex-row items-center justify-between rounded-2xl bg-wine px-5 py-4 active:opacity-90"
        >
          <View className="flex-1">
            <AppText weight={500} className="text-[9px] tracking-[2px] text-white/80">
              {t('moodBannerLabel')}
            </AppText>
            <AppText serif weight={700} className="mt-1 text-[17px] text-white">
              {t('moodBannerTitle')}
            </AppText>
            <AppText className="mt-1 text-[10px] text-white/80">{t('moodBannerSubtitle')}</AppText>
          </View>
          <Icon name="arrow" size={18} color="#fff" direction="forward" />
        </Pressable>

        <SectionHeader title={t('newArrivals')} actionLabel={t('viewAll')} onPressAction={() => router.push('/(tabs)/categories')} />

        <ProductGrid products={PRODUCTS.slice(0, 6)} onPress={openProduct} />

        <AppText className="mt-4 px-[18px] text-center text-[9px] text-muted">
          {t('prototypeNote')}
        </AppText>
      </ScrollView>

      <CurrencySheet visible={currencyVisible} onClose={() => setCurrencyVisible(false)} />

      <ConfirmDialog
        visible={logoutVisible}
        title={t('logoutTitle')}
        text={t('logoutText')}
        confirmLabel={t('yesLogout')}
        cancelLabel={t('staySignedIn')}
        onConfirm={handleLogout}
        onClose={() => setLogoutVisible(false)}
      />
    </Screen>
  );
}
