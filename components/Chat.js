import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useContext } from 'react';
import { AuthContext } from './contexts/Context';
import { FlatList } from 'react-native-gesture-handler';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const {accessToken}= useContext(AuthContext);
  const{myUsername} = useContext(AuthContext);

  const fetchMessages = async() => {
    try{
      const response = await fetch('https://chat-api-with-auth.up.railway.app/messages',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }})
      const data = await response.json();
      setMessages(data.data);
      // console.log(messages);
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {fetchMessages()
  }, [])
  // useEffect(() => {
  //   console.log('Updated messages:', messages); // Log the updated state
  //   console.log(userid)
  // }, [messages]);

  const Item = ({ content, date, username }) => {
    console.log('Item Rendered:', username + date); // Log the user object
    if(username !== null){
    return (
      <View style={username !== myUsername ? styles.itemOther : styles.itemUser}>
        <Text>{username}</Text>
        <Text style={styles.messageText}>{content}</Text>
        <Text style={styles.messageDate}>{date}</Text>
      </View>
    )} else{
      return null;
    }
  };

  const handleInputChange = (text) =>{
    setNewMessage(text);
    console.log(newMessage + accessToken);
  };

  const handleSubmitMessage = async () => {
    fetchMessages();
    try {
      const response = await fetch('https://chat-api-with-auth.up.railway.app/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Insomnia/2023.5.6',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          content: newMessage
        }),
      });


      if (response.status===201) {
        console.log('created')
      } else {
        console.log(response)
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }; 

  return (
    <View style={styles.container}>
      <Text>Chat Page</Text>
      {/* {messages.length > 0 ? messages.map(message => {
        return <Text>{message.content}</Text>
      }) : null} */}
      <FlatList
        data={messages}
        renderItem={({item}) => <Item content={item.content} date={item.date} username={item.user ? item.user.username : null}/>}
        keyExtractor={item => item._id}
      />
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={newMessage}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSubmitMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemUser: {
    backgroundColor: '#f9c2ff',
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemOther: {
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  messageText: {
    fontSize: 32,
  },
  messageDate: {
    fontSize: 16
  },
  messageUsername: {
    fontSize: 20
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Chat


