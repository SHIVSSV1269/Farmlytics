import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  resolve: {
    alias: {
      // 🔑 Absolute path fixes the codegenNativeComponent warning
      'react-native': path.resolve(__dirname, 'node_modules/react-native-web'),
      // Mock native-only packages that can't run in a browser
      'react-native-svg': path.resolve(__dirname, 'src/mocks/svg.tsx'),
      'react-native-vector-icons/Feather': path.resolve(__dirname, 'src/mocks/FeatherIcons.tsx'),
      'react-native-image-picker': path.resolve(__dirname, 'src/mocks/imagePicker.ts'),
      'react-native-gesture-handler': path.resolve(__dirname, 'src/mocks/gestureHandler.tsx'),
      'react-native-reanimated': path.resolve(__dirname, 'src/mocks/reanimated.ts'),
      'react-native-safe-area-context': path.resolve(__dirname, 'src/mocks/safeAreaContext.tsx'),
      'react-native-screens': path.resolve(__dirname, 'src/mocks/screens.tsx'),
      'react-native-linear-gradient': path.resolve(__dirname, 'src/mocks/linearGradient.tsx'),
      'react-native-progress': path.resolve(__dirname, 'src/mocks/progress.tsx'),
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js'],
  },
  optimizeDeps: {
    include: ['react-native-web'],
    // Exclude packages that use native-only APIs so esbuild doesn't crawl their internals
    exclude: [
      'react-native-svg',
      'react-native-linear-gradient',
      'react-native-progress',
      'react-native-reanimated',
      'react-native-screens',
      'react-native-gesture-handler',
    ],
    esbuildOptions: {
      jsx: 'automatic',
      loader: { '.js': 'jsx' },
    },
  },
});
