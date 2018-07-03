import { AuthSession, SecureStore } from 'expo';

import { post, ENDPOINT } from './network';

const APP_ID = 'd1fd38bf45771da9a602ed9762bf2d9c4004053b6c380b76322fc12a58a08442';
const TOKEN_KEY = 'token';
export var token;

export const isLoggedIn = () => {
  return new Promise((resolve, reject) => {
    SecureStore.getItemAsync(TOKEN_KEY)
      .then(res => {
        if (res !== null) {
          token = res
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const login = async () => {
  let redirectUrl = AuthSession.getRedirectUrl();
  let result = await AuthSession.startAsync({
    authUrl:
    `${ENDPOINT}/oauth/authorize?response_type=code` +
    `&client_id=${APP_ID}` +
    `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
  });

  return new Promise((resolve, reject) => {
    post("/oauth/token", {
      grant_type: 'authorization_code',
      code: result.params.code,
      client_id: APP_ID,
      redirect_uri: redirectUrl,
    })
      .then((json) => {
        if (json.access_token) {
          SecureStore.setItemAsync(TOKEN_KEY, json.access_token)
          token = json.access_token
          resolve(true)
        } else {
          reject(json.error)
        }
      })
      .catch(err => reject(err));
  });
}

export const logout = () => {
  SecureStore.deleteItemAsync(TOKEN_KEY);
  token = null
}
