import React from 'react'
import { createStackNavigator } from '@react-navigation/drawer'
import Login from '../Chat'
import Register from '../Settings'

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
    )
}
