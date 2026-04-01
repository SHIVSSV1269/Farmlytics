import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface ToggleGroupProps {
  value: string | null;
  onValueChange: (val: string) => void;
  children: React.ReactNode;
  style?: object;
}

interface ToggleGroupItemProps {
  value: string;
  children: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
}

const ToggleGroupItem: React.FC<ToggleGroupItemProps> = ({
  value,
  children,
  selected,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.toggleItem, selected && styles.selectedToggleItem]}
    >
      <Text style={[styles.toggleText, selected && styles.selectedToggleText]}>
        {children}
      </Text>
    </Pressable>
  );
};

const ToggleGroup: React.FC<ToggleGroupProps> = ({
  value,
  onValueChange,
  children,
  style,
}) => {
  return (
    <View style={[styles.toggleGroup, style]}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        // Cast to ReactElement with known props so TypeScript is happy accessing `props.value`
        const element = child as React.ReactElement<ToggleGroupItemProps>;

        const val = element.props.value;
        return React.cloneElement(element, {
          selected: val === value,
          onPress: () => onValueChange(val),
        });
      })}
    </View>
  );
};

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <ToggleGroup value={selected} onValueChange={setSelected}>
        <ToggleGroupItem value="option1">Option 1</ToggleGroupItem>
        <ToggleGroupItem value="option2">Option 2</ToggleGroupItem>
        <ToggleGroupItem value="option3">Option 3</ToggleGroupItem>
      </ToggleGroup>
      <Text style={{ marginTop: 20 }}>Selected: {selected}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  toggleGroup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  toggleItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#007bff",
    borderRadius: 4,
  },
  selectedToggleItem: {
    backgroundColor: "#007bff",
  },
  toggleText: {
    color: "#007bff",
  },
  selectedToggleText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
