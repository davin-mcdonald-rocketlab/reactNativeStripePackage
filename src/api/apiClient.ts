import {LoginResponse} from '../utils/types';
import {setData} from '../utils/storage';

const BASE_URL = 'https://api.escuelajs.co/api/v1/auth/';

async function apiClient<T>(
  endpoint: string,
  method: string = 'GET',
  refreshToken: string | null = null,
  authToken: string | null = null,
  body: any = null,
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    console.info('Fetching', url, options);
    const response = await fetch(url, options);

    console.log('response', response.status);

    if (response.status === 401 && refreshToken) {
      // If the request returns a 401 (Unauthorized) and we have a refresh token,
      // attempt to refresh the access token using the refresh token
      console.log('Attempting to refresh the token...');
      const newTokens = await apiClient<LoginResponse>(
        'refresh-token',
        'POST',
        null,
        null,
        {
          refreshToken,
        },
      );
      const newAccessToken = newTokens.access_token;
      const newRefreshToken = newTokens.refresh_token;

      await setData('accessToken', newAccessToken);
      await setData('refreshToken', newRefreshToken);
      console.log('New access token:', newAccessToken);
      // Retry the request with the new access token
      console.log('Retrying request with new access token...');
      return apiClient<T>(
        endpoint,
        method,
        newRefreshToken,
        newAccessToken,
        body,
      );
    }

    const data: T = await response.json();

    if (!response.ok) {
      throw new Error((data as Error).message || 'Something went wrong.');
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message || 'Network request failed.');
  }
}

export default apiClient;
