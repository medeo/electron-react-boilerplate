// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';


// Import ducks file like from features:
//
// import feature from '../Feature/ducks';

const rootReducer = combineReducers({
  // feature,
  router,
});

export default rootReducer;
