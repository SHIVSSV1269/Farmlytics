
export function useToast() {
  // your hook implementation
  return {
    show: (msg: string) => console.log("Toast:", msg),
  };
}

export const toast = {
  show: (msg: string) => console.log("Singleton Toast:", msg),
};
