import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginFlow from './src/LoginFlow'
// import LoginFlow from './src/LoginFlow'

const Stack = createStackNavigator()

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login Flow" component={LoginFlow} />
        {/* <Stack.Screen name="Login Flow" component={LoginFlow} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
