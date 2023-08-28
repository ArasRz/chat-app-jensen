import React from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Settings = ({ navigation }) => {
    const handleLogout = async () => {
      try {
        // Clear user data from AsyncStorage
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('userID');
  
        // Redirect to Login screen
        navigation.navigate('Login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    );
  };
  
  export default Settings;
  
