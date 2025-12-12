import { UIButton } from '@/components/ui/UIButton';
import { UIInput } from '@/components/ui/UIInput';
import { UIScreen } from '@/components/ui/UIScreen';
import { UIText } from '@/components/ui/UIText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function RegistrationScreen() {
  const router = useRouter();

  const handleRegister = () => {
    router.replace('/(tabs)');
  };
  const goTologin = () => {
    router.push('/login');
  };

  return (
    <UIScreen style={styles.container} leftIcon isHeaderNeeded title="Регистрация">
      <View style={styles.content}>
        <UIText type="header" style={styles.title}>
          Создание аккаунта
        </UIText>
        <View style={styles.inputWrap}>
          <UIInput placeholder="Введите email" />
          <UIInput placeholder="Введите пароль" />
          <UIInput placeholder="Повторите пароль" />
        </View>
        <UIButton label="Зарегистрироваться" action={handleRegister} />
        <View style={styles.separator} />
        <UIText style={styles.registerText}>Уже есть аккаунт?</UIText>
        <UIButton label="Войти" action={goTologin} style={styles.secondaryButton} />
      </View>
    </UIScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mineShaft,
  },
  content: {
    flex: 1,
    gap: 15,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
    color: Colors.white,
  },
  inputWrap: {
    marginBottom: 20,
    gap: 15,
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
