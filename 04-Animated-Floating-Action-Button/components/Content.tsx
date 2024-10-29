import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

interface Props {
  onDirectionChange: (direction: "up" | "down") => void;
}

const Content: React.FC<Props> = ({ onDirectionChange }) => {
  const previousOffset = useSharedValue(0);
  const previousDirection = useSharedValue<"up" | "down">("down");

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event;
    const currentOffset = contentOffset.y;

    const direction = currentOffset > previousOffset.value ? "down" : "up";

    if (
      currentOffset === previousOffset.value &&
      previousDirection.value === "down"
    ) {
      return;
    }

    if (layoutMeasurement.height + currentOffset >= contentSize.height) {
      return;
    }

    if (currentOffset < 0) {
      return;
    }

    previousOffset.value = currentOffset;

    try {
      if (previousDirection.value !== direction) {
        previousDirection.value = direction;
        runOnJS(onDirectionChange)(direction);
      }
    } catch (error) {
      console.error("error:", error);
    }
  }, []);

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <TouchableOpacity key={index} style={styles.item} />
      ))}
    </Animated.ScrollView>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 50,
  },
  item: {
    height: 120,
    width: "90%",
    backgroundColor: "#94c4ff",
    marginTop: 10,
    borderRadius: 16,
  },
});
