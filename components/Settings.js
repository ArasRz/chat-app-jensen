import React from 'react'
import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from './contexts/Context';


const Settings = ({ navigation }) => {
  const {accessToken}= useContext(AuthContext);
  const {setAccessToken}= useContext(AuthContext);

  const handleLogout = async() => {
    await AsyncStorage.removeItem('accessToken');
    await setAccessToken(null)
    console.log(accessToken);
    navigation.navigate('Login');

}
  return (
    <View>
      <Text>Settings Page</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default Settings


