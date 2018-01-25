import { combineReducers } from 'redux';

const allAppsId = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'receiveApps':
      return payload.apps.map(app => app.id);
    default:
      return state;
  }
};


const appById = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'receiveApps':
      return payload.apps.reduce((newState, app) => ({
        ...newState,
        [app.id]: app
      }), {});
    case 'toggleFav':
      return {
        ...state,
        [payload.id]: { ...state[payload.id], isFav: !state[payload.id].isFav }
      };
    default:
      return state;
  }
};

export default combineReducers({
  allAppsId,
  appById
});


export const getApps = (state) => (
  state.allAppsId.map(id => state.appById[id])
);

export const getFavoriteApps = (state) => (
  state.allAppsId.map(id => state.appById[id]).filter(app => app.isFav && app.isFav === true)
);

export const getActiveApps = (state) => (
  state.allAppsId.map(id => state.appById[id]).filter(app => app.isActive && app.isActive === true)
);
