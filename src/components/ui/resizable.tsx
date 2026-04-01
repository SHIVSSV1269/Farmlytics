import React, { useState } from "react";
import { View, PanResponder, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const ResizablePanelGroup = () => {
  const [leftWidth, setLeftWidth] = useState(width / 2);

  // PanResponder for dragging
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      const newWidth = leftWidth + gesture.dx;
      if (newWidth > 50 && newWidth < width - 50) {
        setLeftWidth(newWidth);
      }
    },
  });

  return (
    <View style={styles.container}>
      {/* Left Panel */}
      <View style={[styles.panel, { width: leftWidth }]}>
        {/* Put left content here */}
      </View>

      {/* Handle */}
      <View style={styles.handle} {...panResponder.panHandlers} />

      {/* Right Panel */}
      <View style={[styles.panel, { flex: 1 }]}>
        {/* Put right content here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
  },
  panel: {
    backgroundColor: "#f0f0f0",
  },
  handle: {
    width: 10,
    backgroundColor: "#ccc",
    // cursor: "col-resize", // works only on web, ignore in mobile
  },
});
