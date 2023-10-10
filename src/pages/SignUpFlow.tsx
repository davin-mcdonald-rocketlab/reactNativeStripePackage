import React from 'react'
import SignUpForm from '../components/SignUpScreen'

import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { Button } from 'react-native'

interface SignUpFlowProps {
  navigation: NavigationProp<ParamListBase>
}

function SignUpFlow({ navigation }: SignUpFlowProps): JSX.Element {
  console.log('navigation', navigation)
  return (
    <>
      <Button title="Login" onPress={() => navigation.navigate('LoginFlow')} />
      <SignUpForm />
    </>
  )
}

export default SignUpFlow
