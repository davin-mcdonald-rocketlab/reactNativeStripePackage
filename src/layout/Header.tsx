import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the app!</Text>
      <Button title="Login" onPress={() => console.log('hello')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 100,
    width: '100%',
    display: 'flex',
    // padding: 50,
    textAlign: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Header
