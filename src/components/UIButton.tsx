import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { UIText } from './UIText';
import Colors from '@/constants/Colors';

interface IIUButtonProps {
  label: string;
  action: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const UIButton = ({
  label,
  action,
  isLoading,
  isDisabled = isLoading,
  style,
}: IIUButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={action} disabled={isDisabled}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.white} />
      ) : (
        <UIText style={styles.text}>{label}</UIText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.green,
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
