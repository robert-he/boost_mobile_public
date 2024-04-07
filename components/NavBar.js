import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class NavBar extends React.Component {
  static navigationOptions = {
    header: null,
  };

  signout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch(err => {
        Alert.alert(err);
      });
  };

  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.backgroundColor || '#FFF' }]}>
        <Text style={styles.boost}>BOOST</Text>
        <TouchableOpacity onPress={this.signout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  boost: {
    fontFamily: 'Raleway-Light',
    fontSize: 26,
    color: 'white',
  },
  logout: {
    fontFamily: 'Raleway-Light',
    fontSize: 18,
    color: 'white',
  },
});
