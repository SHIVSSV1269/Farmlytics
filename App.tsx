// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

// Screens
import Welcome from './src/pages/Welcome';
import Login from './src/pages/Login';
import Dashboard from './src/pages/Dashboard';
import CropAdvisory from './src/pages/CropAdvisory';
import PestScanner from './src/pages/PestScanner';
import Weather from './src/pages/Weather';
import MarketPrices from './src/pages/MarketPrices';
import NotFound from './src/pages/NotFound';

// Toast
import { ToastProvider } from './src/hooks/ToastProvider';
import Toaster from './src/hooks/Toaster';

// React Navigation Stack
import ChatBot from "./src/pages/ChatBot";

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Dashboard: undefined;
  CropAdvisory: undefined;
  PestScanner: undefined;
  Weather: undefined;
  MarketPrices: undefined;
  ChatBot: undefined;
  NotFound: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="CropAdvisory" component={CropAdvisory} />
          <Stack.Screen name="PestScanner" component={PestScanner} />
          <Stack.Screen name="Weather" component={Weather} />
          <Stack.Screen name="MarketPrices" component={MarketPrices} />
          <Stack.Screen name="ChatBot" component={ChatBot} options={{ headerShown: false }} />
          <Stack.Screen name="NotFound" component={NotFound} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toaster />
    </ToastProvider>
  );
};

export default App;
