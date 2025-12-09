import Colors from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FC } from 'react';
import {
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

interface IUIModalProps extends ViewProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  contentStyle?: StyleProp<ViewStyle>;
}

export const UIModal: FC<IUIModalProps> = ({ children, isOpen, onClose, contentStyle }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isOpen} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[styles.contentContainer, contentStyle]}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <AntDesign name="close" size={24} color={Colors.mineShaft} />
              </TouchableOpacity>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    width: '90%',
    maxHeight: '70%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 40,
    shadowColor: Colors.codGray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
});
