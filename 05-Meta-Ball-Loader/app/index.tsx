import React, { useEffect, useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Group,
  Paint,
} from "@shopify/react-native-skia";
import Animated, {
  useSharedValue,
  withTiming,
  useDerivedValue,
  interpolate,
  withRepeat,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");

const PARENT_RADIUS = 30;
const POINT_RADIUS = 40;

const INITIAL_X = DEVICE_WIDTH / 2;
const INITIAL_Y = DEVICE_HEIGHT / 2;

const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);

export default function Start() {
  const progress = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);

    rotate.value = withRepeat(withTiming(1, { duration: 1000 }), -1, false);
  }, []);

  const pointAX = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [INITIAL_X, INITIAL_X - 100]);
  }, []);
  const pointAY = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [INITIAL_Y, INITIAL_Y - 100]);
  }, []);
  // const pointAX = interpolate(
  //   progress.value,
  //   [0, 1],
  //   [INITIAL_X, INITIAL_X - 100]
  // );
  // const pointAY = interpolate(
  //   progress.value,
  //   [0, 1],
  //   [INITIAL_Y, INITIAL_Y - 100]
  // );

  const pointBX = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [INITIAL_X, INITIAL_X + 100]);
  }, []);
  const pointBY = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [INITIAL_Y, INITIAL_Y - 100]);
  }, []);

  const pointCX = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [INITIAL_X, INITIAL_X - 100]);
  }, []);
  const pointCY = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [INITIAL_Y, INITIAL_Y + 100]);
  }, []);

  const pointDX = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [INITIAL_X, INITIAL_X + 100]);
  }, []);
  const pointDY = useDerivedValue(() => {
    return interpolate(progress.value, [0, 1], [INITIAL_Y, INITIAL_Y + 100]);
  }, []);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value * 180}deg` }],
    };
  }, []);

  const layer = useMemo(() => {
    return (
      <Paint>
        <Blur blur={10} />
        <ColorMatrix
          matrix={[
            // R, G, B, A, Bias
            // prettier-ignore
            1, 0, 0, 0, 0,
            // prettier-ignore
            0, 1, 0, 0, 0,
            // prettier-ignore
            0, 0, 1, 0, 0,
            // prettier-ignore
            0, 0, 0, 20, -10,
          ]}
        />
      </Paint>
    );
  }, []);

  return (
    <View style={styles.container}>
      <AnimatedCanvas style={[{ flex: 1 }, rStyle]}>
        <Group layer={layer}>
          <Circle
            cx={INITIAL_X}
            cy={INITIAL_Y}
            r={PARENT_RADIUS}
            color={"white"}
          />
          {/* Point A */}
          <Circle cx={pointAX} cy={pointAY} r={POINT_RADIUS} color={"white"} />
          {/* Point B */}
          <Circle cx={pointBX} cy={pointBY} r={POINT_RADIUS} color={"white"} />
          {/* Point C */}
          <Circle cx={pointCX} cy={pointCY} r={POINT_RADIUS} color={"white"} />
          {/* Point D */}
          <Circle cx={pointDX} cy={pointDY} r={POINT_RADIUS} color={"white"} />
        </Group>
      </AnimatedCanvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
