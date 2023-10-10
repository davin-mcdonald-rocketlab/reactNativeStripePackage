import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log('User account created & signed in!', res)
        })
    } catch (error) {
      if ((error as any).code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
      }

      if ((error as any).code === 'auth/invalid-email') {
        console.log('That email address is invalid!')
      }

      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
})

export default SignUpForm
