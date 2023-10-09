import React, { FC, Dispatch, SetStateAction } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CurrentScreenProps } from '../utils/types'
import getBiometrics from '../utils/biometrics'
import { setData } from '../utils/storage'

const BiometricsScreen: FC<{
  setCurrent: Dispatch<SetStateAction<CurrentScreenProps>>
}> = ({ setCurrent }) => {
  const handleBiometrics = async () => {
    await setData('skipBiometrics', 'false')
    const biometrics = await getBiometrics()
    if (biometrics) {
      setCurrent({ screen: 'home' })
    }
  }

  const handleSkip = async () => {
    await setData('skipBiometrics', 'true')
    setCurrent({ screen: 'home' })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login with biometrics?</Text>
      <TouchableOpacity style={styles.button} onPress={handleBiometrics}>
        <Text style={styles.buttonText}>Enable Biometrics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAlt} onPress={handleSkip}>
        <Text style={styles.buttonText}>Skip</Text>
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
    backgroundColor: 'green',
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonAlt: {
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

export default BiometricsScreen
