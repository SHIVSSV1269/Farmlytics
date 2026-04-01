import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import OTPTextInput from "react-native-otp-textinput";

export const InputOTP = ({ length = 6, onChange }: { length?: number; onChange?: (code: string) => void }) => {
  const otpInput = useRef<OTPTextInput>(null);

  return (
    <View style={styles.container}>
      <OTPTextInput
        ref={otpInput}
        inputCount={length}
        handleTextChange={onChange}
        tintColor="#6200EE"
        offTintColor="#ccc"
        textInputStyle={styles.otpInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderRadius: 8,
    width: 40,
    height: 50,
    fontSize: 18,
    color: "#000",
  },
});
