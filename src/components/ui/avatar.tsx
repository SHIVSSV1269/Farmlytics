import React from "react";
import { View, Image, Text, StyleSheet, ImageStyle, ViewStyle } from "react-native";

type AvatarProps = {
  uri?: string; // Image source
  size?: number; // Avatar size
  fallback?: string; // Fallback text (e.g., initials)
  style?: ViewStyle | ImageStyle;
};

const Avatar: React.FC<AvatarProps> = ({ uri, size = 40, fallback = "?", style }) => {
  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <View style={[styles.fallback, { borderRadius: size / 2 }]}>
          <Text style={styles.fallbackText}>{fallback}</Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaa",
  },
  fallbackText: {
    color: "#fff",
    fontWeight: "600",
  },
});


