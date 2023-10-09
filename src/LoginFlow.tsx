import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Login from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import BiometricsScreen from './components/BiometricsScreen';
import jwtDecoder from './utils/jwtDecoder';
import {
  LoginResponse,
  CurrentScreenProps,
  DecodedTokenProps,
} from './utils/types';
import getBiometrics from './utils/biometrics';
import dateToSeconds from './utils/dateToSeconds';
import apiClient from './api/apiClient';
import {getData, setData} from './utils/storage';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [current, setCurrent] = useState<CurrentScreenProps>({
    screen: 'login',
  });
  const [message, setMessage] = useState<string>('');

  const checkTokenStillValid = async (accessToken: string) => {
    const decodedToken: DecodedTokenProps = accessToken
      ? jwtDecoder(accessToken)
      : {
          header: null,
          payload: null,
        };
    const date = new Date();

    if (
      accessToken &&
      decodedToken?.payload?.exp &&
      decodedToken.payload.exp > dateToSeconds(date)
    ) {
      console.log('Decoded token:', decodedToken, dateToSeconds(date));
      return true;
    }
  };

  useEffect(() => {
    setPassword('');
    const checkBiometrics = async () => {
      const skipBiometrics = await getData('skipBiometrics');
      const isLoggedOut = await getData('logout');
      if (isLoggedOut === 'true') {
        setShowPassword(false);
        setMessage('You have been logged out.');
      }
      if (skipBiometrics === 'true' || isLoggedOut === 'true') {
        setIsLoading(false);
        return;
      }
      // Check if user has agreed to biometrics.
      const getBiometricsFromLocal = await getData('biometrics');

      if (getBiometricsFromLocal) {
        // Check if biometrics are available on the device and run them.
        const biometrics = await getBiometrics();

        if (biometrics) {
          // Check if there are tokens in local storage.
          const accessToken = await getData('accessToken');
          const refreshToken = await getData('refreshToken');
          // Check if the tokens are still valid or expired.
          const isAccessTokenValid = accessToken
            ? await checkTokenStillValid(accessToken)
            : null;
          const isRefreshTokenValid = refreshToken
            ? await checkTokenStillValid(refreshToken)
            : null;

          if (isAccessTokenValid) {
            // If the access token is valid, go to the home screen.
            setCurrent({screen: 'home'});
          } else if (refreshToken && isRefreshTokenValid) {
            try {
              // If the access token is expired, but the refresh token is valid, get a new access token.
              const newToken = await apiClient<LoginResponse>(
                'refresh-token',
                'POST',
                null,
                null,
                {refreshToken},
              );

              if (newToken) {
                const newAccessToken = newToken.access_token;
                const newRefreshToken = newToken.refresh_token;

                // Save the token to local storage.
                await setData('accessToken', newAccessToken);
                await setData('refreshToken', newRefreshToken);
                // If the new access token is valid, go to the home screen.
                setCurrent({screen: 'home'});
              }
            } catch (error) {
              console.error('Something is wrong: ', error);
              setMessage('Something is wrong: ' + error);
            }
          } else {
            setMessage('Security token expired, please log in again.');
          }
        }
      }
      setIsLoading(false);
    };

    if (current.screen === 'login') {
      checkBiometrics();
    }
  }, [current.screen]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const sanitisedEmail = email.trim().toLowerCase();
      const response = await apiClient<LoginResponse>(
        'login',
        'POST',
        null,
        null,
        {
          email: sanitisedEmail,
          password,
        },
      );

      const accessToken = response.access_token;
      const refreshToken = response.refresh_token;

      console.log('Response: ', response);
      // Save the token to local storage.
      await setData('accessToken', accessToken);
      await setData('refreshToken', refreshToken);

      console.log('Login successful!', accessToken, refreshToken);
      setCurrent({screen: 'biometrics'});
      setIsLoading(false);
      await setData('logout', 'false');
    } catch (error) {
      console.error('Login failed: ', (error as Error).message);
      setIsLoading(false);
      setMessage('Login failed: ' + (error as Error).message);
    }
  };

  return isLoading ? (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  ) : (
    (current.screen === 'login' && (
      <Login
        message={message}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        password={password}
      />
    )) ||
      (current.screen === 'home' && (
        <HomeScreen setMessage={setMessage} setCurrent={setCurrent} />
      )) ||
      (current.screen === 'biometrics' && (
        <BiometricsScreen setCurrent={setCurrent} />
      ))
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
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
  text: {
    fontSize: 24,
  },
});

export default LoginScreen;
