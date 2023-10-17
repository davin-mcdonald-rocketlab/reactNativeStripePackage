import { useStripe } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, View } from 'react-native'

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)

  const API_URL = 'http://localhost:3000'

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { paymentIntent, ephemeralKey, customer } = await response.json()

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    }
  }

  // const publishableKey = STRIPE_PUBLISHABLE_KEY

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams()

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
      returnURL: 'reactNativeStripePackage://stripe-redirect',
    })
    if (!error) {
      setLoading(true)
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  }

  React.useEffect(() => {
    initializePaymentSheet()
  }, [])

  return (
    <View style={styles.container}>
      <Button disabled={!loading} title="Checkout" onPress={openPaymentSheet} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
