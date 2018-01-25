import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import AppTile from '../components/AppListItem';
import * as fromReducers from '../ducks';
import * as fromActions from '../actions';

const ActiveAppsList = ({ apps, className, onClick }) => (
  <ul className={className}>
    {apps.map(app => (<li key={app.id}><AppTile app={app} onClick={onClick}/></li>))}
  </ul>
);

ActiveAppsList.defaultProps = {
  apps: [],
  onClick: () => {
  }
};

const mapStateToProps = (state) => ({
  apps: fromReducers.getActiveApps(state.launchpad)
});
const mapDispatchToProps = (dispatch) => ({
  onClick: (id) => dispatch(fromActions.toggleFav(id))
});

const StyledActiveAppsList = styled(ActiveAppsList)`
  display: contents;
  list-style: none;
  padding: 0;
  & > li {
    list-style: none;
  }
  
`

export default connect(mapStateToProps, mapDispatchToProps)(StyledActiveAppsList);
