import React, { useState } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";

export const HoverCard = ({ trigger, content }: { trigger: React.ReactNode; content: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      {/* Trigger */}
      <Pressable onPressIn={() => setVisible(true)} onPressOut={() => setVisible(false)}>
        {trigger}
      </Pressable>

      {/* Content */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.card}>{content}</View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  card: {
    width: 250,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});




