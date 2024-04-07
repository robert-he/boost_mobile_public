import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// search bar for address info
const AddressSearch = props => {
  return (
    <GooglePlacesAutocomplete
      placeholder={props.placeholder}
      placeholderTextColor={props.placeHolderTextColor}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed={props.listViewDisplayed} // true/false/undefined
      fetchDetails
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        props.handlePress(data, details);
      }}
      getDefaultValue={() => ''}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyC-NzR3fMLRX_6R9-sFCX7EBLVPFUgRjgk',
        language: 'en', // language of the results
        types: 'address', // default: 'geocode'
      }}
      styles={{
        description: {
          fontWeight: 'bold',
          color: '#fefefe',
          width: '100%',
        },
        textInputContainer: {
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0,
          outline: 'none',
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: props.inputColor,
          fontFamily: 'Raleway-Light',
          backgroundColor: props.inputBackgroundColor,
          borderBottomColor: props.inputBorderBottomColor,
          borderBottomWidth: 0.25,
          fontSize: 20,
          paddingBottom: 5,
          paddingLeft: 0,
        },
        poweredContainer: {
          display: 'none',
        },
        row: {
          color: props.rowColor,
        },
      }}
      // currentLocation // Will add a 'Current location' button at the top of the predefined places list
      currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address',
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'prominence',
      }}
      debounce={500} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
};

export default AddressSearch;
