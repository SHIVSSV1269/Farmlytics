// ToastProvider.tsx
import React, { ReactNode } from "react";
import { ToastContext, createToastStore } from "./use-toast";

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const toastStore = createToastStore();

  return (
    <ToastContext.Provider value={toastStore}>
      {children}
    </ToastContext.Provider>
  );
}