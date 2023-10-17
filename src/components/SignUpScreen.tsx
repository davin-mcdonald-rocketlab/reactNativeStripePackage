import React from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native'

const SignUpForm: React.FC<{
  email: string
  setEmail: (text: string) => void
  password: string
  setPassword: (text: string) => void
  handleSignUp: () => void
  isLoading: boolean
  navigation: any
}> = ({ email, setEmail, password, setPassword, handleSignUp, isLoading, navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.text}>Sign Up</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        {isLoading ? <ActivityIndicator /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>
      <Text style={styles.footerText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('LoginFlow')}>
        <Text style={styles.footerLink}>Login here</Text>
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
    backgroundColor: 'green',
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    color: 'blue',
  },
})

export default SignUpForm
