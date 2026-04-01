import React, { useState } from "react";
import { View, StyleSheet, PanResponder, Animated } from "react-native";

type SliderProps = {
  value?: number;
  onValueChange?: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  trackColor?: string;
  thumbColor?: string;
};

const Slider: React.FC<SliderProps> = ({
  value = 0,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  trackColor = "#E5E7EB",
  thumbColor = "#3B82F6",
}) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [animatedValue] = useState(new Animated.Value(value));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {},
    onPanResponderMove: (_, gestureState) => {
      const newValue = Math.min(
        Math.max(gestureState.dx / sliderWidth * (maximumValue - minimumValue) + value, minimumValue),
        maximumValue
      );
      animatedValue.setValue(newValue);
      onValueChange?.(newValue);
    },
    onPanResponderRelease: () => {},
  });

  const thumbTranslate = animatedValue.interpolate({
    inputRange: [minimumValue, maximumValue],
    outputRange: [0, sliderWidth],
    extrapolate: "clamp",
  });

  return (
    <View
      style={styles.container}
      onLayout={(event) => setSliderWidth(event.nativeEvent.layout.width)}
    >
      <View style={[styles.track, { backgroundColor: trackColor }]} />
      <Animated.View
        style={[
          styles.thumb,
          { backgroundColor: thumbColor, transform: [{ translateX: thumbTranslate }] },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: "center",
  },
  track: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  thumb: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#3B82F6",
    backgroundColor: "#fff",
    top: 8,
  },
});

export { Slider };
