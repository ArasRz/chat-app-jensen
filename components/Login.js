import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from './contexts/Context';

const Login = ({ navigation }) => {
  const [password, setPassword] = useState('');

  const {handleLogin} = useContext(AuthContext);
  const {error} = useContext(AuthContext);
  const {accessToken}= useContext(AuthContext);
  const {myUsername} = useContext(AuthContext);
  const {setMyusername} = useContext(AuthContext);
  

  const navigateToChat = () => {
    if(accessToken !== null){
    navigation.navigate('AuthenticatedScreens');
    } else{
      null;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My Chat App</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={myUsername}
        onChangeText={setMyusername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={() => {handleLogin(myUsername, password); navigateToChat()}} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Don't have an account? Register here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  registerLink: {
    marginTop: 10,
    color: 'blue',
  },
});

export default Login;


