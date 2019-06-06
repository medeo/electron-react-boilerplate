// @flow
import { combineReducers } from 'redux';


// Import ducks file like from features:
//
// import feature from '../Feature/ducks';

const rootReducer = combineReducers({
  // feature,
  feature: (state = null) => state
});

export default rootReducer;
