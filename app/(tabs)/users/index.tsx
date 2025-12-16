import { UIScreen } from '@/components/ui/UIScreen';
import { UserCard } from '@/components/UserCard';
import Colors from '@/constants/Colors';
import { IUserCard, USERS } from '@/mocks/UserMock';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';

export default function UsersScreen() {
  const { t } = useTranslation();

  const router = useRouter();

  const goToUserDetails = (id: string) => {
    router.push(`/users/${id}`);
  };

  const renderItem = ({ item }: { item: IUserCard }) => (
    <UserCard user={item} onPress={() => goToUserDetails(item.id)} />
  );

  return (
    <UIScreen style={styles.container} isHeaderNeeded leftIcon title={t('usersScreenTitle')}>
      <View style={styles.content}>
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
    backgroundColor: Colors.mineShaft,
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listContent: {
    gap: 15,
    paddingVertical: 15,
  },
});
