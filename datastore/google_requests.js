import axios from 'axios';

// makes google maps reverse geocoding api call with lat long input, returns an address if promise is resolved
const getAddress = coords => {
  const coordList = coords.split(' , ');
  return new Promise((resolve, reject) => {
    axios
      .get(
        // eslint-disable-next-line prettier/prettier
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordList[0]},${coordList[1]}&key=AIzaSyC-NzR3fMLRX_6R9-sFCX7EBLVPFUgRjgk`
      )
      .then(result => {
        resolve(result.data.results[0].formatted_address);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default getAddress;
