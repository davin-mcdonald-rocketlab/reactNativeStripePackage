import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import auth from '@react-native-firebase/auth'
import Login from '../components/LoginScreen'
import { NavigationProps } from '../utils/types'

function LoginScreen({ navigation }: NavigationProps) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const sanitisedEmail = email.trim().toLowerCase()
      await auth().signInWithEmailAndPassword(sanitisedEmail, password)
    } catch (error) {
      console.error('Login failed: ', (error as Error).message)
      setIsLoading(false)
      setMessage('Login failed: ' + (error as Error).message)
    }
  }

  return isLoading ? (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  ) : (
    <Login
      message={message}
      setEmail={setEmail}
      setPassword={setPassword}
      handleLogin={handleLogin}
      setShowPassword={setShowPassword}
      showPassword={showPassword}
      password={password}
      navigation={navigation}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  text: {
    fontSize: 24,
  },
})

export default LoginScreen
