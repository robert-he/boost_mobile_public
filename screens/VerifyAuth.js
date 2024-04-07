import React from 'react';
import { StyleSheet, View, Text, Alert, Image, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { TaskManager, Constants, Permissions, Location } from 'expo';
import * as api from '../datastore/api_requests';

import {
  setUserData,
  setFrequentLocations,
  setMostProductiveDays,
  setLeastProductiveDays,
  setMostProductiveLocations,
  setProductivityScores,
  setNewLocations,
  setProvidedBackgroundLocation,
} from '../state/actions';

import loadingGIF from '../assets/gifs/loading-white.gif';
import NavBar from '../components/NavBar';

// define background location data task for device
TaskManager.defineTask('GET_BACKGROUND_LOCATION_DATA', ({ data: { locations }, error }) => {
  if (error) {
    Alert(error.message);
  } else {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        api.uploadBackgroundLocationData(idToken, locations);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }
});

// user is routed here after login/auth in order to pull data about them
class VerifyAuth extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      id: null,
      sentRequests: false,
    };
  }

  // get user account or create one
  componentDidMount() {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(idToken => {
        this.setState(
          {
            id: idToken,
          },
          () => {
            this.props.setUserData(this.state.id);
          }
        );
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  }

  // verify new info coming in and advance user to app if received everything
  componentWillUpdate(nextProps) {
    if (this.state.id !== null) {
      // determine if there was a server error
      if (Object.keys(nextProps.apiError).length > 0) {
        Alert.alert(nextProps.apiError.message);
      }
      // once we have the user data, then an account definitely exists, so fire off additional requests async of each other
      else if (Object.keys(nextProps.userData).length > 0 && !this.state.sentRequests) {
        this.props.setFrequentLocations(this.state.id, 10);
        this.props.setMostProductiveDays(this.state.id);
        this.props.setLeastProductiveDays(this.state.id);
        this.props.setMostProductiveLocations(this.state.id);
        this.props.setProductivityScores(this.state.id);
        this.props.setNewLocations(this.state.id);

        // begin pulling background location data if user gave permission
        this.getUserLocation();

        this.setState({
          sentRequests: true,
        });
      }

      // determine if we've received everything from the server
      else if (
        this.state.sentRequests &&
        !nextProps.setUserDataInProgress &&
        !nextProps.setFrequentLocationsInProgress &&
        !nextProps.setMostProductiveDaysInProgress &&
        !nextProps.setLeastProductiveDaysInProgress &&
        !nextProps.setMostProductiveLocationsInProgress &&
        !nextProps.setProductivityScoresInProgress &&
        !nextProps.setNewLocationsInProgress
      ) {
        // if the user must provide more information to proceed, then navigate to initial info screen, otherwise send to App
        if (this.mustProvideMoreInformation(nextProps.userData)) {
          this.props.navigation.navigate('ProvideInitialInfo');
        } else {
          this.props.navigation.navigate('App');
        }
      }
    }
  }

  // determine if user must provide more information before proceeding to app
  mustProvideMoreInformation = userData => {
    return (
      !Object.keys(userData).includes('homeLocation') ||
      userData.homeLocation === null ||
      userData.homeLocation === undefined ||
      userData.homeLocation.length === 0
    );
  };

  // loading icon
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <NavBar backgroundColor="#388CAB" />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.loading}>Loading...</Text>
            <Image style={styles.loadingGIF} source={loadingGIF} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // start stream to get user background location data
  getUserLocation = async () => {
    if (Constants.isDevice) {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status === 'granted') {
        this.props.setProvidedBackgroundLocation(true);
      }

      Location.startLocationUpdatesAsync('GET_BACKGROUND_LOCATION_DATA', {
        distanceInterval: 160, // ensure new location changed by 160 meters (about 0.1 miles)
      });
    }
  };
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#388CAB',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#388CAB',
  },
  contentContainer: {
    backgroundColor: '#388CAB',
    alignItems: 'center',
  },
  loadingGIF: {
    width: 95,
    height: 95,
    marginBottom: 50,
  },
  loading: {
    fontFamily: 'Raleway-Light',
    fontSize: 20,
    color: '#e5e5e5',
    marginLeft: 10,
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
    apiError: state.api.error,
    setUserDataInProgress: state.api.setUserDataInProgress,
    setFrequentLocationsInProgress: state.api.setFrequentLocationsInProgress,
    setMostProductiveDaysInProgress: state.api.setMostProductiveDaysInProgress,
    setLeastProductiveDaysInProgress: state.api.setLeastProductiveDaysInProgress,
    setMostProductiveLocationsInProgress: state.api.setMostProductiveLocationsInProgress,
    setProductivityScoresInProgress: state.api.setProductivityScoresInProgress,
    setNewLocationsInProgress: state.api.setNewLocationsInProgress,
  };
};

export default connect(
  mapStateToProps,
  {
    setUserData,
    setFrequentLocations,
    setMostProductiveDays,
    setLeastProductiveDays,
    setMostProductiveLocations,
    setProductivityScores,
    setNewLocations,
    setProvidedBackgroundLocation,
  }
)(VerifyAuth);
