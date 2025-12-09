import { UIButton } from '@/components/UIButton';
import { UIHeader } from '@/components/UIHeader';
import { UIInput } from '@/components/UIInput';
import { UIText } from '@/components/UIText';
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  // const {isOpen, close,open } = useModal()

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <UIHeader leftIcon title="UIHeader" />
      <View style={styles.content}>
        <UIText type="header" style={styles.heading}>
          Title
        </UIText>
        <UIInput placeholder="Enter your text" label="Enter your text" />
        <UIButton label="Ok" action={() => {}} />
      </View>

      {/* <UIModal isOpen={isOpen} close={close}> */}
      {/* </UIModal> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nobel,
  },
  heading: {
    textAlign: 'center',
  },
  content: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 15,
  },
});
