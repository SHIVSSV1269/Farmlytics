import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
  AccessibilityRole,
} from "react-native";

interface SwitchProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  accessibilityLabel,
}) => {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26], // Thumb moves from left 2 to right 26 (adjust based on size)
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ccc", "#007bff"], // Unchecked gray, checked blue
  });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange && onValueChange(!value)}
      accessibilityRole={"switch" as AccessibilityRole}
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      style={[styles.switchBase, { opacity: disabled ? 0.5 : 1 }]}
    >
      <Animated.View style={[styles.track, { backgroundColor }]} />
      <Animated.View
        style={[
          styles.thumb,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchBase: {
    width: 52,
    height: 32,
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    width: "100%",
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    elevation: 2, // shadow for android
    shadowColor: "#000", // shadow for ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Switch;


