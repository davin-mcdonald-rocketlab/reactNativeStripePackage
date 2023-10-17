import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { setData } from './storage'

const getBiometrics = async () => {
  const rnBiometrics = new ReactNativeBiometrics()
  const { available, biometryType, error } = await rnBiometrics.isSensorAvailable()
  if (available && biometryType === BiometryTypes.TouchID) {
    console.log('TouchID is available!')
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: 'Login with TouchID',
    })
    if (success) {
      console.log('Login successful!')
      await setData('biometrics', biometryType)
      return true
    } else {
      console.log('Login failed!')
      return false
    }
  } else if (available && biometryType === BiometryTypes.FaceID) {
    console.log('FaceID is available!', available, biometryType)
    // const success = true
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: 'Login with FaceID',
    })
    if (success) {
      console.log('Login successful!')
      await setData('biometrics', biometryType)
      return true
    } else {
      console.log('Login failed!')
      return false
    }
  } else if (available && biometryType === BiometryTypes.Biometrics) {
    console.log('Biometrics is available!')
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: 'Login with Biometrics',
    })
    if (success) {
      console.log('Login successful!')
      await setData('biometrics', biometryType)
      return true
    } else {
      console.log('Login failed!')
      return false
    }
  } else {
    console.log('Biometrics is not available!', error)
    return false
  }
}

export default getBiometrics
