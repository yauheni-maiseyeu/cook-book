import { UIScreen } from '@/components/ui/UIScreen';
import { UIText } from '@/components/ui/UIText';
import Colors from '@/constants/Colors';
import { USERS } from '@/mocks/UserMock';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Image } from 'react-native';

export default function UserDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const user = USERS.find((user) => user.id === id);
  if (!user) {
    return (
      <UIScreen isHeaderNeeded leftIcon title="Пользователь не найден">
        <View style={styles.container}>
          <UIText type="error">Пользователь не найден.</UIText>
        </View>
      </UIScreen>
    );
  }
  return (
    <UIScreen isHeaderNeeded leftIcon title="Детали пользователя">
      <View style={styles.container}>
        <View style={styles.avatarWrap}>
          <Image style={styles.avatar} source={{ uri: user.avatarUrl }} />
        </View>
        <View style={styles.info}>
          <UIText type="header" style={styles.title}>
            {user.name}
          </UIText>
          <UIText>{`Должность: ${user.role}`}</UIText>
          <UIText>{`О себе: ${user.description}`}</UIText>
          <UIText>{`Подписчики: ${user.followersCount}`}</UIText>
        </View>
      </View>
    </UIScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: Colors.iceberg,
  },
  avatarWrap: {
    alignItems: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  info: {
    flex: 1,
    gap: 10,
  },
  title: {
    textAlign: 'center',
  },
});
