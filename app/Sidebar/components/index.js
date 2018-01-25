import React from 'react';
import styled from 'styled-components';
import { getHsl } from '@medeo/utils';
import AppNavLink from './AppNavLink';
import FavoriteAppsNavLinks from '../containers/FavoriteAppsNavLinks';

const SideBar = ({ className }) => (
  <div className={className}>
    <main>
      <FavoriteAppsNavLinks/>
    </main>
    <footer>
      <AppNavLink to="/" icon='fa-th-large' name={'Launchpad'}/>
    </footer>
  </div>
);

export default styled(SideBar)`
  border-right: 1px solid ${getHsl(undefined, 80)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${getHsl(undefined, 90)};
  main {
    display: flex;
    grid-row-start: main-start;
    grid-row-end: full-end;
    grid-column: full-start;
  }
`;
