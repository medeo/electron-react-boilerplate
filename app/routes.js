/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';
import App from './containers/App';
import LaunchPadView from './LaunchPad/components';
import SideBarView from './Sidebar/components';
import ScoresView from './Scores/components';


const Routes = ({className}) => (
  <App className={className}>
    <aside>
      <Switch>
        <Route exact path="/" render={() => ('')} />
        <Route path="/" component={SideBarView} />
      </Switch>
    </aside>
    <main>
      <Switch>
        <Route exact path="/" component={LaunchPadView} />
        <Route path="/" component={ScoresView} />
      </Switch>
    </main>
  </App>
);

const StyledApp = styled(Routes)`
  display: grid;
  grid-template-columns: [full-start] 5rem [main-start] 1fr [full-end];

`;
export default StyledApp;
