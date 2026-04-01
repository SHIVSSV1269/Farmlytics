import React from "react";
import { useWindowDimensions } from "react-native";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const { width } = useWindowDimensions();

  // Return true if screen width is less than breakpoint
  return width < MOBILE_BREAKPOINT;
}