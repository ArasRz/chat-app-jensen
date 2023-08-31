import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Login';
import AuthenticatedScreens from './components/navigators/AppNavigator';
import Register from './components/Register';
import Context from './components/contexts/Context';
import { RootNavigator } from './components/navigators/RootNavigator';


const Stack = createStackNavigator();

const App = () => {

  return (
    
      <Context>
        <RootNavigator/>
      </Context>
    
  );
};

export default App;




