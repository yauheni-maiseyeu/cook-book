import Colors from '@/constants/Colors';
import { FC } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface IUIHeaderProps extends ViewProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  leftIcon?: boolean;
  rightIcon?: boolean;
}

export const UIHeader: FC<IUIHeaderProps> = ({ title, style, leftIcon, rightIcon }) => {
  return (
    <View style={[styles.container, style]}>
      <View>{leftIcon && <AntDesign name="left" size={24} color={Colors.mineShaft} />}</View>
      {title && <Text style={styles.title}>{title}</Text>}
      <View>{rightIcon && <AntDesign name="right" size={24} color={Colors.mineShaft} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 100,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: Colors.mineShaft,
  },
});
