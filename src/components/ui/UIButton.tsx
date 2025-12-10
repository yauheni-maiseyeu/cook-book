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
    shadowColor: Colors.codGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
