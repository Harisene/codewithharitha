import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Content from "@/components/Content";
import AnimatedFAB from "@/components/AnimatedFAB";

export default function Start() {
  const [isActive, setIsActive] = useState(false);

  const handleDirectionChange = (direction: "up" | "down") => {
    if (direction === "down") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  return (
    <View style={styles.container}>
      <Content onDirectionChange={handleDirectionChange} />
      <AnimatedFAB active={isActive} label="Create post" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
