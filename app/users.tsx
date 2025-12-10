import { UIScreen } from '@/components/ui/UIScreen';
import { UserCard } from '@/components/UserCard';
import { IUserCard, USERS } from '@/mocks/UserMock';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

export default function UsersScreen() {
  const router = useRouter();

  const goToUserDetails = (id: string) => {
    router.push(`/users/${id}`);
  };

  const renderItem = ({ item }: { item: IUserCard }) => (
    <UserCard user={item} onPress={() => goToUserDetails(item.id)} />
  );

  return (
    <UIScreen isHeaderNeeded leftIcon title="Список пользователей">
      <View style={styles.container}>
        <FlatList
          data={USERS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </UIScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listContent: {
    gap: 15,
    paddingVertical: 15,
  },
});
