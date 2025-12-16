import { UIButton } from '@/components/ui/UIButton';
import { UIInput } from '@/components/ui/UIInput';
import { UIScreen } from '@/components/ui/UIScreen';
import { UIText } from '@/components/ui/UIText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginData, loginSchema } from '@/types/validationSchema';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useEffect } from 'react';

export default function LoginScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const fieldsWithErrors = Object.keys(errors) as (keyof LoginData)[];

    if (fieldsWithErrors.length > 0) {
      trigger(fieldsWithErrors);
    }
  }, [i18n.language, trigger, errors]);

  const onSubmit = () => {
    router.replace('/(tabs)');
  };

  const goToRegistration = () => {
    router.push('/registration');
  };
  const handleLogin = handleSubmit(onSubmit);

  return (
    <UIScreen
      style={styles.container}
      isHeaderNeeded
      title={t('loginTitle')}
      rightIcon={<LanguageSelector />}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <UIText type="header" style={styles.title}>
          {t('welcome')}
        </UIText>
        <View style={styles.inputWrap}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => {
              const { onChange, onBlur, value } = field;
              const { isTouched, error } = fieldState;

              return (
                <UIInput
                  placeholder={t('emailPlaceholder')}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  errorMessage={isTouched && error ? error.message : undefined}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value }, fieldState: { isTouched, error } }) => (
              <UIInput
                placeholder={t('passwordPlaceholder')}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                errorMessage={isTouched && error ? error.message : undefined}
              />
            )}
          />
        </View>

        <UIButton label={t('loginButton')} action={handleLogin} isDisabled={!isValid} />
        <View style={styles.separator} />
        <UIText style={styles.registerText}>{t('noAccount')}</UIText>
        <UIButton
          label={t('goToRegisterButton')}
          action={goToRegistration}
          style={styles.secondaryButton}
        />
      </ScrollView>
    </UIScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mineShaft,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: 15,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 100,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
    color: Colors.white,
  },
  inputWrap: {
    gap: 5,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.nobel,
    marginVertical: 20,
  },
  registerText: {
    textAlign: 'center',
    color: Colors.nobel,
  },
  secondaryButton: {
    backgroundColor: Colors.tango,
  },
});
