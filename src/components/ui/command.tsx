import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

type CommandItem = {
  id: string;
  label: string;
  shortcut?: string;
  onPress?: () => void;
  group?: string;
};

type CommandDialogProps = {
  visible: boolean;
  onClose: () => void;
  items: CommandItem[];
};

const CommandDialog: React.FC<CommandDialogProps> = ({ visible, onClose, items }) => {
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Search Input */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Search command..."
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
          </View>

          {/* Empty State */}
          {filtered.length === 0 ? (
            <Text style={styles.empty}>No results found</Text>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    item.onPress?.();
                    onClose();
                  }}
                >
                  <Text style={styles.label}>{item.label}</Text>
                  {item.shortcut && (
                    <Text style={styles.shortcut}>{item.shortcut}</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    maxHeight: "70%",
    overflow: "hidden",
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
  },
  input: {
    height: 48,
    fontSize: 16,
  },
  empty: {
    textAlign: "center",
    padding: 16,
    color: "#888",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
  },
  label: {
    fontSize: 16,
  },
  shortcut: {
    fontSize: 12,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
});

export { CommandDialog };
