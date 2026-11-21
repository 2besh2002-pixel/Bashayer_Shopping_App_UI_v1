import React from "react";
import { Image, Pressable, View } from "react-native";

import { AppText } from "@/src/components/ui/AppText";
import { Icon } from "@/src/components/ui/Icon";
import { usePrice } from "@/src/hooks/usePrice";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import { useUiStore } from "@/src/stores/uiStore";
import type { Product } from "@/src/types";
import { pick } from "@/src/utils/format";

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

/**
 * Product card (ported from `.product-card`): image with badge + heart,
 * name, rating and price with optional compare-at. Memoised to avoid
 * re-rendering every card when unrelated state changes.
 */
function ProductCardBase({ product, onPress }: ProductCardProps) {
  const { t, lang } = useTranslation();
  const price = usePrice();
  const isFavorite = useWishlistStore((s) => s.ids.includes(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const showToast = useUiStore((s) => s.showToast);

  const onToggle = () => {
    toggleWishlist(product.id);
    showToast(t("wishlistUpdated"));
  };

  return (
    <View className="w-full">
      <View>
        <Pressable
          accessibilityRole="button"
          onPress={() => onPress(product)}
          className="active:opacity-90"
        >
          <View className="h-[248px] overflow-hidden rounded-t-[14px] rounded-b-[4px] bg-[#eee9e2]">
            <Image
              source={{ uri: product.images[0] }}
              className="h-full w-full"
              resizeMode="cover"
            />
            {product.badge ? (
              <View
                className="absolute top-[10px] rounded-[5px] bg-paper/90 px-[7px] py-[5px]"
                style={{ start: 9 }}
              >
                <AppText weight={700} className="text-[8px] text-ink">
                  {pick(product.badge, lang)}
                </AppText>
              </View>
            ) : null}
          </View>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("addToWishlist")}
          onPress={onToggle}
          className="absolute top-[9px] h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 active:opacity-70"
          style={{ end: 9 }}
        >
          <Icon
            name="heart"
            size={18}
            color={isFavorite ? "#6b2637" : "#211e1c"}
            filled={isFavorite}
          />
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => onPress(product)}
        className="pt-2.5 active:opacity-70"
      >
        <AppText weight={600} numberOfLines={1} className="text-[11px] leading-[1.5] text-ink">
          {pick(product.name, lang)}
        </AppText>
        <View className="my-1 flex-row items-center gap-1">
          <Icon name="star" size={12} color="#b48847" filled />
          <AppText className="text-[9px] text-[#5f5751]">{product.rating}</AppText>
          <AppText className="text-[9px] text-[#9a928b]">({product.reviewCount})</AppText>
        </View>
        <View className="flex-row items-center gap-[7px]">
          <AppText weight={600} className="text-[11px] text-wine">
            {price(product.price)}
          </AppText>
          {product.compareAt ? (
            <AppText className="text-[9px] text-[#9f9892] line-through">
              {price(product.compareAt)}
            </AppText>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}

export const ProductCard = React.memo(ProductCardBase);

/** Two-column product grid matching the reference `.product-grid`. */
export function ProductGrid({
  products,
  onPress,
}: {
  products: Product[];
  onPress: (product: Product) => void;
}) {
  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += 2) rows.push(products.slice(i, i + 2));

  return (
    <View className="px-[18px]">
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          className="flex-row justify-between"
          style={{ marginBottom: rowIndex === rows.length - 1 ? 0 : 22 }}
        >
          {row.map((product) => (
            <View key={product.id} style={{ width: "48%" }}>
              <ProductCard product={product} onPress={onPress} />
            </View>
          ))}
          {row.length === 1 ? <View style={{ width: "48%" }} /> : null}
        </View>
      ))}
    </View>
  );
}

