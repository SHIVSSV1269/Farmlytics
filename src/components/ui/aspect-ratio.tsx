import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

type AspectRatioProps = {
  ratio?: number; // e.g. 16/9, 1, 4/3
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
};

const AspectRatio: React.FC<AspectRatioProps> = ({ ratio = 1, style, children }) => {
  return (
    <View style={[styles.container, { aspectRatio: ratio }, style]}>
      {children}
    </View>
  );
};

export default AspectRatio;

const styles = StyleSheet.create({
  container: {
    width: "100%", // takes full width of parent
    overflow: "hidden",
  },
});
