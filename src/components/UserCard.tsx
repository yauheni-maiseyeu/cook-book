import Colors from '@/constants/Colors';
import { IUserCard } from '@/mocks/UserMock';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { UIText } from './ui/UIText';
import AntDesign from '@expo/vector-icons/AntDesign';

interface IUserCardProps {
  user: IUserCard;
  onPress: () => void;
}

export const UserCard: FC<IUserCardProps> = ({ user, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image style={styles.avatar} source={{ uri: user.avatarUrl }} />
      <View style={styles.statusWrap}>
        <UIText type="subtext" style={user.status === 'online' && styles.online}>
          {user.status}
        </UIText>
      </View>
      <View style={styles.info}>
        <View style={styles.title}>
          <UIText type="header">{user.name}</UIText>
          <AntDesign name="right" size={24} color={Colors.mineShaft} />
        </View>
        <UIText>{`Должность: ${user.role}`}</UIText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: Colors.iceberg,
    borderRadius: 10,
    shadowColor: Colors.mineShaft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    gap: 10,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusWrap: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  online: {
    color: Colors.green,
    fontWeight: 'bold',
  },
});
