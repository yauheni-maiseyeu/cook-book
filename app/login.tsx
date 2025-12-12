import { UIButton } from '@/components/ui/UIButton';
import { UIInput } from '@/components/ui/UIInput';
import { UIScreen } from '@/components/ui/UIScreen';
import { UIText } from '@/components/ui/UIText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  const goToRegistration = () => {
    router.push('/registration');
  };
  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <UIScreen style={styles.container} isHeaderNeeded title="Вход в систему">
      <View style={styles.content}>
        <UIText type="header" style={styles.title}>
          Добро пожаловать!
        </UIText>
        <View style={styles.inputWrap}>
          <UIInput placeholder="Введите email" />
          <UIInput placeholder="Введите пароль" />
        </View>

        <UIButton label="Войти" action={handleLogin} />
        <View style={styles.separator} />
        <UIText style={styles.registerText}>Нет аккаунта?</UIText>
        <UIButton label="Регистрация" action={goToRegistration} style={styles.secondaryButton} />
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
