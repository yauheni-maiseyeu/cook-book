import { UIButton } from '@/components/ui/UIButton';
import { UIInput } from '@/components/ui/UIInput';
import { UIScreen } from '@/components/ui/UIScreen';
import { UIText } from '@/components/ui/UIText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegistrationData, registrationSchema } from '@/types/validationSchema';

export default function RegistrationScreen() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegistrationData>({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: RegistrationData) => {
    console.log('Данные отправлены', data);
    router.replace('/(tabs)');
  };
  const router = useRouter();

  const goTologin = () => {
    router.push('/login');
  };

  const handleRegister = handleSubmit(onSubmit);

  return (
    <UIScreen style={styles.container} leftIcon isHeaderNeeded title="Регистрация">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <UIText type="header" style={styles.title}>
          Создание аккаунта
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
                textContentType="oneTimeCode"
                autoCorrect={false}
                errorMessage={isTouched && error ? error.message : undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value }, fieldState: { isTouched, error } }) => (
              <UIInput
                placeholder="Повторите пароль"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry
                textContentType="oneTimeCode"
                autoCorrect={false}
                errorMessage={isTouched && error ? error.message : undefined}
              />
            )}
          />
        </View>
        <UIButton label="Зарегистрироваться" action={handleRegister} isDisabled={!isValid} />
        <View style={styles.separator} />
        <UIText style={styles.registerText}>Уже есть аккаунт?</UIText>
        <UIButton label="Войти" action={goTologin} style={styles.secondaryButton} />
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
    paddingVertical: 10,
    paddingBottom: 100,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.white,
  },
  inputWrap: {
    gap: 5,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.nobel,
    marginVertical: 10,
  },
  registerText: {
    textAlign: 'center',
    color: Colors.nobel,
  },
  secondaryButton: {
    backgroundColor: Colors.tango,
  },
});
