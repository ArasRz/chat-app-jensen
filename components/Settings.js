import React from 'react'
import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Settings = ({ navigation }) => {
  const handleLogout = async() => {
    await AsyncStorage.removeItem('accessToken');
    const accessToken = await AsyncStorage.getItem('accessToken');

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


