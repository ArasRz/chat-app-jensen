import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './components/Login';
import AuthenticatedScreens from './components/navigators/AppNavigator';
import Register from './components/Register';

const Stack = createStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    console.log(accessToken);
    if(accessToken===null){
    setIsAuthenticated(false);
    }else{
      setIsAuthenticated(true)
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="AuthenticatedScreens" component={AuthenticatedScreens} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




