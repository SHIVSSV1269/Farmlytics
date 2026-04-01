import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Popover from "react-native-popover-view";

export default function PopoverExample(): React.JSX.Element {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Popover
        isVisible={visible}
        onRequestClose={() => setVisible(false)}
        from={(
          <TouchableOpacity
            style={styles.trigger}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.triggerText}>Open Popover</Text>
          </TouchableOpacity>
        )}
      >
        <View style={styles.popoverContent}>
          <Text>Hello 👋 I am a Popover!</Text>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={styles.closeBtn}>Close</Text>
          </TouchableOpacity>
        </View>
      </Popover>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  trigger: { padding: 10, backgroundColor: "#007bff", borderRadius: 8 },
  triggerText: { color: "#fff", fontWeight: "600" },
  popoverContent: { padding: 15, backgroundColor: "#fff", borderRadius: 8 },
  closeBtn: { color: "red", marginTop: 10 },
});
