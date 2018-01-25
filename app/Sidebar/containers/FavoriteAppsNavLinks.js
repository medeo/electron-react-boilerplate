import React from 'react';
import { connect } from 'react-redux';
import * as fromReducers from '../../LaunchPad/ducks';
import AppNavLink from '../components/AppNavLink';


const FavoriteAppsNavLinks = ({ apps }) => (
  <nav>
    {apps.map(app => (<AppNavLink key={app.id} to={app.uri} name={app.name} />))}
  </nav>
);

FavoriteAppsNavLinks.defaultProps = {
  apps: []
};

const mapStateToProps = (state) => ({
  apps: fromReducers.getFavoriteApps(state.launchpad)
});

export default connect(mapStateToProps)(FavoriteAppsNavLinks);
