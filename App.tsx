import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { RootTabParamList } from './src/types';

import HomeScreen     from './src/screens/HomeScreen';
import ChatScreen     from './src/screens/ChatScreen';
import CalendarScreen from './src/screens/CalendarScreen';
import TasksScreen    from './src/screens/TasksScreen';
import MoreScreen     from './src/screens/MoreScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const TAB_ICONS: Record<string, string> = {
  Home: '⌂', Calendar: '▦', Tasks: '✓', More: '···',
};

function AppNavigator() {
  const { colors, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 0.5,
            paddingBottom: 10,
            paddingTop: 6,
            height: 60,
          },
          tabBarActiveTintColor:   colors.accent,
          tabBarInactiveTintColor: colors.text3,
          tabBarLabelStyle: { fontSize: 9, fontWeight: '500' },
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Chat') {
              return (
                <Text style={{ fontSize: size * 0.75, color, lineHeight: size + 2 }}>✦</Text>
              );
            }
            return (
              <Text style={{ fontSize: size * 0.65, color, lineHeight: size + 2 }}>
                {TAB_ICONS[route.name] ?? '●'}
              </Text>
            );
          },
        })}
      >
        <Tab.Screen name="Home"     component={HomeScreen}     options={{ tabBarLabel: 'Inicio' }} />
        <Tab.Screen name="Chat"     component={ChatScreen}     options={{ tabBarLabel: 'KIW' }} />
        <Tab.Screen name="Calendar" component={CalendarScreen} options={{ tabBarLabel: 'Agenda' }} />
        <Tab.Screen name="Tasks"    component={TasksScreen}    options={{ tabBarLabel: 'Tareas' }} />
        <Tab.Screen name="More"     component={MoreScreen}     options={{ tabBarLabel: 'Más' }} />
      </Tab.Navigator>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
