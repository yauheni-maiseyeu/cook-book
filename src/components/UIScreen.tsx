import Colors from '@/constants/Colors';
import { FC } from 'react';
import { StyleProp, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IUIHeaderProps, UIHeader } from './UIHeader';

interface IUIScreenProps extends ViewProps, IUIHeaderProps {
  isHeaderNeeded?: boolean;
  screenStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export const UIScreen: FC<IUIScreenProps> = ({
  children,
  isHeaderNeeded,
  screenStyle,
  title,
  headerStyle,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <SafeAreaView style={[styles.container, screenStyle]} {...props}>
      {isHeaderNeeded && (
        <UIHeader
          title={title}
          headerStyle={headerStyle}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      )}
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nobel,
  },
});
