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

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    router.replace('/(tabs)');
  };
  const router = useRouter();

  const goToRegistration = () => {
    router.push('/registration');
  };
  const handleLogin = handleSubmit(onSubmit);

  return (
    <UIScreen style={styles.container} isHeaderNeeded title="Вход в систему">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <UIText type="header" style={styles.title}>
          Добро пожаловать!
        </UIText>
        <View style={styles.inputWrap}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value }, fieldState: { isTouched, error } }) => (
              <UIInput
                placeholder="Введите email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                errorMessage={isTouched && error ? error.message : undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value }, fieldState: { isTouched, error } }) => (
              <UIInput
                placeholder="Введите пароль"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                errorMessage={isTouched && error ? error.message : undefined}
              />
            )}
          />
        </View>

        <UIButton label="Войти" action={handleLogin} isDisabled={!isValid} />
        <View style={styles.separator} />
        <UIText style={styles.registerText}>Нет аккаунта?</UIText>
        <UIButton label="Регистрация" action={goToRegistration} style={styles.secondaryButton} />
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
