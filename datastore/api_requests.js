import axios from 'axios';
const API_URL = 'https://project-boost.herokuapp.com/api';

// mongo user info
const getUserInfo = idToken => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/getAuth`, { userID: idToken })
      .then(response => {
        if (Object.keys(response.data).includes('response')) {
          resolve(response.data.response);
        } else {
          resolve(response.data);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

// most frequently visited locations (different for all time data vs 30 days vs 7 days)
const getFrequentLocations = (idToken, numberOfItems) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${API_URL}/mostFrequentlyVisitedLocationsRanked?uid=${idToken}&numberOfItems=${numberOfItems}`
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// most productive day (different for all time data vs 30 days vs 7 days)
const getMostProductiveDays = idToken => {
  return new Promise((resolve, reject) => {
    const promises = [];
    const timelines = [1000000, 7, 30];

    timelines.forEach(time => {
      promises.push(
        new Promise((resolve, reject) => {
          axios
            .get(`${API_URL}/getMostProductiveWeekDay?userID=${idToken}&days=${time}`)
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            });
        })
      );
    });

    Promise.all(promises)
      .then(result => {
        const output = {};

        result.forEach(obj => {
          output[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
        });

        resolve(output);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// least productive day (different for all time data vs 30 days vs 7 days)
const getLeastProductiveDays = idToken => {
  return new Promise((resolve, reject) => {
    const promises = [];
    const timelines = [1000000, 7, 30];

    timelines.forEach(time => {
      promises.push(
        new Promise((resolve, reject) => {
          axios
            .get(`${API_URL}/getLeastProductiveWeekDay?userID=${idToken}&days=${time}`)
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            });
        })
      );
    });

    Promise.all(promises)
      .then(result => {
        const output = {};

        result.forEach(obj => {
          output[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
        });

        resolve(output);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// most productive locations (different for all time data vs 30 days vs 7 days)
const getMostProductiveLocations = idToken => {
  return new Promise((resolve, reject) => {
    const promises = [];
    const timelines = [1000000, 7, 30];

    timelines.forEach(time => {
      promises.push(
        new Promise((resolve, reject) => {
          axios
            .get(
              `${API_URL}/mostProductiveLocationsRankedLastNDays?uid=${idToken}&numberOfItems=${5}&days=${time}`
            )
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            });
        })
      );
    });

    Promise.all(promises)
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// avg productivity scores for each day last 30 or 7 days
const getProductivityScores = idToken => {
  return new Promise((resolve, reject) => {
    const promises = [];
    const timelines = [1000000, 7, 30];

    timelines.forEach(time => {
      promises.push(
        new Promise((resolve, reject) => {
          axios
            .get(`${API_URL}/productivityScoresLastNDays?uid=${idToken}&days=${time}`)
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              reject(error);
            });
        })
      );
    });

    Promise.all(promises)
      .then(result => {
        const output = {};

        result.forEach(obj => {
          output[obj.days] = obj.output;
        });

        resolve(output);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// send updated info for user (things you can set on settings screen like home location and preset productive locations)
const updateUserSettings = (
  idToken,
  homeLocation,
  homeLocationLatLong,
  presetProductiveLocations
) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/updateUserSettings`, {
        userID: idToken,
        homeLocation,
        homeLocationLatLong:
          homeLocationLatLong.length > 0
            ? `${homeLocationLatLong[0]} , ${homeLocationLatLong[1]}`
            : '',
        presetProductiveLocations,
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// send up background location data
const uploadBackgroundLocationData = (idToken, dataToBeProcessed) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/storeBackgroundData`, {
        uid: idToken,
        dataToBeProcessed,
      })
      .then(response => {
        resolve(response);
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

// grab new locations that need productivity score
const getNewLocations = idToken => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_URL}/getLocationsWithProductivityNullWithinLastNDays?userID=${idToken}&days=30`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// update productivity score of new locations
const updateLocationProductivity = (locationID, idToken, productivity) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL}/updateProductivityLevel/${locationID}`, {
        userID: idToken,
        productivity,
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export {
  getUserInfo,
  getFrequentLocations,
  updateUserSettings,
  getMostProductiveDays,
  getLeastProductiveDays,
  getMostProductiveLocations,
  getProductivityScores,
  getNewLocations,
  updateLocationProductivity,
  uploadBackgroundLocationData,
};
