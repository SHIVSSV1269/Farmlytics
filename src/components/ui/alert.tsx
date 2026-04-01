import React from "react";
import { View, Text, StyleSheet } from "react-native";

type AlertProps = {
  variant?: "default" | "destructive";
  title?: string;
  description?: string;
  style?: object;
};

const Alert: React.FC<AlertProps> = ({
  variant = "default",
  title,
  description,
  style,
}) => {
  const variantStyle = variant === "destructive" ? styles.destructive : styles.default;

  return (
    <View style={[styles.container, variantStyle, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    marginVertical: 6,
  },
  default: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
  },
  destructive: {
    backgroundColor: "#fff5f5",
    borderColor: "#ff4d4d",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#111",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
