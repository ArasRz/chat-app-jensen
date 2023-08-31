import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { useContext } from 'react';
import { AuthContext } from './contexts/Context';

const Chat = () => {
  const [messages, setMessages] = useState([])

  const {accessToken}= useContext(AuthContext);

  const fetchMessages = async() => {
    try{
      const response = await fetch('https://chat-api-with-auth.up.railway.app/messages',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }})
      const data = await response.json();
      setMessages(data.data);
      console.log(messages);
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {fetchMessages()
  }, [])
  useEffect(() => {
    console.log('Updated messages:', messages); // Log the updated state
  }, [messages]);

  return (
    <View>
      <Text>Chat Page</Text>
      {messages.length > 0 ? messages.map(message => {
        return <Text>{message.content}</Text>
      }) : null}
    </View>
  )
}

export default Chat


