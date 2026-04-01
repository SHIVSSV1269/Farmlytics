import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, ViewProps } from "react-native";

interface ProgressProps extends ViewProps {
  value: number; // 0 to 100
}

const Progress: React.FC<ProgressProps> = ({ value, style, ...props }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: value,
      duration: 300,
      useNativeDriver: false, // width animation can't use native driver
    }).start();
  }, [value]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.root, style]} {...props}>
      <Animated.View style={[styles.indicator, { width: widthInterpolated }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 16,
    width: "100%",
    backgroundColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  indicator: {
    height: "100%",
    backgroundColor: "#007bff",
    borderRadius: 8,
  },
});

export { Progress };
