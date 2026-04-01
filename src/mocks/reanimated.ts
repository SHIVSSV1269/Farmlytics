/**
 * Web mock for react-native-reanimated
 * On web, animations are handled via CSS transitions in react-native-web.
 */
export const useSharedValue = (val: any) => ({ value: val });
export const useAnimatedStyle = (fn: Function) => fn();
export const withTiming = (val: any) => val;
export const withSpring = (val: any) => val;
export const withDelay = (_delay: number, val: any) => val;
export const Easing = { linear: (t: any) => t, ease: (t: any) => t };
export const runOnJS = (fn: Function) => fn;

export default {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  runOnJS,
};
