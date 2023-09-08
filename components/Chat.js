import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useContext } from 'react';
import { AuthContext } from './contexts/Context';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const {accessToken}= useContext(AuthContext);
  const {myUsername} = useContext(AuthContext);

  const fetchMessages = async() => {
    console.log('messages fetched');
    try{
      const response = await fetch('https://chat-api-with-auth.up.railway.app/messages',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }})
      const data = await response.json();
      setMessages(data.data);
    } catch(error){
      console.log(error)
    }
  }

  useEffect(() => {fetchMessages()
  }, [])

  //Delete message
  const deleteMessage = async(messageID) => {
    try {
      const response = await fetch(`https://chat-api-with-auth.up.railway.app/messages/${messageID}`, {
        method: 'DELETE',
        headers: {
          'User-Agent': 'Insomnia/2023.5.6',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.status===200) {
        console.log('Message deleted');
        await fetchMessages();
      } else {
        console.log(response)
      }
    } catch (error) {
      console.error(error);
    }
  }

  //Render messages
  const Item = ({ content, date, username, messageID }) => {
    const formattedDate = date.replace("T", " ").slice(0, -5);
    const messageTime = `${formattedDate}`;

    if(username !== null){
    return (
      <View style={username !== myUsername ? styles.itemOther : styles.itemUser}>
        <Text style={styles.messageUsername}>{username}</Text>
        <Text style={styles.messageText}>{content}</Text>
        <Text style={styles.messageDate}>{messageTime}</Text>    
        {username === myUsername ? <TouchableOpacity onPress={() => deleteMessage(messageID)}>
          <Icon name="times" size={20} color="red" />
        </TouchableOpacity>  :  null}
      </View>
    )} else{
      return null;
    }
  };

  //Input
  const handleInputChange = (text) =>{
    setNewMessage(text);
  };

  //Create message
  const handleSubmitMessage = async () => {
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
        console.log('Message sent');
        await fetchMessages();
      } else {
        console.log(response)
      }
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <View style={styles.container}>
      <Text>Chat Page</Text>
      <FlatList
        data={messages}
        renderItem={({item}) => <Item content={item.content} date={item.date} username={item.user ? item.user.username : null} messageID={item._id}/>}
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
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  itemOther: {
    backgroundColor: '#d3f9c2',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageDate: {
    fontSize: 12
  },
  messageUsername: {
    fontSize: 14,
    fontWeight: 'bold',
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


