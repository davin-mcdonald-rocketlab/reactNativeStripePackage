export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface CurrentScreenProps {
  screen: 'home' | 'login' | 'loading' | 'error' | 'logout' | 'biometrics';
}

export interface GetProfileProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface DecodedTokenProps {
  header?: {
    alg: string;
    typ: string;
  };
  payload?: {
    exp: number;
    iat: number;
    sub: number;
  };
}
