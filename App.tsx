import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginFlow from './src/pages/LoginFlow'
import SignUpFlow from './src/pages/SignUpFlow'
import BiometricsFlow from './src/pages/BiometricsFlow'
import Home from './src/pages/Home'
import { StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'

const Stack = createStackNavigator()

const App: React.FC = () => {
  const [initializing, setInitializing] = React.useState(true)
  const [user, setUser] = React.useState()

  React.useEffect(() => {
    // Handle user state changes
    // TODO: add correct types for userData
    function onAuthStateChanged(userData: any) {
      setUser(userData)
      if (initializing) setInitializing(false)
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [initializing])

  return initializing ? (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SignUpFlow"
            component={SignUpFlow}
            options={{
              headerTitle: 'Sign Up',
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="LoginFlow"
            component={LoginFlow}
            options={{
              headerTitle: 'Login',
              headerLeft: () => null,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: 'Home',
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="Biometrics"
            component={BiometricsFlow}
            options={{
              headerTitle: 'Enable Biometrics',
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App
