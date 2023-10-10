import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginFlow from './src/pages/LoginFlow'
import SignUpFlow from './src/pages/SignUpFlow'

const Stack = createStackNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUpFlow" component={SignUpFlow} />
        <Stack.Screen name="LoginFlow" component={LoginFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
