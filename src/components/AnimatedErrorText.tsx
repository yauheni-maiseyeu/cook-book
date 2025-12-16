import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { UIText } from './ui/UIText';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface IAnimatedErrorText {
  errorMessage?: string;
}

export const AnimatedErrorText: FC<IAnimatedErrorText> = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      style={styles.container}
    >
      <UIText type="error">{errorMessage}</UIText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '100%',
    marginTop: 2,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
