import { UIScreen } from '@/components/ui/UIScreen';
import { UIText } from '@/components/ui/UIText';
import Colors from '@/constants/Colors';
import { USERS } from '@/mocks/UserMock';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Image } from 'react-native';

export default function UserDetailsScreen() {
  const { t } = useTranslation();

  const { id } = useLocalSearchParams<{ id: string }>();
  const user = USERS.find((user) => user.id === id);
  if (!user) {
    return (
      <UIScreen isHeaderNeeded leftIcon title={t('noUserTitle')}>
        <View style={styles.container}>
          <UIText type="error">{t('noUserTitle')}</UIText>
        </View>
      </UIScreen>
    );
  }
  return (
    <UIScreen style={styles.container} isHeaderNeeded leftIcon title={t('userScreenTitle')}>
      <View style={styles.content}>
        <View style={styles.avatarWrap}>
          <Image style={styles.avatar} source={{ uri: user.avatarUrl }} />
        </View>
        <View style={styles.info}>
          <UIText type="header" style={styles.title}>
            {user.name}
          </UIText>
          <UIText>{`${t('userOccupation')}: ${user.role}`}</UIText>
          <UIText>{`${t('userDescription')}: ${user.description}`}</UIText>
          <UIText>{`${t('userFollowers')}: ${user.followersCount}`}</UIText>
        </View>
      </View>
    </UIScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.iceberg,
  },
  content: {
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
