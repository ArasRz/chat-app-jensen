import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();

export default function Context({children, navigation}) {
    const [accessToken, setAccessToken] = useState(null);
    const [myUsername, setMyusername] = useState('')
    const [userid, setUserid] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('https://chat-api-with-auth.up.railway.app/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
            });
    
            const data = await response.json();

            if (response.ok) {
            setAccessToken(data.data.accessToken);
            setUserid(data.data._id);
            await AsyncStorage.setItem('accessToken', data.data.accessToken);

            await AsyncStorage.setItem('_id', data.data._id);
            console.log(data.data._id)

            } else {
            setError(data.message);
            console.log(error)
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return(
        <AuthContext.Provider value={{accessToken, setAccessToken, handleLogin, userid, error, myUsername, setMyusername}}>
            {children}
        </AuthContext.Provider>
    )
}

