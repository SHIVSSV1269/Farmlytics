
import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";

type SkeletonProps = ViewProps & {};

const Skeleton: React.FC<SkeletonProps> = ({ style, ...props }) => {
  return <View style={[styles.skeleton, style]} {...props} />;
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#e0e0e0", // muted color
    borderRadius: 8,
    opacity: 0.7,
    // React Native pulse animation placeholder
    // You can add an animated pulse later if needed
  },
});

export { Skeleton };
