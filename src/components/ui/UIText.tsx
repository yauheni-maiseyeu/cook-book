import Colors from '@/constants/Colors';
import { StyleProp, TextStyle, Text, StyleSheet, TextProps } from 'react-native';

type TextType = 'header' | 'subtext' | 'error' | 'default';

interface IUITextProps extends TextProps {
  children: React.ReactNode;
  type?: TextType;
  style?: StyleProp<TextStyle>;
}

export const UIText = ({ children, type = 'default', style, ...props }: IUITextProps) => {
  return (
    <Text style={[styles[type], style]} {...props}>
      {children}
    </Text>
  );
};

const styles: Record<TextType, TextStyle> = StyleSheet.create({
  default: {
    fontSize: 18,
    color: Colors.mineShaft,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.codGray,
    marginVertical: 10,
  },
  subtext: {
    fontSize: 12,
    color: Colors.boulder,
  },
  error: {
    color: Colors.cinnabar,
    fontWeight: '500',
  },
});
