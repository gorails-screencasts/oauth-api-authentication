import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { login } from '../auth'

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._loginAsync} />
      </View>
    );
  }

  _loginAsync = async () => {
    login()
      .then(() => this.props.navigation.navigate('Main'))
      .catch(err => console.log(err))
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
