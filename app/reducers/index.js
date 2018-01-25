// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import launchpad from '../LaunchPad/ducks';

const rootReducer = combineReducers({
  launchpad,
  router,
});

export default rootReducer;
