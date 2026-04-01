import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "default",
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.base, variantStyles[variant], style]}>
      <Text style={[styles.text, variantText[variant], textStyle]}>{label}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9999, // full rounded
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});

const variantStyles: Record<BadgeVariant, ViewStyle> = {
  default: {
    backgroundColor: "#007bff",
    borderColor: "transparent",
  },
  secondary: {
    backgroundColor: "#6c757d",
    borderColor: "transparent",
  },
  destructive: {
    backgroundColor: "#dc3545",
    borderColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    borderColor: "#333",
  },
};

const variantText: Record<BadgeVariant, TextStyle> = {
  default: { color: "#fff" },
  secondary: { color: "#fff" },
  destructive: { color: "#fff" },
  outline: { color: "#333" },
};
