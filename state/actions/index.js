import * as api from '../../datastore/api_requests';

export const ActionTypes = {
  SET_USER_DATA: 'SET_USER_DATA',
  SET_FREQUENT_LOCATIONS: 'SET_FREQUENT_LOCATIONS',
  SET_MOST_PRODUCTIVE_DAYS: 'SET_MOST_PRODUCTIVE_DAYS',
  SET_LEAST_PRODUCTIVE_DAYS: 'SET_LEAST_PRODUCTIVE_DAYS',
  SET_MOST_PRODUCTIVE_LOCATIONS: 'SET_MOST_PRODUCTIVE_LOCATIONS',
  SET_PRODUCTIVITY_SCORES: 'SET_PRODUCTIVITY_SCORES',
  SET_NEW_LOCATIONS: 'SET_NEW_LOCATIONS',
  SET_PROVIDED_BACKGROUND_LOCATION: 'SET_PROVIDED_BACKGROUND_LOCATION',
  API_ERROR: 'API_ERROR',

  // the following actions are booleans indicating if a request was sent for each object but not yet received
  SET_USER_DATA_IN_PROGRESS: 'SET_USER_DATA_IN_PROGRESS',
  SET_FREQUENT_LOCATIONS_IN_PROGRESS: 'SET_FREQUENT_LOCATIONS_IN_PROGRESS',
  SET_MOST_PRODUCTIVE_DAYS_IN_PROGRESS: 'SET_MOST_PRODUCTIVE_DAYS_IN_PROGRESS',
  SET_LEAST_PRODUCTIVE_DAYS_IN_PROGRESS: 'SET_LEAST_PRODUCTIVE_DAYS_IN_PROGRESS',
  SET_MOST_PRODUCTIVE_LOCATIONS_IN_PROGRESS: 'SET_MOST_PRODUCTIVE_LOCATIONS_IN_PROGRESS',
  SET_PRODUCTIVITY_SCORES_IN_PROGRESS: 'SET_PRODUCTIVITY_SCORES_IN_PROGRESS',
  SET_NEW_LOCATIONS_IN_PROGRESS: 'SET_NEW_LOCATIONS_IN_PROGRESS',
};

// mongo user object
const setUserData = id => {
  return dispatch => {
    dispatch({ type: ActionTypes.SET_USER_DATA_IN_PROGRESS, payload: true });
    api
      .getUserInfo(id)
      .then(response => {
        dispatch({ type: ActionTypes.SET_USER_DATA_IN_PROGRESS, payload: false });
        dispatch({ type: ActionTypes.SET_USER_DATA, payload: response });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

// most frequently visited locations
const setFrequentLocations = (id, numberOfItems) => {
  return dispatch => {
    dispatch({ type: ActionTypes.SET_FREQUENT_LOCATIONS_IN_PROGRESS, payload: true });
    api
      .getFrequentLocations(id, numberOfItems)
      .then(response => {
        dispatch({ type: ActionTypes.SET_FREQUENT_LOCATIONS_IN_PROGRESS, payload: false });
        dispatch({ type: ActionTypes.SET_FREQUENT_LOCATIONS, payload: response });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

// most productive day for all time data, 30 day data, and 7 day data
const setMostProductiveDays = id => {
  return dispatch => {
    dispatch({ type: ActionTypes.SET_MOST_PRODUCTIVE_DAYS_IN_PROGRESS, payload: true });
    api
      .getMostProductiveDays(id)
      .then(response => {
        dispatch({ type: ActionTypes.SET_MOST_PRODUCTIVE_DAYS_IN_PROGRESS, payload: false });
        dispatch({ type: ActionTypes.SET_MOST_PRODUCTIVE_DAYS, payload: response });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

// least productive day for all time data, 30 day data, and 7 day data
const setLeastProductiveDays = id => {
  return dispatch => {
    dispatch({ type: ActionTypes.SET_LEAST_PRODUCTIVE_DAYS_IN_PROGRESS, payload: true });
    api
      .getLeastProductiveDays(id)
      .then(response => {
        dispatch({ type: ActionTypes.SET_LEAST_PRODUCTIVE_DAYS_IN_PROGRESS, payload: false });
        dispatch({ type: ActionTypes.SET_LEAST_PRODUCTIVE_DAYS, payload: response });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

// most productive location for all time data, 30 day data, and 7 day data
const setMostProductiveLocations = id => {
  return dispatch => {
    dispatch({ type: ActionTypes.SET_MOST_PRODUCTIVE_LOCATIONS_IN_PROGRESS, payload: true });
    api
      .getMostProductiveLocations(id)
      .then(response => {
        dispatch({ type: ActionTypes.SET_MOST_PRODUCTIVE_LOCATIONS_IN_PROGRESS, payload: false });
        dispatch({ type: ActionTypes.SET_MOST_PRODUCTIVE_LOCATIONS, payload: response });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

// average productivity level each day for last 30 or 7 days
const setProductivityScores = id => {
  return dispatch => {
    dispatch({ type: ActionTypes.SET_PRODUCTIVITY_SCORES_IN_PROGRESS, payload: true });
    api
      .getProductivityScores(id)
      .then(response => {
        dispatch({ type: ActionTypes.SET_PRODUCTIVITY_SCORES_IN_PROGRESS, payload: false });
        dispatch({ type: ActionTypes.SET_PRODUCTIVITY_SCORES, payload: response });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

// new locations without productivity scores to be set by user
const setNewLocations = id => {
  return dispatch => {
    dispatch({ type: ActionTypes.SET_NEW_LOCATIONS_IN_PROGRESS, payload: true });
    api
      .getNewLocations(id)
      .then(response => {
        dispatch({ type: ActionTypes.SET_NEW_LOCATIONS_IN_PROGRESS, payload: false });
        dispatch({ type: ActionTypes.SET_NEW_LOCATIONS, payload: response });
      })
      .catch(error => {
        dispatch({ type: ActionTypes.API_ERROR, payload: error });
      });
  };
};

// boolean indicating if user provided permission to get background location data
const setProvidedBackgroundLocation = bool => {
  return {
    type: ActionTypes.SET_PROVIDED_BACKGROUND_LOCATION,
    payload: bool,
  };
};

export {
  setUserData,
  setFrequentLocations,
  setMostProductiveDays,
  setLeastProductiveDays,
  setMostProductiveLocations,
  setProductivityScores,
  setNewLocations,
  setProvidedBackgroundLocation,
};
