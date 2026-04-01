import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { ToastProvider, useToast } from "react-native-toast-notifications";

function Demo() {
  const toast = useToast();

  return (
    <View style={styles.container}>
      <Button
        title="Show Default Toast"
        onPress={() => toast.show("This is a default toast")}
      />
      <Button
        title="Show Success Toast"
        onPress={() =>
          toast.show("Success toast!", {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "slide-in",
          })
        }
      />
      <Button
        title="Show Destructive Toast"
        onPress={() =>
          toast.show("Error toast!", {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            animationType: "zoom-in",
          })
        }
      />
    </View>
  );
}

export default function App() {
  return (
    <ToastProvider
      placement="top"
      duration={3000}
      animationType="slide-in"
      successColor="#4BB543"
      dangerColor="#FF5252"
      warningColor="#FFA500"
      normalColor="#333"
    >
      <Demo />
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 20,
  },
});


