import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

type ScrollAreaProps = {
  children: React.ReactNode;
  horizontal?: boolean;
  style?: object;
};

export default function ScrollArea({ children, horizontal = false, style }: ScrollAreaProps) {
  return (
    <ScrollView
      horizontal={horizontal}
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}
      style={[styles.scrollArea, style]}
      contentContainerStyle={styles.content}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollArea: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  content: {
    padding: 10,
  },
});
