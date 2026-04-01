import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";

type Variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "hero"
  | "agriculture"
  | "earth"
  | "warning"
  | "success"
  | "mobile"
  | "card";

type Size = "default" | "sm" | "lg" | "xl" | "icon" | "mobile-icon";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

// ====== Button Component ======
export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  label,
  onPress,
  disabled = false,
}) => {
  const buttonStyle = [
    styles.base,
    variantStyles[variant],
    sizeStyles[size],
    disabled ? styles.disabled : null,
  ];

  const textStyle = [
    styles.text,
    variantTextStyles[variant] ?? styles.textDefault,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

// ====== Base Styles ======
const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
  },
  textDefault: {
    color: "#fff",
  },
  disabled: {
    opacity: 0.5,
  },
});

// ====== Variant Styles ======
const variantStyles: Record<Variant, ViewStyle> = {
  default: { backgroundColor: "#3b82f6" }, // primary blue
  destructive: { backgroundColor: "#ef4444" },
  outline: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "transparent",
  },
  secondary: { backgroundColor: "#6b7280" },
  ghost: { backgroundColor: "transparent" },
  link: { backgroundColor: "transparent" },

  // Agricultural theme
  hero: { backgroundColor: "#2563eb" },
  agriculture: { backgroundColor: "#16a34a" },
  earth: { backgroundColor: "#78350f" },
  warning: { backgroundColor: "#f59e0b" },
  success: { backgroundColor: "#22c55e" },

  // Mobile-optimized
  mobile: { backgroundColor: "#3b82f6", borderRadius: 12 },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
  },
};

// ====== Variant Text Colors ======
const variantTextStyles: Partial<Record<Variant, TextStyle>> = {
  default: { color: "#fff" },
  destructive: { color: "#fff" },
  outline: { color: "#000" },
  secondary: { color: "#fff" },
  ghost: { color: "#374151" },
  link: { color: "#3b82f6", textDecorationLine: "underline" },
  hero: { color: "#fff" },
  agriculture: { color: "#fff" },
  earth: { color: "#fff" },
  warning: { color: "#fff" },
  success: { color: "#fff" },
  mobile: { color: "#fff", fontSize: 16 },
  card: { color: "#374151" },
};

// ====== Size Styles ======
const sizeStyles: Record<Size, ViewStyle> = {
  default: { height: 40, paddingHorizontal: 16 },
  sm: { height: 36, paddingHorizontal: 12, borderRadius: 6 },
  lg: { height: 44, paddingHorizontal: 20 },
  xl: { height: 56, paddingHorizontal: 24, borderRadius: 12 },
  icon: { height: 40, width: 40, borderRadius: 20 },
  "mobile-icon": { height: 48, width: 48, borderRadius: 12 },
};
