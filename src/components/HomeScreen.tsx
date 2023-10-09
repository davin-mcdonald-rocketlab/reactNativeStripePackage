import React, { useState, FC, Dispatch, SetStateAction } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CurrentScreenProps, GetProfileProps } from '../utils/types'
import apiClient from '../api/apiClient'
import { removeData, setData, getData } from '../utils/storage'

const HomeScreen: FC<{
  setCurrent: Dispatch<SetStateAction<CurrentScreenProps>>
  setMessage: Dispatch<SetStateAction<string>>
}> = ({ setCurrent, setMessage }) => {
  const [profileForDisplay, setProfileForDisplay] = useState<string | null>(null)
  const [counter, setCounter] = useState<number>(0)
  const [tokenWasRefreshed, setTokenWasRefreshed] = useState<boolean>(false)

  const handleClearAccessToken = async () => {
    await removeData('accessToken')
    console.log('Access token cleared!')
  }

  const handleClearRefreshToken = async () => {
    await removeData('refreshToken')
    console.log('Refresh token cleared!')
  }

  const handleLogout = async () => {
    await removeData('accessToken')
    await removeData('refreshToken')
    await setData('logout', 'true')
    setCurrent({ screen: 'login' })
  }

  const handleAPICall = async () => {
    const token = await getData('accessToken')
    const refreshToken = await getData('refreshToken')
    if (refreshToken || token) {
      try {
        const profile = await apiClient<GetProfileProps>('profile', 'GET', refreshToken, token)
        if (profile) {
          setProfileForDisplay(profile.email)
          setCounter(counter + 1)
          setTokenWasRefreshed(false)
        } else {
          console.log('Get profile failed!')
        }
      } catch (error) {
        console.log('Error:', error)
      }
      return
    }
    console.error('No token found!')
    setCurrent({ screen: 'login' })
    setMessage('No security token found, please login again.')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      {profileForDisplay && (
        <Text style={styles.textSmall}>
          Profile: {profileForDisplay + ' retrieved: ' + counter + ' times'}
        </Text>
      )}
      {tokenWasRefreshed && <Text style={styles.textSmall}>Token was refreshed!</Text>}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAlt2} onPress={handleClearAccessToken}>
        <Text style={styles.buttonText}>Clear Access Token</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAlt2} onPress={handleClearRefreshToken}>
        <Text style={styles.buttonText}>Clear Refresh Token</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonAlt} onPress={handleAPICall}>
        <Text style={styles.buttonText}>Make API Call</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonAlt3}
        onPress={() => setCurrent({ screen: 'biometrics' })}
      >
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
  textSmall: {
    fontSize: 12,
    marginTop: 20,
    width: '80%',
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
  buttonAlt: {
    backgroundColor: 'green',
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonAlt2: {
    backgroundColor: 'orange',
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
