import { ActionTypes } from '../actions/index';

const initialState = {
  userData: {},
  providedBackgroundLocation: false,
  frequentLocations: [],
  mostProductiveDays: {},
  leastProductiveDays: {},
  mostProductiveLocations: [],
  productivityScores: {},
  newLocations: [],
};

const UserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return { ...state, userData: action.payload };

    case ActionTypes.SET_FREQUENT_LOCATIONS:
      return { ...state, frequentLocations: action.payload };

    case ActionTypes.SET_MOST_PRODUCTIVE_DAYS:
      return { ...state, mostProductiveDays: action.payload };

    case ActionTypes.SET_LEAST_PRODUCTIVE_DAYS:
      return { ...state, leastProductiveDays: action.payload };

    case ActionTypes.SET_MOST_PRODUCTIVE_LOCATIONS:
      return { ...state, mostProductiveLocations: action.payload };

    case ActionTypes.SET_PRODUCTIVITY_SCORES:
      return { ...state, productivityScores: action.payload };

    case ActionTypes.SET_NEW_LOCATIONS:
      return { ...state, newLocations: action.payload };

    case ActionTypes.SET_PROVIDED_BACKGROUND_LOCATION:
      return { ...state, providedBackgroundLocation: action.value };

    default:
      return state;
  }
};

export default UserInfoReducer;
