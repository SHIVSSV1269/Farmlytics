import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";

type RNCollapsibleProps = {
  title: string;
  children: React.ReactNode;
};

const RNCollapsible: React.FC<RNCollapsibleProps> = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setCollapsed(!collapsed)}
        style={styles.trigger}
        activeOpacity={0.8}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        <View style={styles.content}>{children}</View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    overflow: "hidden",
  },
  trigger: {
    padding: 12,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    padding: 12,
    backgroundColor: "#fff",
  },
});

export { RNCollapsible };
