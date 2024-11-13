import {
  PLACEHOLDER_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
} from "@/resources/constants";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface Props extends TextInputProps {
  label: string;
  placeholder: string;
  icon?: () => ReactNode;
}

const PADDING = 8;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Input = ({ icon, label, placeholder, ...rest }: Props) => {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<string>();

  useEffect(() => {
    setValue(rest.value);
  }, [rest.value]);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const rPlaceholderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(isFocused || value ? 24 : 0) }],
      opacity: withTiming(isFocused || value ? 0 : 1),
    };
  }, [isFocused, value]);

  const rLabel = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(isFocused || value ? 0 : 24) }],
      opacity: withTiming(isFocused || value ? 1 : 0),
    };
  }, [isFocused]);

  const rButton = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(isFocused ? PRIMARY_COLOR : PLACEHOLDER_COLOR, {
        duration: 800,
      }),
    };
  }, [isFocused]);

  const handleChangeText = (text: string) => {
    setValue(text);
    rest.onChangeText && rest.onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, rLabel]}>{label}</Animated.Text>
      <AnimatedPressable
        style={[styles.inputContainer, rButton]}
        onPress={handlePress}
      >
        {icon && icon()}
        <View style={styles.inputRightContainer}>
          <TextInput
            {...rest}
            ref={inputRef}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChangeText={handleChangeText}
          />
          <Animated.View style={[styles.placeholder, rPlaceholderStyle]}>
            <Text style={styles.placeholderText}>{placeholder}</Text>
          </Animated.View>
        </View>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
  },
  label: {
    fontWeight: "600",
    color: TEXT_COLOR,
    marginBottom: 2,
  },
  input: {
    color: TEXT_COLOR,
    fontWeight: "600",
  },
  inputRightContainer: {
    width: "100%",
    justifyContent: "center",
    paddingLeft: PADDING,
  },
  placeholder: {
    width: "100%",
    position: "absolute",
    left: PADDING,
  },
  placeholderText: {
    color: PLACEHOLDER_COLOR,
    fontWeight: "600",
  },
});

export default Input;
