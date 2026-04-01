import React, { forwardRef } from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";

type InputProps = TextInputProps & {
  className?: string; // optional if you plan to use Tailwind/RN styles
};

const Input = forwardRef<TextInput, InputProps>(({ style, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      style={[styles.input, style]}
      placeholderTextColor="#888"
      {...props}
    />
  );
});

Input.displayName = "Input";

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    fontSize: 16,
  },
});

export { Input };

