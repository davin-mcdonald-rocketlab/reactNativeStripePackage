import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import SignUpForm from '../components/SignUpScreen'
import { NavigationProps } from '../utils/types'

function SignUpFlow({ navigation }: NavigationProps): JSX.Element {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignUp = async () => {
    setIsLoading(true)
    try {
      const response = await auth().createUserWithEmailAndPassword(email, password)
      console.log('response', response)
      navigation.navigate('Biometrics')
    } catch (error) {
      if ((error as any).code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
      }

      if ((error as any).code === 'auth/invalid-email') {
        console.log('That email address is invalid!')
      }
      setIsLoading(false)
      console.error(error)
    }
  }

  return (
    <SignUpForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSignUp={handleSignUp}
      isLoading={isLoading}
      navigation={navigation}
    />
  )
}

export default SignUpFlow
