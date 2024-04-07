import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import * as firebase from 'firebase';
import Swipeout from 'react-native-swipeout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as api from '../datastore/api_requests';

import {
  setUserData,
  setFrequentLocations,
  setMostProductiveDays,
  setLeastProductiveDays,
  setMostProductiveLocations,
  setProductivityScores,
} from '../state/actions';

import NavBar from '../components/NavBar';
import AddresSearch from '../components/AddressSearch';

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    // split up lat long for local state
    const latLong = this.props.userData.latlongHomeLocation.split(',');

    latLong.forEach((obj, index) => {
      latLong[index] = obj.replace(/^\s+|\s+$/gm, '');
    });

    this.state = {
      // home location info
      homeLocation: this.props.userData.homeLocation
        ? this.props.userData.homeLocation
        : 'Enter Your Home Addresss', // home location info
      presetProductiveLocations: this.props.userData.presetProductiveLocations, // locations where you've defined your avg productivity
      homeLocationLatLong: latLong.length > 0 ? latLong : [], // lat long of home address
      locationNameToAdd: '', // address field in item to add
      locationProductivityToAdd: 0, // productivity field in item to add
      homeLocationDropdown: 'auto', // whether or not to display dropdown for home location search
      addLocationDropdown: 'auto', // whether or not to display dropdown for add location location search
    };
  }

  static navigationOptions = {
    header: null,
  };

  // save user information/updates they provided
  saveInfo = () => {
    const presetProductiveLocations = this.state.presetProductiveLocations;

    // add item to preset productive locations if user entered something
    if (this.state.locationNameToAdd.length > 0 && this.state.locationProductivityToAdd > 0) {
      presetProductiveLocations[
        this.state.locationNameToAdd
      ] = this.state.locationProductivityToAdd;
    }

    // set state, then call API to update settings
    this.setState(
      {
        presetProductiveLocations,
        locationNameToAdd: '',
        locationProductivityToAdd: 0,
      },
      () => {
        // get user auth token
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(idToken => {
            // push changes
            api
              .updateUserSettings(
                idToken,
                this.state.homeLocation,
                this.state.homeLocationLatLong,
                this.state.presetProductiveLocations
              )
              .then(() => {
                // fire off all necessary API requests
                this.props.setUserData(idToken);
                this.props.setFrequentLocations(idToken, 10);
                this.props.setMostProductiveDays(idToken);
                this.props.setLeastProductiveDays(idToken);
                this.props.setMostProductiveLocations(idToken);
                this.props.setProductivityScores(idToken);
              })
              .catch(error => {
                Alert.alert(error.message);
              });
          })
          .catch(error => {
            Alert.alert(error.message);
          });
      }
    );
  };

  // user's ability to enter their home location
  renderHomeLocationInput = () => {
    return (
      <AddresSearch
        placeholder={this.state.homeLocation}
        listViewDisplayed={this.state.homeLocationDropdown}
        handlePress={(data, details) => {
          const latLong = [details.geometry.location.lat, details.geometry.location.lng];
          this.setState({
            homeLocation: data.description,
            homeLocationLatLong: latLong,
            homeLocationDropdown: 'false',
          });
        }}
        placeholderTextColor={'#BCC4C7'}
        inputColor={'#BCC4C7'}
        inputBackgroundColor={'#293C44'}
        inputBorderBottomColor={'#BCC4C7'}
        rowColor={'#293C44'}
      />
    );
  };

  // addresses of preset productive locations
  renderPresetRows = () => {
    return Object.keys(this.state.presetProductiveLocations).map((location, index) => {
      // define buttons for swipe
      const swipeBtns = [
        {
          text: 'Delete',
          backgroundColor: 'red',
          underlayColor: '#293C44',
          onPress: () => {
            delete this.state.presetProductiveLocations[location];
            this.saveInfo();
          },
        },
      ];

      // return row
      return (
        <Swipeout right={swipeBtns} autoClose backgroundColor="transparent" key={index}>
          <View style={styles.presetRow}>
            <View style={styles.locationColumn}>
              <Text style={styles.address}>{location}</Text>
            </View>
            <View style={styles.productivityColumn}>
              <StarRating
                disabled={false}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                iconSet={'Ionicons'}
                maxStars={5}
                starSize={25}
                rating={this.state.presetProductiveLocations[location]}
                selectedStar={rating => {
                  const obj = this.state.presetProductiveLocations;
                  obj[location] = rating;

                  this.setState({
                    presetProductiveLocations: obj,
                  });
                }}
                fullStarColor={'white'}
              />
            </View>
          </View>
        </Swipeout>
      );
    });
  };

  // ability to add another preset productive location
  addAnotherPreset = () => {
    return (
      <View>
        <Text style={styles.addAnotherPreset}>Add Another Preset Location:</Text>
        <View style={styles.presetRow}>
          <View style={styles.locationColumn}>
            <AddresSearch
              placeholder={this.state.locationNameToAdd}
              listViewDisplayed={this.state.addLocationDropdown}
              handlePress={(data, details) => {
                this.setState({
                  locationNameToAdd: data.description,
                  addLocationDropdown: 'false',
                });
              }}
              placeholderTextColor={'BCC4C7'}
              inputColor={'#BCC4C7'}
              inputBackgroundColor={'#293C44'}
              inputBorderBottomColor={'#BCC4C7'}
              rowColor={'#293C44'}
            />
          </View>
          <View style={styles.productivityColumn}>
            <StarRating
              disabled={false}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              iconSet={'Ionicons'}
              maxStars={5}
              starSize={25}
              rating={this.state.locationProductivityToAdd}
              selectedStar={rating => {
                this.setState({
                  locationProductivityToAdd: rating,
                });
              }}
              fullStarColor={'white'}
            />
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <NavBar backgroundColor="#293C44" />
          <KeyboardAwareScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>
            <View style={styles.settingsContainer}>
              <Text style={styles.formLabel}>Your Home Location:</Text>
              {this.renderHomeLocationInput()}
              <Text style={styles.formLabel}>Preset Productive Locations:</Text>
              <Text style={styles.formDescription}>
                Whenever you visit these locations, we preset your productivity level with the value
                below.
              </Text>
              <View style={styles.presetRow}>
                <View style={styles.locationColumn}>
                  <Text style={styles.columnHeader}>Location:</Text>
                </View>
                <View style={styles.productivityColumn}>
                  <Text style={styles.columnHeader}>Productivity:</Text>
                </View>
              </View>
              <View style={styles.presetContainer}>{this.renderPresetRows()}</View>
              {this.addAnotherPreset()}
            </View>
          </KeyboardAwareScrollView>
          <Button
            buttonStyle={styles.saveButton}
            color="#FEFEFE"
            onPress={() => {
              this.saveInfo();
            }}
            title="Save"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#293C44',
  },
  container: {
    flex: 1,
    backgroundColor: '#293C44',
  },
  contentContainer: {
    backgroundColor: '#293C44',
  },
  settingsContainer: {
    marginLeft: 18,
    marginRight: 18,
  },
  heading: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Raleway-Bold',
  },
  formLabel: {
    color: '#FEFEFE',
    fontSize: 28,
    fontFamily: 'Raleway-Bold',
    marginTop: 30,
  },
  formDescription: {
    marginBottom: 20,
    fontFamily: 'Raleway-Light',
    fontSize: 16,
    color: 'white',
  },
  text: {
    margin: 20,
  },
  input: {
    borderBottomColor: '#FEFEFE',
    borderBottomWidth: 0.25,
    fontSize: 20,
    paddingBottom: 5,
    color: '#FEFEFE',
    fontFamily: 'Raleway-Light',
    fontWeight: '300',
  },
  formSubheading: {
    color: '#FEFEFE',
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
    marginBottom: 25,
  },
  columnContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  presetContainer: {
    flex: 1,
  },
  presetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: '#293C44',
  },
  addAnotherPreset: {
    color: '#FEFEFE',
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    marginVertical: 15,
  },
  address: {
    color: 'white',
    fontFamily: 'Raleway-Light',
    fontSize: 18,
  },
  score: {
    color: 'white',
    fontFamily: 'Raleway-Light',
    fontSize: 18,
    textAlign: 'center',
  },
  column: {
    width: '50%',
  },
  locationColumn: {
    width: '60%',
  },
  productivityColumn: {
    width: '35%',
    marginHorizontal: 20,
  },
  columnHeader: {
    color: '#e5e5e5',
    fontFamily: 'Raleway-Bold',
    fontSize: 20,
  },
  columnText: {
    paddingTop: 5,
    color: '#FEFEFE',
    fontSize: 20,
    fontFamily: 'Raleway-Light',
  },
  saveButton: {
    backgroundColor: '#388CAB',
    margin: 40,
  },
  switch: {
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
    color: 'rgba(0,0,0,0)',
  },
  switchText: {
    fontSize: 18,
    color: '#293C44',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user.userData,
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
  }
)(SettingsScreen);
