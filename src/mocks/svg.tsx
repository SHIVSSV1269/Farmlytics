/**
 * Web mock for react-native-svg
 * Maps SVG primitives to real browser SVG elements.
 */
import React from 'react';

export const Svg = ({ children, width, height, viewBox, style, ...rest }: any) => (
  <svg width={width} height={height} viewBox={viewBox} style={style} {...rest}>{children}</svg>
);
export const Circle = ({ cx, cy, r, fill, stroke, strokeWidth, ...rest }: any) => (
  <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} {...rest} />
);
export const Rect = (props: any) => <rect {...props} />;
export const Path = (props: any) => <path {...props} />;
export const Line = (props: any) => <line {...props} />;
export const Polyline = (props: any) => <polyline {...props} />;
export const Polygon = (props: any) => <polygon {...props} />;
export const Ellipse = (props: any) => <ellipse {...props} />;
export const Text = (props: any) => <text {...props} />;
export const TSpan = (props: any) => <tspan {...props} />;
export const G = (props: any) => <g {...props} />;
export const Defs = (props: any) => <defs {...props} />;
export const ClipPath = (props: any) => <clipPath {...props} />;
export const LinearGradient = (props: any) => <linearGradient {...props} />;
export const RadialGradient = (props: any) => <radialGradient {...props} />;
export const Stop = (props: any) => <stop {...props} />;
export const Mask = (props: any) => <mask {...props} />;
export const Pattern = (props: any) => <pattern {...props} />;
export const Use = (props: any) => <use {...props} />;
export const Symbol = (props: any) => <symbol {...props} />;
export const Image = (props: any) => <image {...props} />;

export default Svg;
