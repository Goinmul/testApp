import React from 'react';
import { StyleSheet, Text, View } 
from 'react-native';

import { createAppContainer, createSwitchNavigator } 
from 'react-navigation';

// screens
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';
import ActivityListScreen from './screens/ActivityListScreen';
import FormScreen from './screens/FormScreen';
import CameraScreen from './screens_camera/CameraScreen';

// sample screens, just for debugging
import ButtonScreen from './screens_template/buttons';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <AppNavigator></AppNavigator>

  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen,
  FormScreen:FormScreen,
  ActivityListScreen:ActivityListScreen,
  ButtonScreen:ButtonScreen,
  CameraScreen:CameraScreen
  
});

const AppNavigator = createAppContainer
(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
