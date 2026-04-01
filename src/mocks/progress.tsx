/**
 * Web mock for react-native-progress
 * Renders a simple HTML progress-like element.
 */
import React from 'react';

interface ProgressProps {
  progress?: number;
  color?: string;
  size?: number;
  style?: any;
}

export const Bar: React.FC<ProgressProps & { width?: number }> = ({
  progress = 0,
  color = '#2E7D32',
  width = 200,
  style,
}) => (
  <div style={{ width, height: 8, background: '#E0E0E0', borderRadius: 4, overflow: 'hidden', ...style }}>
    <div style={{ width: `${(progress || 0) * 100}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.3s ease' }} />
  </div>
);

export const Circle: React.FC<ProgressProps> = ({ progress = 0, color = '#2E7D32', size = 40, style }) => (
  <div style={{ width: size, height: size, borderRadius: '50%', border: `3px solid #E0E0E0`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', ...style }}>
    <span style={{ fontSize: size * 0.28, color, fontWeight: 'bold' }}>{Math.round((progress || 0) * 100)}%</span>
  </div>
);

export const Pie = Circle;
export const CircleSnail = Circle;

export default { Bar, Circle, Pie, CircleSnail };
