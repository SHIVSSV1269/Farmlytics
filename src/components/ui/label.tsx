import React, { forwardRef } from "react";
import { Text, TextProps, StyleSheet } from "react-native";

type LabelProps = TextProps & {
  disabled?: boolean;
};

const Label = forwardRef<Text, LabelProps>(({ style, disabled, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      style={[
        styles.label,
        disabled && styles.disabled,
        style, // allow custom styles
      ]}
      {...props}
    />
  );
});

Label.displayName = "Label";

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#111", // default text color
  },
  disabled: {
    opacity: 0.7,
  },
});

export { Label };

