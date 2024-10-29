import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const PRIMARY_COLOR = "#004fb0";
const SECONDARY_COLOR = "#fff";

const TEXT_MARGIN = 4;

interface Props {
  active: boolean;
  label: string;
}

const AnimatedFAB = ({ active, label }: Props) => {
  const [textWidth, setTextWidth] = useState(0);

  const translateX = useSharedValue(0);

  useEffect(() => {
    if (textWidth && translateX.value === 0) {
      translateX.value = textWidth + TEXT_MARGIN;
    }
  }, [textWidth]);

  useEffect(() => {
    translateX.value = withTiming(active ? 0 : textWidth + TEXT_MARGIN);
  }, [active, textWidth]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  }, []);

  const rText = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        translateX.value,
        [0, textWidth + TEXT_MARGIN],
        [1, 0]
      ),
    };
  }, [textWidth]);

  const handleLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Animated.View style={rStyle}>
        <Pressable
          style={({ pressed }) => [
            styles.innerContainer,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Feather name="plus" size={32} color={SECONDARY_COLOR} />
          <Animated.Text style={[styles.text, rText]} onLayout={handleLayout}>
            {label}
          </Animated.Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 40,
    right: 30,
    overflow: "hidden",
    borderRadius: 50,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 50,
    padding: 14,
  },
  text: {
    color: SECONDARY_COLOR,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: TEXT_MARGIN,
  },
});

export default AnimatedFAB;
