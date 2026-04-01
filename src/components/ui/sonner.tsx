import React from "react";
import Toast, { BaseToast, ToastConfig } from "react-native-toast-message";

const toastConfig: ToastConfig = {
  custom: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "#3B82F6", backgroundColor: "#F9FAFB" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: "bold", color: "#111827" }}
      text2Style={{ fontSize: 14, color: "#6B7280" }}
      text1={text1}
      text2={text2}
    />
  ),
};

const Toaster = () => {
  return <Toast config={toastConfig} />;
};

export { Toaster };




