import React from 'react';
import { SecureStore } from 'expo';
import { createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignInScreen from '../screens/SignInScreen';
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: SignInScreen,
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
},
{
  initialRouteName: 'AuthLoading',
});
