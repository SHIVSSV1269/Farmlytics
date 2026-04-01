import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import { X } from "lucide-react-native";

const { height, width } = Dimensions.get("window");

type SheetProps = {
  visible: boolean;
  onClose: () => void;
  side?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
};

export default function Sheet({ visible, onClose, side = "bottom", children }: SheetProps) {
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.timing(animation, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    } else {
      Animated.timing(animation, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }
  }, [visible]);

  const translateStyle = (() => {
    switch (side) {
      case "bottom":
        return { transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [height, 0] }) }] };
      case "top":
        return { transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [-height, 0] }) }] };
      case "left":
        return { transform: [{ translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [-width, 0] }) }] };
      case "right":
        return { transform: [{ translateX: animation.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) }] };
      default:
        return {};
    }
  })();

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
        <Animated.View style={[styles.sheet, translateStyle]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#000" />
          </TouchableOpacity>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
});
