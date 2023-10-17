import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginFlow from './src/pages/LoginFlow'
import SignUpFlow from './src/pages/SignUpFlow'
import BiometricsFlow from './src/pages/BiometricsFlow'
import Home from './src/pages/Home'
import Payments from './src/pages/Payments'
import { Linking, StyleSheet, Text, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import { STRIPE_PUBLISHABLE_KEY } from '@env'

const Stack = createStackNavigator()

const App: React.FC = () => {
  const [initializing, setInitializing] = React.useState(true)
  const [user, setUser] = React.useState()

  const { handleURLCallback } = useStripe()

  const handleDeepLink = React.useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url)
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback],
  )

  React.useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL()
      handleDeepLink(initialUrl)
    }

    getUrlAsync()

    const deepLinkListener = Linking.addEventListener('url', (event: { url: string }) => {
      handleDeepLink(event.url)
    })

    return () => deepLinkListener.remove()
  }, [handleDeepLink])

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
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      urlScheme="reactNativeStripePackage://stripe-redirect" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.reactNativeStripePackage" // required for Apple Pay
    >
      <NavigationContainer>
        {!user ? (
          <Stack.Navigator>
            <Stack.Screen
              name="LoginFlow"
              component={LoginFlow}
              options={{
                headerTitle: 'Login',
                headerLeft: () => null,
              }}
            />
            <Stack.Screen
              name="SignUpFlow"
              component={SignUpFlow}
              options={{
                headerTitle: 'Sign Up',
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
            <Stack.Screen
              name="Payments"
              component={Payments}
              options={{
                headerTitle: 'Payments',
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </StripeProvider>
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
