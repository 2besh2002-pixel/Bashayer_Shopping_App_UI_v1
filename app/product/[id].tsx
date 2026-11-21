import { useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Icon } from '@/src/components/ui/Icon';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useCartStore } from '@/src/stores/cartStore';
import { usePrice } from '@/src/hooks/usePrice';
import { useUiStore } from '@/src/stores/uiStore';
import { useWishlistStore } from '@/src/stores/wishlistStore';
import { getProductById, getRelatedProducts } from '@/src/data/products';
import { pick, discountPercent } from '@/src/utils/format';
import { ProductGrid } from '@/src/components/commerce/ProductCard';

export default function ProductScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = getProductById(Number(id));
  const { t, lang } = useTranslation();
  const price = usePrice();
  const addItem = useCartStore((s) => s.addItem);
  const showToast = useUiStore((s) => s.showToast);
  const isFavorite = useWishlistStore((s) => s.ids.includes(product?.id ?? 0));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.id ?? null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes.find((s) => s.available)?.id ?? null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);

  if (!product) {
    return (
      <Screen edges={['top', 'bottom']}>
        <PageHeader title={t('titleProduct')} showBack />
        <View className="flex-1 items-center justify-center">
          <AppText className="text-muted">{t('noResults')}</AppText>
        </View>
      </Screen>
    );
  }

  const color = product.colors.find((c) => c.id === selectedColor);
  const discount = discountPercent(product.price, product.compareAt);

  const handleAdd = () => {
    if (!selectedSize) {
      showToast(t('selectSizeFirst'));
      return;
    }
    addItem(product, { colorId: selectedColor, sizeId: selectedSize });
    showToast(t('itemAddedToCart'));
  };

  const related = getRelatedProducts(product.id, product.categoryId, 4);

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleProduct')} showBack />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="relative">
          <Image source={{ uri: product.images[0] }} className="h-[360px] w-full" resizeMode="cover" />
          <Pressable
            onPress={() => toggleWishlist(product.id)}
            className="absolute top-4 h-[40px] w-[40px] items-center justify-center rounded-full bg-white/90 active:opacity-70"
            style={{ end: 16 }}
          >
            <Icon name="heart" size={20} color={isFavorite ? '#6b2637' : '#211e1c'} filled={isFavorite} />
          </Pressable>
          <View
            className="absolute bottom-4 rounded-full bg-black/50 px-3 py-1"
            style={{ end: 16 }}
          >
            <AppText className="text-[9px] text-white">1 / {product.images.length}</AppText>
          </View>
        </View>

        <View className="px-[18px] pt-4">
          <AppText className="text-[9px] tracking-[2px] text-muted">NASEEJ EDIT</AppText>
          <AppText serif weight={700} className="mt-1 text-[20px] text-ink">
            {pick(product.name, lang)}
          </AppText>
          <View className="mt-1 flex-row items-center gap-2">
            <Icon name="star" size={14} color="#b48847" filled />
            <AppText className="text-[10px] text-muted">
              {product.rating} ({product.reviewCount} {t('reviews')})
            </AppText>
          </View>
          <View className="mt-2 flex-row items-center gap-3">
            <AppText weight={700} className="text-[18px] text-wine">
              {price(product.price)}
            </AppText>
            {product.compareAt ? (
              <AppText className="text-[11px] text-muted line-through">
                {price(product.compareAt)}
              </AppText>
            ) : null}
            {discount ? (
              <View className="rounded-md bg-[#f3e6e8] px-2 py-1">
                <AppText weight={700} className="text-[9px] text-wine">
                  {t('savePercent')} {discount}%
                </AppText>
              </View>
            ) : null}
          </View>
        </View>

        <View className="mt-4 px-[18px]">
          <View className="flex-row items-center justify-between">
            <AppText weight={700} className="text-[12px] text-ink">
              {t('color')} · {color ? pick(color.name, lang) : ''}
            </AppText>
          </View>
          <View className="mt-2 flex-row gap-3">
            {product.colors.map((c) => (
              <Pressable
                key={c.id}
                disabled={!c.available}
                onPress={() => setSelectedColor(c.id)}
                className={`h-[34px] w-[34px] items-center justify-center rounded-full border-2 ${
                  selectedColor === c.id ? 'border-wine' : 'border-transparent'
                } ${!c.available ? 'opacity-40' : 'active:opacity-70'}`}
              >
                <View className="h-[26px] w-[26px] rounded-full border border-line" style={{ backgroundColor: c.hex }} />
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mt-4 px-[18px]">
          <View className="flex-row items-center justify-between">
            <AppText weight={700} className="text-[12px] text-ink">
              {t('size')} · {selectedSize ?? ''}
            </AppText>
            {product.measurements?.length ? (
              <Pressable onPress={() => router.push('/size-guide')}>
                <AppText className="text-[10px] text-wine">{t('sizeGuide')}</AppText>
              </Pressable>
            ) : null}
          </View>
          <View className="mt-2 flex-row flex-wrap gap-2">
            {product.sizes.map((s) => (
              <Pressable
                key={s.id}
                disabled={!s.available}
                onPress={() => setSelectedSize(s.id)}
                className={`h-[40px] min-w-[44px] items-center justify-center rounded-xl border px-3 ${
                  selectedSize === s.id ? 'border-wine bg-wine' : 'border-line bg-white'
                } ${!s.available ? 'opacity-40' : 'active:opacity-70'}`}
              >
                <AppText
                  weight={600}
                  className={`text-[11px] ${selectedSize === s.id ? 'text-white' : 'text-ink'}`}
                >
                  {s.label}
                </AppText>
              </Pressable>
            ))}
          </View>
          <AppText className="mt-2 text-[9px] text-muted">
            {t('inStock')} · {t('selectSizeFirst')}
          </AppText>
        </View>

        <View className="mt-5 px-[18px]">
          <Button onPress={handleAdd} iconLeft="bag" iconRight="arrow">
            {t('addToCart')} · {price(product.price)}
          </Button>
        </View>

        <View className="mt-5 border-t border-line px-[18px] pt-4">
          <Pressable
            onPress={() => setOpenDetails((v) => !v)}
            className="flex-row items-center justify-between border-b border-line py-3"
          >
            <View className="flex-row items-center gap-2">
              <Icon name="eye" size={16} color="#211e1c" />
              <AppText className="text-[11px] text-ink">{t('detailsMaterial')}</AppText>
            </View>
            <Icon name={openDetails ? 'close' : 'plus'} size={16} color="#78706a" />
          </Pressable>
          {openDetails ? (
            <View className="border-b border-line py-3">
              <AppText className="text-[10px] leading-[1.7] text-muted">
                {pick(product.description, lang)}
              </AppText>
              {product.materialNote ? (
                <AppText className="mt-2 text-[10px] leading-[1.7] text-muted">
                  {pick(product.materialNote, lang)}
                </AppText>
              ) : null}
            </View>
          ) : null}
          <Pressable
            onPress={() => setOpenDelivery((v) => !v)}
            className="flex-row items-center justify-between border-b border-line py-3"
          >
            <View className="flex-row items-center gap-2">
              <Icon name="truck" size={16} color="#211e1c" />
              <AppText className="text-[11px] text-ink">{t('deliveryReturns')}</AppText>
            </View>
            <Icon name={openDelivery ? 'close' : 'plus'} size={16} color="#78706a" />
          </Pressable>
          {openDelivery ? (
            <View className="border-b border-line py-3">
              <AppText className="text-[10px] leading-[1.7] text-muted">
                {lang === 'ar'
                  ? 'خيارات التوصيل والإرجاع معروضة بصورة توضيحية. يرجى مراجعة تفاصيل الطلب قبل تأكيده.'
                  : 'Delivery and return options are shown for demonstration. Please review the order details before confirming.'}
              </AppText>
            </View>
          ) : null}
        </View>

        <View className="mt-4 px-[18px]">
          <AppText className="text-[9px] tracking-[2px] text-muted">{t('productDetailsHeading')}</AppText>
          <AppText className="mt-2 text-[11px] leading-[1.8] text-muted">
            {pick(product.description, lang)}
          </AppText>
          {product.materialNote ? (
            <AppText className="mt-2 text-[10px] text-muted">
              {pick(product.materialNote, lang)}
            </AppText>
          ) : null}
        </View>

        {related.length > 0 ? (
          <View className="mt-6">
            <View className="px-[18px] pb-3">
              <AppText weight={700} className="text-[14px] text-ink">
                {t('newArrivals')}
              </AppText>
            </View>
            <ProductGrid products={related} onPress={(p) => router.push(`/product/${p.id}`)} />
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}
