import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Alert,
  Dimensions,
} from 'react-native';
import { Google, Constants } from 'expo';
import * as firebase from 'firebase';

const { width } = Dimensions.get('window');

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    if (firebase.auth().currentUser) {
      this.props.navigation.navigate('VerifyAuth');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.boostText}>BOOST</Text>
          <View style={styles.womanArea}>
            <Image source={require('../assets/images/shopping-woman.png')} style={styles.woman} />
          </View>
        </View>
        <View>
          <ImageBackground
            source={require('../assets/background-images/home-bottom.png')}
            style={styles.bottomImage}
          />
        </View>
        <View style={styles.googleButtonArea}>
          <TouchableOpacity onPress={this.signInGoogleAsync}>
            <Image source={require('../assets/images/google-signin.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // if the user tries to sign in with google, open pop up
  signInGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: Constants.isDevice
          ? `911387247122-1g9m6a6tqhnq0i6vso3galottgdjh4pf.apps.googleusercontent.com`
          : '911387247122-1joui15ksueilqqsse016o2f94585tmt.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      // if successfully sign in via google, grab auth tokens and sign in with firebase
      if (result.type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken
        );

        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(() => {
            this.props.navigation.navigate('VerifyAuth');
          });
      } else {
        console.log('User cancelled google sign in');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    backgroundColor: '#388CAB',
  },
  contentContainer: {
    flex: 1,
    overflow: 'visible',
    zIndex: 2,
  },
  boostText: {
    fontSize: 30,
    color: 'white',
    marginLeft: 30,
    fontFamily: 'Raleway-Light',
  },
  womanArea: {
    alignItems: 'center',
    overflow: 'visible',
  },
  woman: {
    marginTop: 20,
    width: 264,
    height: 480,
  },
  image: {
    width: 250,
    height: 55,
  },
  googleButtonArea: {
    bottom: 75,
    alignItems: 'center',
    zIndex: 3,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  bottomImage: {
    height: 456,
    width,
  },
});
