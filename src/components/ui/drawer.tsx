import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";

const { height } = Dimensions.get("window");

type DrawerProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export const Drawer: React.FC<DrawerProps> = ({
  visible,
  onClose,
  title,
  description,
  children,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        {/* Drag Handle */}
        <View style={styles.handle} />

        {/* Header */}
        {title ? <Text style={styles.title}>{title}</Text> : null}
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}

        {/* Body */}
        <View style={styles.body}>{children}</View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
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
        <Text style={styles.openText}>Open Drawer</Text>
      </TouchableOpacity>

      <Drawer
        visible={open}
        onClose={() => setOpen(false)}
        title="Drawer Title"
        description="This is the drawer description."
      >
        <Text>Drawer content goes here 🚀</Text>
      </Drawer>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openBtn: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  openText: { color: "#fff", fontSize: 16 },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: height * 0.6,
  },
  handle: {
    width: 100,
    height: 4,
    backgroundColor: "#ccc",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  description: { fontSize: 14, color: "#666", marginBottom: 12 },
  body: { marginBottom: 16 },
  footer: { flexDirection: "row", justifyContent: "flex-end" },
  closeBtn: {
    backgroundColor: "#3b82f6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  closeText: { color: "#fff", fontSize: 14 },
});
