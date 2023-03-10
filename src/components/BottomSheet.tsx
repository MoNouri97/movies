/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef, ReactNode, useCallback, useImperativeHandle } from "react";
import { ColorValue, StyleSheet, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = { activeHeight: number; children: ReactNode; backgroundColor: ColorValue; backDropColor: ColorValue };

export type RefType = {
  expand: () => void;
  close: () => void;
};

const BottomSheet = forwardRef<RefType, Props>(({ activeHeight, children, backgroundColor, backDropColor }, ref) => {
  const { height } = useWindowDimensions();
  const topWhenHidden = height + 20;
  const newActiveHeight = height - activeHeight;
  const topAnimation = useSharedValue(topWhenHidden);

  const expand = useCallback(() => {
    "worklet";
    topAnimation.value = withSpring(newActiveHeight, {
      damping: 100,
      stiffness: 400,
    });
  }, []);

  const close = useCallback(() => {
    "worklet";
    topAnimation.value = withSpring(topWhenHidden, {
      damping: 100,
      stiffness: 400,
    });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      expand,
      close,
    }),
    [expand, close]
  );

  const animationStyle = useAnimatedStyle(() => {
    const top = topAnimation.value;
    return {
      top,
    };
  });
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(topAnimation.value, [topWhenHidden, newActiveHeight], [0, 0.5]);
    const display = opacity === 0 ? "none" : "flex";
    return {
      opacity,
      display,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = topAnimation.value;
    },
    onActive: (event, ctx) => {
      topAnimation.value = withSpring(ctx.startY + event.translationY, {
        damping: 100,
        stiffness: 400,
      });
    },
    onEnd: (_) => {
      if (topAnimation.value > newActiveHeight + 50) {
        topAnimation.value = withSpring(topWhenHidden, {
          damping: 100,
          stiffness: 400,
        });
      } else {
        topAnimation.value = withSpring(newActiveHeight, {
          damping: 100,
          stiffness: 400,
        });
      }
    },
  });

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          close();
        }}
      >
        <Animated.View style={[styles.backDrop, backDropAnimation, { backgroundColor: backDropColor }]} />
      </TouchableWithoutFeedback>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.container, animationStyle, { backgroundColor: backgroundColor }]}>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // maxHeight: height * 2,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: "black",
    borderRadius: 20,
  },
  backDrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    flex: 1,
    left: 0,
    right: 0,
    display: "none",
  },
});
