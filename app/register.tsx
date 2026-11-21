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
import { validateRegister, type RegisterValues } from '@/src/utils/validation';

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const register = useAuthStore((s) => s.register);
  const showToast = useUiStore((s) => s.showToast);
  const [values, setValues] = useState<RegisterValues>({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState<ReturnType<typeof validateRegister>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const e = validateRegister(values);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);
    const err = await register(values.name, values.email, values.password);
    setSubmitting(false);
    if (err) {
      setErrors({ email: err });
      return;
    }
    showToast(t('loggedInToast'));
    router.replace('/(tabs)/account');
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <PageHeader title={t('titleRegister')} showBack />
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 24 }}>
        <View className="mb-6 items-center">
          <View className="mb-3 h-[60px] w-[60px] items-center justify-center rounded-full bg-wine">
            <AppText weight={700} className="text-[24px] text-white">
              N
            </AppText>
          </View>
          <AppText serif weight={700} className="text-[20px] text-ink">
            {t('authJoinTitle')}
          </AppText>
          <AppText className="mt-1 text-[11px] text-muted">
            {t('authRegisterSubtitle')}
          </AppText>
        </View>

        <AuthField
          label={t('fullName')}
          value={values.name}
          onChangeText={(v) => setValues((s) => ({ ...s, name: v }))}
          placeholder={t('fullNamePlaceholder')}
          error={errors.name ? t(errors.name) : undefined}
        />
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
        <AuthField
          label={t('confirmPassword')}
          value={values.confirm}
          onChangeText={(v) => setValues((s) => ({ ...s, confirm: v }))}
          placeholder={t('passwordPlaceholder')}
          error={errors.confirm ? t(errors.confirm) : undefined}
          secureTextEntry
        />

        <Button onPress={handleSubmit} loading={submitting} className="mt-2">
          {t('createAccountShort')}
        </Button>

        <View className="mt-4 flex-row items-center justify-center gap-1">
          <AppText className="text-[10px] text-muted">{t('alreadyHaveAccount')}</AppText>
          <Pressable onPress={() => router.push('/login')}>
            <AppText weight={700} className="text-[10px] text-wine">
              {t('loginLong')}
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
