import { Image, Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { EmptyState } from '@/src/components/commerce/EmptyState';
import { Icon } from '@/src/components/ui/Icon';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useCartStore } from '@/src/stores/cartStore';
import { usePrice } from '@/src/hooks/usePrice';
import { useUiStore } from '@/src/stores/uiStore';
import { useWishlistStore } from '@/src/stores/wishlistStore';
import { getProductById } from '@/src/data/products';
import { pick } from '@/src/utils/format';

export default function WishlistScreen() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const price = usePrice();
  const ids = useWishlistStore((s) => s.ids);
  const toggle = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useUiStore((s) => s.showToast);

  const items = ids.map(getProductById).filter(Boolean) as any[];

  if (items.length === 0) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="border-b border-line bg-paper px-4 py-3">
          <AppText weight={700} className="text-[16px] text-ink">
            {t('titleWishlist')}
          </AppText>
        </View>
        <EmptyState
          icon="heart"
          title={t('wishlistEmptyTitle')}
          text={t('wishlistEmptyText')}
          actionLabel={t('discoverNew')}
          onAction={() => router.push('/(tabs)')}
        />
      </Screen>
    );
  }

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="border-b border-line bg-paper px-4 py-3">
        <AppText weight={700} className="text-[16px] text-ink">
          {t('titleWishlist')}
        </AppText>
      </View>
      <ScrollView contentContainerStyle={{ padding: 18, gap: 12, paddingBottom: 24 }}>
        {items.map((p) => (
          <View key={p.id} className="flex-row gap-3 rounded-2xl border border-line bg-paper p-3">
            <Pressable onPress={() => router.push(`/product/${p.id}`)}>
              <Image source={{ uri: p.images[0] }} className="h-[90px] w-[78px] rounded-xl" resizeMode="cover" />
            </Pressable>
            <View className="flex-1">
              <AppText weight={600} className="text-[11px] text-ink">
                {pick(p.name, lang)}
              </AppText>
              <AppText className="mt-1 text-[10px] text-wine">
                {price(p.price)}
              </AppText>
              <View className="mt-2 flex-row gap-2">
                <View className="flex-1">
                  <Button
                    onPress={() => {
                      addItem(p, { colorId: p.colors[0]?.id ?? null, sizeId: p.sizes[0]?.id ?? null });
                      showToast(t('itemAddedToCart'));
                    }}
                  >
                    {t('addToList')}
                  </Button>
                </View>
                <Pressable
                  onPress={() => toggle(p.id)}
                  className="h-[50px] w-[50px] items-center justify-center rounded-xl border border-line active:opacity-70"
                >
                  <Icon name="trash" size={18} color="#211e1c" />
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
