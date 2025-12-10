import Colors from '@/constants/Colors';
import { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
  const contentStyle = {
    flex: 1,
    paddingBottom: insets.bottom,
  };

  return (
    // <SafeAreaView style={[styles.container, screenStyle]} {...props}>

    <View style={[styles.container, screenStyle]} {...props}>
      {isHeaderNeeded && (
        <UIHeader
          title={title}
          headerStyle={[headerStyle, { paddingTop: insets.top, height: 70 + insets.top }]}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      )}

      <View style={contentStyle}>{children}</View>
    </View>

    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.nobel,
  },
});
