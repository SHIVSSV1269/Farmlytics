/**
 * Web mock for react-native-gesture-handler
 * On web, gesture handling is done natively by the browser.
 */
import React from 'react';
export const GestureHandlerRootView = ({ children, style }: any) => (
  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', width: '100%', ...style }}>
    {children}
  </div>
);export const GestureDetector = ({ children }: any) => children;
export const Gesture = { Tap: () => ({}), Pan: () => ({}) };
export const enableExperimentalWebImplementation = () => {};
