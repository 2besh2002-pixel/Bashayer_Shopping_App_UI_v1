import { Pressable, ScrollView, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { AppText } from '@/src/components/ui/AppText';
import { AppTextInput } from '@/src/components/ui/AppTextInput';
import { Button } from '@/src/components/ui/Button';
import { PageHeader } from '@/src/components/ui/PageHeader';
import { Screen } from '@/src/components/ui/Screen';
import { useTranslation } from '@/src/hooks/useTranslation';
import { useAuthStore } from '@/src/stores/authStore';
import { useUiStore } from '@/src/stores/uiStore';
import { validateLogin, type LoginValues } from '@/src/utils/validation';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const login = useAuthStore((s) => s.login);
  const showToast = useUiStore((s) => s.showToast);
  const [values, setValues] = useState<LoginValues>({ email: '', password: '' });
  const [errors, setErrors] = useState<ReturnType<typeof validateLogin>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const e = validateLogin(values);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);
    const err = await login(values.email, values.password);
    setSubmitting(false);
    if (err) {
      setErrors({ password: err });
      return;
    }
    showToast(t('loggedInToast'));
    router.replace('/(tabs)/account');
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleLogin')} showBack />
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        <View className="mb-6 items-center">
          <View className="mb-3 h-[60px] w-[60px] items-center justify-center rounded-full bg-wine">
            <AppText weight={700} className="text-[24px] text-white">
              N
            </AppText>
          </View>
          <AppText serif weight={700} className="text-[20px] text-ink">
            {t('authLoginTitle')}
          </AppText>
          <AppText className="mt-1 text-[11px] text-muted">
            {t('authLoginSubtitle')}
          </AppText>
        </View>

        <AuthField
          label={t('email')}
          value={values.email}
          onChangeText={(v) => setValues((s) => ({ ...s, email: v }))}
          placeholder={t('emailPlaceholder')}
          error={errors.email ? t(errors.email) : undefined}
          keyboardType="email-address"
        />
        <AuthField
          label={t('password')}
          value={values.password}
          onChangeText={(v) => setValues((s) => ({ ...s, password: v }))}
          placeholder={t('passwordPlaceholder')}
          error={errors.password ? t(errors.password) : undefined}
          secureTextEntry
        />

        <Button onPress={handleSubmit} loading={submitting} className="mt-2">
          {t('loginLong')}
        </Button>

        <View className="mt-4 flex-row items-center justify-center gap-1">
          <AppText className="text-[10px] text-muted">{t('newToBrand')}</AppText>
          <Pressable onPress={() => router.push('/register')}>
            <AppText weight={700} className="text-[10px] text-wine">
              {t('createOne')}
            </AppText>
          </Pressable>
        </View>

        <AppText className="mt-6 text-center text-[9px] text-muted">
          {t('authDemoHint')}
        </AppText>
      </ScrollView>
    </Screen>
  );
}

function AuthField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
}) {
  return (
    <View className="mb-3">
      <AppText weight={600} className="mb-1.5 text-[10px] text-ink">
        {label}
      </AppText>
      <AppTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9a928b"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        className={`h-[46px] rounded-xl border px-3 text-[11px] text-ink ${error ? 'border-wine' : 'border-line bg-white'}`}
      />
      {error ? (
        <AppText className="mt-1 text-[9px] text-wine">{error}</AppText>
      ) : null}
    </View>
  );
}
