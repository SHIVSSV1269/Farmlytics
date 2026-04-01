// Toaster.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useToast } from "./use-toast";
import { Toast as ToastType } from "./use-toast";

const Toaster = () => {
  const { state, dismiss } = useToast();

  useEffect(() => {
    state.toasts.forEach((toast: ToastType) => {
      if (toast.open) {
        // Automatically dismiss toasts after 3 seconds
        setTimeout(() => {
          dismiss(toast.id);
        }, 3000);
      }
    });
  }, [state.toasts, dismiss]);

  return (
    <View style={styles.container}>
      {state.toasts.filter(toast => toast.open).map((toast: ToastType) => (
        <View key={toast.id} style={styles.toast}>
          {toast.title && <Text style={styles.title}>{toast.title}</Text>}
          {toast.description && <Text style={styles.description}>{toast.description}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50, // Adjust position as needed
    alignSelf: 'center',
    zIndex: 1000,
  },
  toast: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    color: '#ccc',
  },
});

export default Toaster;