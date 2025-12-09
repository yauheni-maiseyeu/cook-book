import { UIButton } from '@/components/UIButton';
import { UIInput } from '@/components/UIInput';
import { UIModal } from '@/components/UIModal';
import { UIScreen } from '@/components/UIScreen';
import { UIText } from '@/components/UIText';
import { useModal } from '@/hooks/useModal';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Index() {
  const { isOpen, onClose, onOpen } = useModal();

  return (
    <UIScreen isHeaderNeeded={true} leftIcon title="UIHeader">
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        <UIText type="header" style={styles.heading}>
          Title
        </UIText>
        <UIInput placeholder="Enter your text" label="Enter your text" />
        <UIButton label="Open modal" action={onOpen} />

        <UIButton label="Ok" action={() => {}} />
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
    paddingHorizontal: 15,
  },
  modalContent: {
    alignItems: 'center',
  },
});
