import { Animated, View } from "react-native"
import { FlowButton, FlowModal, FlowRow, FlowText } from "../components/overrides"
import { ActivityItem } from "../components/activity/Item";
import { useEffect, useRef, useState } from "react"
import { COLORS, SIZES } from "../variables/styles";
import { AntDesign } from '@expo/vector-icons';
import { storeIsTutorialWatched } from "../storage";

const MAX_STEPS = 3;

const empty = () => {}

const PreviewItem = ({isActive}) =>

  <ActivityItem
    controls = {false}
    title={"Preview"}
    time={0}
    isActive={isActive}
    onActivityChange={empty}
    onSwipeStart={empty}
    onSwipeEnd={empty}
    onDoubleClick={empty}
  />
export const TutorialScreen = ({visible,onSkip}) => {
  const [step, setStep] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const directionRef = useRef(150);
  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);

  const canGoNext = step < MAX_STEPS;
  const canGoBack = step > 1;

  useEffect(() => {
    if (step === 1 && isActive) {
      timeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, 900);
    }
    if (step === 2 && !isActive) {
      timeoutRef.current = setTimeout(() => {
        setIsActive(true);
      }, 900);
    }
  }, [isActive]);
  
  useEffect(() => {
    if (step === 1) {
      setIsActive(false);
      directionRef.current = 150;
      animateSwipe();
    }
    if (step === 2) {
      setIsActive(true);
      directionRef.current = -150;
      animateSwipe();
    }

    if (step === 3) {
      setIsActive(false);
      animateDoubleTap();
    }

    return () => {
      animationRef.current?.reset();
      clearTimeout(timeoutRef.current);
    }
  }, [step]);

  const animateDoubleTap = () => {
    const sequence = Animated.sequence([
      Animated.delay(2000),
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: false
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false
      }),
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: false
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false
      })
    ]);

    const loop = animationRef.current = Animated.loop(sequence);
    loop.start();
  }

  const animateSwipe = () => {
    const swipping = Animated.timing(pan, {
      toValue: directionRef.current,
      delay: 1000,
      duration: 2000,
      useNativeDriver: false
    });
    const defaultPos = Animated.timing(pan, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false
    });
    pan.addListener(({value}) => {
      if (value === directionRef.current) {
        if (step === 1) {
          setIsActive(true);
        }
        if (step === 2) {
          setIsActive(false);
        }
      }
    });
    const sequence = Animated.sequence([defaultPos, swipping])
    const loop = animationRef.current = Animated.loop(sequence);
    loop.start();
  }
  const goNext = () => {
    if (canGoNext) {
      setStep(step + 1);
    }
  }
  const goBack = () => {
    if (canGoBack) {
      setStep(step - 1);
    }
  }
  const skip = () =>{
    onSkip();
    storeIsTutorialWatched();
  }
  const animatedStyle = {
    transform: [{translateX: pan}, {scale}]
  }

 
  return (
    <FlowModal visible={visible} bgColor={COLORS.lightBlack}>
      <FlowRow style={{marginBottom: 10, justifyContent: "space-between"}}>
        <FlowText
          style={{fontWeight: "bold"}}
        >
            Step {step}/{MAX_STEPS}
        </FlowText>
        <FlowButton
          onPressIn ={skip}
          size={SIZES.fontLarge}
          ghost
          type={"danger"}
          content = {(props) =>
             <AntDesign name="closecircleo" {...props}/>
            }
        />
      </FlowRow>
      <View style={{marginBottom: 10}}>
        { step === 1 &&
          <View>
            <View style={{marginBottom: 20}}>
              <FlowText>To start tracking, swipe right.</FlowText>
            </View>
            <Animated.View style={animatedStyle}>
              <PreviewItem isActive={isActive}/>
            </Animated.View>
          </View>
        }
        { step === 2 &&
          <View>
            <View style={{marginBottom: 20}}>
              <FlowText>To stop tracking, swipe left.</FlowText>
            </View>
            <Animated.View style={animatedStyle}>
              <PreviewItem isActive={isActive} />
            </Animated.View>
          </View>
        }
        { step === 3 &&
          <View>
            <View style={{marginBottom: 20}}>
              <FlowText>To see detail, double tap.</FlowText>
            </View>
            <Animated.View style={animatedStyle}>
              <PreviewItem isActive={isActive} />
            </Animated.View>
          </View>
        }
      </View>
      <View>
        <FlowRow>
          <FlowButton
            onPressIn={goBack}
            disabled={!canGoBack}
            ghost
            type={"primary"}
            content={"Back"}
            style={{marginRight: 10}}
          />
          <FlowButton
            onPressIn={goNext}
            disabled={!canGoNext}
            ghost
            type={"primary"}
            content={"Next"}
          />
        </FlowRow>
      </View>
    </FlowModal>
  )
}