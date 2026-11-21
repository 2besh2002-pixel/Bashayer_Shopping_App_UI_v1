import { Pressable, ScrollView, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { ConfirmDialog } from '@/src/components/ui/ConfirmDialog';
import { Icon } from '@/src/components/ui/Icon';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useAuthStore } from '@/src/stores/authStore';
import { useUiStore } from '@/src/stores/uiStore';

export default function AccountScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const showToast = useUiStore((s) => s.showToast);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = async () => {
    await logout();
    setLogoutVisible(false);
    showToast(t('loggedOutToast'));
  };

  if (!isAuthenticated) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="border-b border-line bg-paper px-4 py-3">
          <AppText weight={700} className="text-[16px] text-ink">
            {t('titleProfile')}
          </AppText>
        </View>
        <View className="flex-1 items-center justify-center px-8">
          <View className="mb-4 h-[72px] w-[72px] items-center justify-center rounded-full bg-[#f4eee9]">
            <Icon name="user" size={32} color="#6b2637" />
          </View>
          <AppText weight={700} className="text-center text-[18px] text-ink">
            {t('welcomeToBrand')}
          </AppText>
          <AppText className="mt-2 text-center text-[11px] text-muted">
            {t('guestProfileText')}
          </AppText>
          <View className="mt-6 w-full gap-2">
            <Button onPress={() => router.push('/login')}>{t('loginLong')}</Button>
            <Button variant="secondary" onPress={() => router.push('/register')}>
              {t('createAccount')}
            </Button>
          </View>
        </View>
      </Screen>
    );
  }

  const links = [
    { icon: 'box' as const, label: t('myOrders'), to: '/orders' },
    { icon: 'heart' as const, label: t('myWishlist'), to: '/(tabs)/wishlist' },
    { icon: 'pin' as const, label: t('myAddresses'), to: '/addresses' },
    { icon: 'settings' as const, label: t('settings'), to: '/settings' },
    { icon: 'help' as const, label: t('supportFaq'), to: '/support' },
  ];

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="border-b border-line bg-paper px-4 py-3">
        <AppText weight={700} className="text-[16px] text-ink">
          {t('titleProfile')}
        </AppText>
      </View>
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        <View className="mb-4 flex-row items-center gap-3 rounded-2xl border border-line bg-paper p-4">
          <View className="h-[46px] w-[46px] items-center justify-center rounded-full bg-wine">
            <AppText weight={700} className="text-[18px] text-white">
              {user?.name?.[0] ?? 'ن'}
            </AppText>
          </View>
          <View className="flex-1">
            <AppText className="text-[9px] text-muted">{t('welcomeBack')}</AppText>
            <AppText weight={700} className="text-[13px] text-ink">
              {user?.name ?? t('demoUser')}
            </AppText>
            <AppText className="text-[9px] text-muted">{user?.email}</AppText>
          </View>
        </View>

        {links.map((l) => (
          <Pressable
            key={l.label}
            onPress={() => router.push(l.to as any)}
            className="mb-2 flex-row items-center justify-between rounded-xl border border-line bg-paper px-4 py-3.5 active:opacity-70"
          >
            <View className="flex-row items-center gap-3">
              <Icon name={l.icon} size={18} color="#211e1c" />
              <AppText weight={500} className="text-[11px] text-ink">
                {l.label}
              </AppText>
            </View>
            <Icon name="chevron" size={16} color="#78706a" direction="forward" />
          </Pressable>
        ))}

        <Pressable
          onPress={() => setLogoutVisible(true)}
          className="mt-4 flex-row items-center justify-center gap-2 rounded-xl border border-line bg-paper py-3.5 active:opacity-70"
        >
          <Icon name="logout" size={18} color="#6b2637" />
          <AppText weight={700} className="text-[11px] text-wine">
            {t('logoutLong')}
          </AppText>
        </Pressable>
      </ScrollView>

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
