import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Permissions, Location } from 'expo';
import MapView from 'react-native-maps';

// pop up screen with map
export default class MapPopup extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      mapRegion: {
        latitude: 43.703544,
        longitude: -72.289136,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      },
    };
  }

  // make sure have location, then geocode addres into a lat/long point to display on map
  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION);

    Location.geocodeAsync(this.props.address)
      .then(result => {
        if (result.length > 0) {
          let mapRegion = this.state.mapRegion;
          mapRegion.latitude = result[0].latitude;
          mapRegion.longitude = result[0].longitude;

          this.setState({
            mapRegion,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillUpdate() {
    this.marker.showCallout();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.state.mapRegion}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.mapRegion.latitude,
              longitude: this.state.mapRegion.longitude,
            }}
            title={this.props.address}
            // adopted from: https://github.com/react-native-community/react-native-maps/issues/1872
            ref={ref => {
              this.marker = ref;
            }}>
            <Image
              source={require('../assets/images/map-pin.png')}
              style={{ width: 30, height: 30 }}
            />
          </MapView.Marker>
        </MapView>
        {/* <Text>{this.props.address}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
  },
});
