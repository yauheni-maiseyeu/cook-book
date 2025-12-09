import Colors from '@/constants/Colors';
import { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
  TextInputProps,
} from 'react-native';

interface IUIInputProps extends TextInputProps {
  placeholder: string;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const UIInput = ({ placeholder, label, style, containerStyle, ...props }: IUIInputProps) => {
  const [text, setText] = useState('');

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.field, style]}
        placeholder={placeholder}
        value={text}
        onChangeText={(newText) => setText(newText)}
        placeholderTextColor={Colors.boulder}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  label: {
    fontSize: 12,
    color: Colors.codGray,
  },
  field: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.mineShaft,
    backgroundColor: Colors.white,
  },
});
