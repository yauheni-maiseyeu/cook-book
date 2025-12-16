// import Colors from '@/constants/Colors';
// import { FC } from 'react';
// import {
//   StyleProp,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ViewProps,
//   ViewStyle,
// } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { useRouter } from 'expo-router';

// export interface IUIHeaderProps extends ViewProps {
//   title?: string;
//   headerStyle?: StyleProp<ViewStyle>;
//   leftIcon?: boolean;
//   rightIcon?: boolean | React.ReactNode;
// }

// export const UIHeader: FC<IUIHeaderProps> = ({ title, headerStyle, leftIcon, rightIcon }) => {
//   const router = useRouter();
//   const goBack = () => router.back();
//   return (
//     <View style={[styles.container, headerStyle]}>
//       <View style={styles.content}>
//         <View>
//           {leftIcon && (
//             <TouchableOpacity onPress={goBack}>
//               <AntDesign name="left" size={24} color={Colors.white} />
//             </TouchableOpacity>
//           )}
//         </View>
//         <View>{title && <Text style={styles.title}>{title}</Text>}</View>
//         <View>
//           {rightIcon && (
//             <TouchableOpacity onPress={() => null}>
//               <AntDesign name="right" size={24} color={Colors.white} />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.codGray,
//     width: '100%',
//   },
//   content: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 70,
//   },
//   title: {
//     textAlign: 'center',
//     fontSize: 24,
//     color: Colors.white,
//   },
// });

import Colors from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { FC, ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

export interface IUIHeaderProps extends ViewProps {
  title?: string;
  headerStyle?: StyleProp<ViewStyle>;
  leftIcon?: boolean;
  // Обновляем тип: может быть boolean (для дефолтной иконки) или Компонентом
  rightIcon?: boolean | ReactNode;
}

export const UIHeader: FC<IUIHeaderProps> = ({ title, headerStyle, leftIcon, rightIcon }) => {
  const router = useRouter();
  const goBack = () => router.back();

  return (
    <View style={[styles.container, headerStyle]}>
      <View style={styles.content}>
        {/* ЛЕВАЯ ЧАСТЬ */}
        <View style={styles.sideContainer}>
          {leftIcon && (
            <TouchableOpacity onPress={goBack} hitSlop={10}>
              <AntDesign name="left" size={24} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>

        {/* ЦЕНТР (Заголовок) */}
        <View style={styles.titleContainer}>
          {title && (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        {/* ПРАВАЯ ЧАСТЬ */}
        <View style={[styles.sideContainer, styles.rightSide]}>
          {/* ЛОГИКА: */}
          {rightIcon === true ? (
            // Если передали true - рисуем дефолтную иконку (как было раньше)
            <TouchableOpacity onPress={() => null}>
              <AntDesign name="right" size={24} color={Colors.white} />
            </TouchableOpacity>
          ) : (
            // Если передали компонент (LanguageSelector) - рисуем его
            rightIcon
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.codGray,
    width: '100%',
    zIndex: 10, // Чтобы хедер был выше контента при скролле
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 70, // Фиксированная высота контента хедера
    // position: 'absolute' здесь убрал, так как это часто ломает layout родителя (UIScreen),
    // но если у вас headerStyle предполагает наложение, можно вернуть.
  },
  // Контейнеры для боковых элементов, чтобы заголовок был ровно по центру
  sideContainer: {
    width: 60, // Фиксированная ширина для баланса
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'flex-end', // Прижимаем содержимое вправо
  },
  titleContainer: {
    flex: 1, // Занимает всё доступное место в центре
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20, // Чуть уменьшил, чтобы длинные заголовки влезали
    fontWeight: '600',
    color: Colors.white,
  },
});
