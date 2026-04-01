import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, ViewStyle, TextStyle } from "react-native";

type CheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked = false, onChange, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        checked && styles.checked,
        disabled && styles.disabled,
      ]}
      onPress={() => !disabled && onChange?.(!checked)}
      activeOpacity={0.8}
    >
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );
};

// Define a type-safe style object
interface Styles {
  checkbox: ViewStyle;
  checked: ViewStyle;
  disabled: ViewStyle;
  checkmark: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#3b82f6",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checked: {
    backgroundColor: "#3b82f6",
  },
  disabled: {
    opacity: 0.5,
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { Checkbox };
