import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";

const Tooltip: React.FC<{
  children: React.ReactNode;
  tooltipText: string;
  sideOffset?: number;
}> = ({ children, tooltipText, sideOffset = 8 }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number; width: number; height: number }>({ x: 0, y: 0, width: 0, height: 0 });
  const ref = useRef<View>(null);

  const screenWidth = Dimensions.get("window").width;

  const showTooltip = () => {
    if (ref.current) {
      ref.current.measure((_fx, _fy, width, height, px, py) => {
        setCoords({ x: px, y: py, width, height });
        setVisible(true);
      });
    }
  };

  const hideTooltip = () => setVisible(false);

  // Positioning tooltip above or below the trigger depending on space
  const tooltipTop = coords.y - sideOffset - 40 < 0 ? coords.y + coords.height + sideOffset : coords.y - 40 - sideOffset;
  const tooltipLeft = Math.min(coords.x, screenWidth - 150 - 10);

  return (
    <>
      <Pressable ref={ref} onPressIn={showTooltip} onPressOut={hideTooltip}>
        {children}
      </Pressable>
      {visible && (
        <Modal transparent animationType="fade" visible={visible}>
          <Pressable style={styles.modalOverlay} onPress={hideTooltip}>
            <View style={[styles.tooltip, { top: tooltipTop, left: tooltipLeft }]}>
              <Text style={styles.tooltipText}>{tooltipText}</Text>
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <Tooltip tooltipText="This is a tooltip on the button">
        <View style={styles.button}>
          <Text style={{ color: "#fff" }}>Press Me</Text>
        </View>
      </Tooltip>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
  },
  tooltip: {
    position: "absolute",
    width: 150,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 6,
    opacity: 0.9,
    zIndex: 1000,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 14,
  },
});
