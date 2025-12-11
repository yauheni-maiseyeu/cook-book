import Colors from '@/constants/Colors';
import { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IUIHeaderProps, UIHeader } from './UIHeader';
import { StatusBar } from 'expo-status-bar';

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
        <View style={styles.content}>{children}</View>
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
  content: {
    flex: 1,
  },
});
