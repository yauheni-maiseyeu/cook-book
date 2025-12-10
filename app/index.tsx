import { UIButton } from '@/components/ui/UIButton';
import { UIInput } from '@/components/ui/UIInput';
import { UIModal } from '@/components/ui/UIModal';
import { UIScreen } from '@/components/ui/UIScreen';
import { UIText } from '@/components/ui/UIText';
import Colors from '@/constants/Colors';
import { useModal } from '@/hooks/useModal';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Index() {
  const { isOpen, onClose, onOpen } = useModal();
  const router = useRouter();

  const goToUsers = () => {
    router.push('/users');
  };
  return (
    <UIScreen isHeaderNeeded title="Главный экран">
      <View style={styles.content}>
        {/* <UIText type="header" style={styles.heading}>
          Title
        </UIText>
        <UIInput placeholder="Enter your text" label="Enter your text" /> */}
        <UIButton style={styles.modalButton} label="Open modal" action={onOpen} />

        <UIButton label="Перейти к списку пользователей" action={goToUsers} />
      </View>

      <UIModal isOpen={isOpen} onClose={onClose}>
        <View style={styles.modalContent}>
          <UIText>
            This is a universal modal window. To close it, click the cross or the background.
          </UIText>
        </View>
      </UIModal>
    </UIScreen>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    gap: 20,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  modalContent: {
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: Colors.codGray,
  },
});
