import React from "react";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import { View, Button } from "react-native";

function Demo() {
  const toast = useToast();

  const showToast = () => {
    toast.show("This is a toast message!");
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Show Toast" onPress={showToast} />
    </View>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}
