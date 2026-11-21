import { Pressable, ScrollView, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { AppTextInput } from '@/src/components/ui/AppTextInput';
import { Icon } from '@/src/components/ui/Icon';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { ProductGrid } from '@/src/components/commerce/ProductCard';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { mockCatalogRepository } from '@/src/repositories/mockCatalogRepository';
import type { Product } from '@/src/types';

export default function SearchScreen() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [searched, setSearched] = useState(false);

  const doSearch = async (q: string) => {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    const res = await mockCatalogRepository.search(q, lang);
    setResults(res);
    setSearched(true);
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleSearch')} showBack />
      <View className="px-[18px] py-3">
        <View className="h-[46px] flex-row items-center gap-2 rounded-xl border border-line bg-white px-3">
          <Icon name="search" size={18} color="#78706a" />
          <AppTextInput
            value={query}
            onChangeText={doSearch}
            placeholder={t('searchInBrand')}
            placeholderTextColor="#9a928b"
            className="flex-1 text-[11px] text-ink"
            autoFocus
          />
          {query ? (
            <Pressable onPress={() => doSearch('')} hitSlop={8}>
              <Icon name="close" size={16} color="#78706a" />
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {!searched ? (
          <View className="px-[18px] pt-4">
            <AppText weight={700} className="mb-2 text-[12px] text-ink">
              {t('popularNow')}
            </AppText>
            {[t('searchTrending1'), t('searchTrending2'), t('searchTrending3')].map((item) => (
              <Pressable
                key={item}
                onPress={() => doSearch(item)}
                className="flex-row items-center justify-between border-b border-line py-3 active:opacity-70"
              >
                <AppText className="text-[11px] text-ink">{item}</AppText>
                <Icon name="chevron" size={14} color="#78706a" direction="forward" />
              </Pressable>
            ))}
          </View>
        ) : results.length === 0 ? (
          <View className="items-center justify-center px-8 py-16">
            <AppText weight={700} className="text-[16px] text-ink">
              {t('noResults')}
            </AppText>
            <AppText className="mt-2 text-center text-[11px] text-muted">
              {t('noResultsHint')}
            </AppText>
          </View>
        ) : (
          <>
            <View className="px-[18px] py-3">
              <AppText className="text-[10px] text-muted">
                {results.length} {t('items')}
              </AppText>
            </View>
            <ProductGrid products={results} onPress={(p) => router.push(`/product/${p.id}`)} />
          </>
        )}
      </ScrollView>
    </Screen>
  );
}
