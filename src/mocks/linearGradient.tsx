/**
 * Web mock for react-native-linear-gradient
 * Uses a CSS gradient div instead of native gradient module.
 */
import React from 'react';

interface Props {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: any;
  children?: React.ReactNode;
  [key: string]: any;
}

const LinearGradient: React.FC<Props> = ({ colors, start, end, style, children, ...rest }) => {
  const angle = (() => {
    if (!start || !end) return '180deg';
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    return `${deg}deg`;
  })();

  const gradient = `linear-gradient(${angle}, ${colors.join(', ')})`;

  return (
    <div
      style={{
        background: gradient,
        display: 'flex',
        flexDirection: 'column',
        ...(typeof style === 'object' ? style : {}),
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default LinearGradient;
