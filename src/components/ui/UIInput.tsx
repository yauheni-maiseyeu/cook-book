import Colors from '@/constants/Colors';
import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
  TextInputProps,
} from 'react-native';
import { AnimatedErrorText } from '../AnimatedErrorText';

interface IUIInputProps extends TextInputProps {
  placeholder: string;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  errorMessage?: string;
}

export const UIInput: FC<IUIInputProps> = ({
  placeholder,
  label,
  style,
  containerStyle,
  errorMessage,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.field, style]}
        placeholder={placeholder}
        placeholderTextColor={Colors.boulder}
        {...props}
      />
      <AnimatedErrorText errorMessage={errorMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    gap: 5,
    paddingBottom: 25,
  },
  label: {
    fontSize: 12,
    color: Colors.codGray,
  },
  field: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.mineShaft,
    backgroundColor: Colors.white,
  },
});
