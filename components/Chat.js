import React from 'react'
import { View, Text, Button } from 'react-native'

const Chat = ({ navigation }) => {
  return (
    <View>
      <Text>Chat PAge</Text>
      <Button title="Login" onPress={() => navigation.navigate('Register')} />

    </View>
  )
}

export default Chat


