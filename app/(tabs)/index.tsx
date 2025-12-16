import { UIButton } from '@/components/ui/UIButton';
import { UIModal } from '@/components/ui/UIModal';
import { UIScreen } from '@/components/ui/UIScreen';
import { UIText } from '@/components/ui/UIText';
import Colors from '@/constants/Colors';
import { useModal } from '@/hooks/useModal';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const { isOpen, onClose, onOpen } = useModal();
  const router = useRouter();

  const handleSignOut = () => {
    router.replace('/login');
  };

  const goToUsers = () => {
    router.push('/(tabs)/users');
  };
  return (
    <UIScreen style={styles.container} isHeaderNeeded title="Главный экран">
      <View style={{ flex: 1 }}>
        <View style={styles.content}>
          <UIButton style={styles.modalButton} label="Open modal" action={onOpen} />
          <UIButton label="Перейти к списку пользователей" action={goToUsers} />
          <UIButton label="Выйти" action={handleSignOut} style={styles.logoutButton} />
        </View>

        <UIModal isOpen={isOpen} onClose={onClose}>
          <View style={styles.modalContent}>
            <UIText>
              This is a universal modal window. To close it, click the cross or the background.
            </UIText>
          </View>
        </UIModal>
      </View>
    </UIScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mineShaft,
  },
  heading: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: Colors.codGray,
  },
  logoutButton: {
    backgroundColor: Colors.cinnabar,
    marginTop: 20,
  },
});
