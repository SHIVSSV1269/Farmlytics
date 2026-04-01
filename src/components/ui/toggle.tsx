import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

// Simple utility to handle variant styles mimicking `cva`
function getToggleStyles(
  variant: "default" | "outline",
  size: "default" | "sm" | "lg",
  isOn: boolean,
  disabled?: boolean,
) {
  const base: any = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "transparent",
    paddingHorizontal: 12,
    paddingVertical: 10,
    opacity: disabled ? 0.5 : 1,
  };

  // Variant styles
  if (variant === "default") {
    base.backgroundColor = isOn ? "#0d6efd" : "transparent";
    base.borderColor = "transparent";
  } else if (variant === "outline") {
    base.backgroundColor = isOn ? "#e9f1ff" : "transparent";
    base.borderColor = "#ced4da";
  }

  // Size styles
  if (size === "sm") {
    base.paddingHorizontal = 10;
    base.paddingVertical = 7;
  } else if (size === "lg") {
    base.paddingHorizontal = 20;
    base.paddingVertical = 14;
  }

  return base;
}

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
  label: string;
}

const Toggle: React.FC<ToggleProps> = ({
  isOn,
  onToggle,
  variant = "default",
  size = "default",
  disabled = false,
  label,
}) => {
  const styles = getToggleStyles(variant, size, isOn, disabled);

  return (
    <Pressable style={styles} onPress={onToggle} disabled={disabled}>
      <Text style={{ color: isOn ? (variant === "default" ? "#fff" : "#0d6efd") : "#6c757d", fontWeight: "600" }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default function App() {
  const [toggleOn, setToggleOn] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16, padding: 20 }}>
      <Toggle isOn={toggleOn} onToggle={() => setToggleOn(!toggleOn)} label="Toggle Default" />
      <Toggle isOn={toggleOn} onToggle={() => setToggleOn(!toggleOn)} variant="outline" label="Toggle Outline" />
      <Toggle isOn={toggleOn} onToggle={() => setToggleOn(!toggleOn)} size="sm" label="Toggle Small" />
      <Toggle isOn={toggleOn} onToggle={() => setToggleOn(!toggleOn)} size="lg" label="Toggle Large" />
    </View>
  );
}
