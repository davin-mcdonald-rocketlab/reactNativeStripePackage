import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'
import { NavigationProps } from '../utils/types'

const HomeScreen: FC<NavigationProps> = ({ navigation }) => {
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAlt2} onPress={() => navigation.navigate('Payments')}>
        <Text style={styles.buttonText}>Payments</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAlt3} onPress={() => navigation.navigate('Biometrics')}>
        <Text style={styles.buttonText}>Back to Biometrics</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'red',
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonAlt2: {
    backgroundColor: 'green',
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonAlt3: {
    backgroundColor: 'grey',
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
})

export default HomeScreen
