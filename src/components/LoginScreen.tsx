import React, { FC } from 'react'
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Text,
  KeyboardAvoidingView,
} from 'react-native'

const Login: FC<{
  message: string
  setEmail: (text: string) => void
  setPassword: (text: string) => void
  handleLogin: () => void
  showPassword: boolean
  setShowPassword: (showPassword: boolean) => void
  password: string
}> = ({ message, setEmail, setPassword, handleLogin, showPassword, setShowPassword, password }) => {
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.text}>{message}</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!showPassword}
        value={password}
      />
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Text>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    fontSize: 14,
    marginBottom: 20,
  },
})

export default Login
