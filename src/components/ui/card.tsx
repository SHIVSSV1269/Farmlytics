import React from "react";
import { View, Text, StyleSheet, ViewProps, TextProps } from "react-native";

export const Card: React.FC<ViewProps> = ({ style, ...props }) => {
  return <View style={[styles.card, style]} {...props} />;
};

export const CardHeader: React.FC<ViewProps> = ({ style, ...props }) => {
  return <View style={[styles.header, style]} {...props} />;
};

export const CardTitle: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.title, style]} {...props} />;
};

export const CardDescription: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.description, style]} {...props} />;
};

export const CardContent: React.FC<ViewProps> = ({ style, ...props }) => {
  return <View style={[styles.content, style]} {...props} />;
};

export const CardFooter: React.FC<ViewProps> = ({ style, ...props }) => {
  return <View style={[styles.footer, style]} {...props} />;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb", // Tailwind border-gray-200
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    padding: 16,
    flexDirection: "column",
    gap: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#6b7280", // Tailwind text-muted
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  footer: {
    padding: 16,
    paddingTop: 0,
    flexDirection: "row",
    alignItems: "center",
  },
});
