/**
 * Web mock for react-native-safe-area-context
 * On web there's no notch/status bar, so insets are zero.
 */
import React from 'react';

export const SafeAreaProvider = ({ children, style }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', width: '100%', ...style }}>
    {children}
  </div>
);

export const SafeAreaView = ({ children, style }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', width: '100%', ...style }}>
    {children}
  </div>
);

export const useSafeAreaInsets = () => ({ top: 0, bottom: 0, left: 0, right: 0 });

export const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 390, height: 844 });

export const SafeAreaInsetsContext = React.createContext({ top: 0, bottom: 0, left: 0, right: 0 });

export const SafeAreaFrameContext = React.createContext({ x: 0, y: 0, width: 390, height: 844 });

export const initialWindowMetrics = {
  insets: { top: 0, bottom: 0, left: 0, right: 0 },
  frame: { x: 0, y: 0, width: 390, height: 844 },
};
