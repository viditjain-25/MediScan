import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';  
import PatientHome from './screens/PatientHome';
import DoctorHome from './screens/DoctorHome';
import ProfileScreen from './screens/ProfileScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import HistoryScreen from './screens/HistoryScreen';
import DoctorProfileScreen from './screens/DoctorProfileScreen';
import DoctorHistoryScreen from './screens/DoctorHistoryScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer for Patient
function PatientDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={PatientHome} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Book Appointment" component={AppointmentScreen} />
      <Drawer.Screen name="History" component={HistoryScreen} />
    </Drawer.Navigator>
  );
}

// Drawer for Doctor
function DoctorDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={DoctorHome} />
      <Drawer.Screen name="Profile" component={DoctorProfileScreen} />
      <Drawer.Screen name="Appointment History" component={DoctorHistoryScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={PatientDrawer} />
        <Stack.Screen name="DoctorHome" component={DoctorDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
