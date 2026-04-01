import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface RadioGroupProps {
  options: { label: string; value: string }[];
  onValueChange: (value: string) => void;
  value: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onValueChange }) => {
  return (
    <View style={styles.groupContainer}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            style={styles.radioButtonContainer}
            onPress={() => onValueChange(option.value)}
          >
            <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
              {selected && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioLabel}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default function App() {
  const [selectedValue, setSelectedValue] = useState("option1");

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  return (
    <View style={styles.container}>
      <RadioGroup options={options} value={selectedValue} onValueChange={setSelectedValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  groupContainer: {
    flexDirection: "column",
    gap: 20,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#0056b3",
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
});
