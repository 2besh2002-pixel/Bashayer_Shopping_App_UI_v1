import { Tabs } from 'expo-router';

import { BottomNav } from '@/src/components/layout/BottomNav';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="categories" />
      <Tabs.Screen name="wishlist" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="account" />
      <Tabs.Screen name="two" />
    </Tabs>
  );
}