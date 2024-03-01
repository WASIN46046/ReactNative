import { Animated, Easing, StyleSheet } from "react-native"
import { FlowRow } from "../overrides"
import { COLORS } from "../../variables/styles"
import { useEffect, useRef } from "react"



const createTimingAnim = (opacity, toValue, duration) =>
  Animated.timing(opacity, {
    toValue,
    duration,
    easing: Easing.ease,
    useNativeDriver: false
  });

export const LoadingDots = ({color}) => {
  const dotColor = color || COLORS.white;
  const dotOpacities = useRef(Array(3).fill(0).map(o => new Animated.Value(o))).current;

  useEffect(() => {
  

    const dotShowAnimations = dotOpacities.map(opacity => createTimingAnim(opacity, 1, 700));
    const dotHideAnimations = dotOpacities.map(opacity => createTimingAnim(opacity, 0, 500));
    const sequence = Animated.sequence([
      Animated.stagger(200, dotShowAnimations),
      Animated.delay(300),
      Animated.parallel(dotHideAnimations)
    ]);
    const loop = Animated.loop(sequence);
    loop.start();
    return () => {
      loop.stop();
    }
  }, []);

  return (
    <FlowRow>
      { dotOpacities.map((opacity, index) =>
        <Animated.View
          key={`dot-${index}`}
          style={{...styles.dot, opacity, backgroundColor: dotColor}}
        />
      )}
    </FlowRow>
  )
}

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5
  }
})