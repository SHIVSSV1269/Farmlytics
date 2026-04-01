import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

type DialogProps = {
  visible: boolean;
  onClose: (e?: GestureResponderEvent) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export const Dialog: React.FC<DialogProps> = ({
  visible,
  onClose,
  title,
  description,
  children,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Content */}
        <View style={styles.content}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Header */}
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {description ? (
            <Text style={styles.description}>{description}</Text>
          ) : null}

          {/* Body */}
          <View style={styles.body}>{children}</View>

          {/* Footer (optional) */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.actionBtn} onPress={onClose}>
              <Text style={styles.actionText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Example usage
export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.app}>
      <TouchableOpacity
        style={styles.openBtn}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.openText}>Open Dialog</Text>
      </TouchableOpacity>

      <Dialog
        visible={open}
        onClose={() => setOpen(false)}
        title="Dialog Title"
        description="This is the dialog description."
      >
        <Text>Custom content goes here 🚀</Text>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  openBtn: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  openText: { color: "#fff", fontSize: 16 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeText: { fontSize: 18, color: "#555" },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  description: { fontSize: 14, color: "#666", marginBottom: 12 },
  body: { marginBottom: 16 },
  footer: { flexDirection: "row", justifyContent: "flex-end" },
  actionBtn: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  actionText: { color: "#fff", fontSize: 14 },
});
