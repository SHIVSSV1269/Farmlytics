import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";

type ContextMenuItem = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

type ContextMenuProps = {
  items: ContextMenuItem[];
  children: React.ReactNode;
};

const ContextMenu: React.FC<ContextMenuProps> = ({ items, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleLongPress = (e: GestureResponderEvent) => {
    const { pageX, pageY } = e.nativeEvent;
    setPosition({ x: pageX, y: pageY });
    setVisible(true);
  };

  return (
    <View>
      <TouchableOpacity onLongPress={handleLongPress}>
        {children}
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.menu, { top: position.y, left: position.x }]}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.item, item.disabled && styles.disabled]}
                disabled={item.disabled}
                onPress={() => {
                  setVisible(false);
                  item.onPress?.();
                }}
              >
                <Text
                  style={[
                    styles.label,
                    item.disabled && { color: "#aaa" },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  menu: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingVertical: 4,
    minWidth: 150,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  label: {
    fontSize: 16,
    color: "#111",
  },
  disabled: {
    opacity: 0.5,
  },
});

export { ContextMenu };
