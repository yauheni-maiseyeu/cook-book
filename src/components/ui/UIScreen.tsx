import Colors from '@/constants/Colors';
import { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IUIHeaderProps, UIHeader } from './UIHeader';
import { StatusBar } from 'expo-status-bar';

interface IUIScreenProps extends ViewProps, IUIHeaderProps {
  isHeaderNeeded?: boolean;
  screenStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  isKeyboardAvoiding?: boolean;
  keyboardOffset?: number;
}

export const UIScreen: FC<IUIScreenProps> = ({
  children,
  isHeaderNeeded,
  screenStyle,
  title,
  headerStyle,
  leftIcon,
  rightIcon,
  isKeyboardAvoiding = true,
  keyboardOffset = 0,
  ...props
}) => {
  const ContentWrapper = isKeyboardAvoiding ? KeyboardAvoidingView : View;

  const wrapperProps = isKeyboardAvoiding
    ? {
        style: styles.keyboardView,
        behavior: Platform.OS === 'ios' ? ('padding' as const) : undefined,
        keyboardVerticalOffset: keyboardOffset,
      }
    : { style: styles.content };
  return (
    <View style={[styles.root, screenStyle]} {...props}>
      <SafeAreaView edges={['top']} style={styles.bar}>
        <StatusBar style="light" />
      </SafeAreaView>
      <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.container}>
        {isHeaderNeeded && (
          <UIHeader
            title={title}
            headerStyle={[headerStyle, { height: 70 }]}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
          />
        )}
        <ContentWrapper {...wrapperProps}>
          <View style={styles.innerContent}>{children}</View>
        </ContentWrapper>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  bar: {
    backgroundColor: Colors.codGray,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  innerContent: {
    flex: 1,
  },
});
