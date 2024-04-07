import { ActionTypes } from '../actions/index';

const initialState = {
  error: {},
  setUserDataInProgress: false,
  setFrequentLocationsInProgress: false,
  setMostProductiveDaysInProgress: false,
  setLeastProductiveDaysInProgress: false,
  setMostProductiveLocationsInProgress: false,
  setProductivityScoresInProgress: false,
  setNewLocationsInProgress: false,
};

const APIReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.API_ERROR:
      return { ...state, error: action.payload };

    case ActionTypes.SET_USER_DATA_IN_PROGRESS:
      return { ...state, setUserDataInProgress: action.payload };

    case ActionTypes.SET_FREQUENT_LOCATIONS_IN_PROGRESS:
      return { ...state, setFrequentLocationsInProgress: action.payload };

    case ActionTypes.SET_MOST_PRODUCTIVE_DAYS_IN_PROGRESS:
      return { ...state, setMostProductiveDaysInProgress: action.payload };

    case ActionTypes.SET_LEAST_PRODUCTIVE_DAYS_IN_PROGRESS:
      return { ...state, setLeastProductiveDaysInProgress: action.payload };

    case ActionTypes.SET_MOST_PRODUCTIVE_LOCATIONS_IN_PROGRESS:
      return { ...state, setMostProductiveLocationsInProgress: action.payload };

    case ActionTypes.SET_PRODUCTIVITY_SCORES_IN_PROGRESS:
      return { ...state, setProductivityScoresInProgress: action.payload };

    case ActionTypes.SET_NEW_LOCATIONS_IN_PROGRESS:
      return { ...state, setNewLocationsInProgress: action.payload };

    default:
      return state;
  }
};

export default APIReducer;
