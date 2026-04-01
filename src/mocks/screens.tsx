/**
 * Web mock for react-native-screens
 * Required by @react-navigation/native-stack.
 * On web, screens are just divs.
 */
import React from 'react';

export const enableScreens = () => {};
export const enableFreeze = () => {};

export const Screen = ({ children, style, active }: any) => (
  <div style={{ 
    display: active === 0 ? 'none' : 'flex', 
    flexDirection: 'column', 
    flex: 1, 
    height: '100%', 
    width: '100%', 
    position: 'absolute', 
    inset: 0, 
    overflow: 'hidden', 
    ...style 
  }}>
    {children}
  </div>
);

export const ScreenContainer = ({ children, style }: any) => (
  <div style={{ display: 'flex', flex: 1, height: '100%', width: '100%', flexDirection: 'column', position: 'relative', overflow: 'hidden', ...style }}>
    {children}
  </div>
);

export const ScreenStack = ScreenContainer;
export const ScreenStackHeaderConfig = () => null;

export default { enableScreens, Screen, ScreenContainer };
