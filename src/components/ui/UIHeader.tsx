import Colors from '@/constants/Colors';
import { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

export interface IUIHeaderProps extends ViewProps {
  title?: string;
  headerStyle?: StyleProp<ViewStyle>;
  leftIcon?: boolean;
  rightIcon?: boolean;
}

export const UIHeader: FC<IUIHeaderProps> = ({ title, headerStyle, leftIcon, rightIcon }) => {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <View style={[styles.container, headerStyle]}>
      <View style={styles.content}>
        <View>
          {leftIcon && (
            <TouchableOpacity onPress={goBack}>
              <AntDesign name="left" size={24} color={Colors.mineShaft} />
            </TouchableOpacity>
          )}
        </View>
        <View>{title && <Text style={styles.title}>{title}</Text>}</View>
        <View>
          {rightIcon && (
            <TouchableOpacity onPress={() => null}>
              <AntDesign name="right" size={24} color={Colors.mineShaft} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.nobel,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: Colors.mineShaft,
  },
});
