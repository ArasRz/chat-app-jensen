import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Chat from '../Chat'
import Settings from '../Settings'

const Drawer = createDrawerNavigator();

export default function AuthenticatedScreens() {
  return (
    <Drawer.Navigator>
        <Drawer.Screen name="Chat" component={Chat} />
        <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  )
}
