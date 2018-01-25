/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import LaunchPadView from './LaunchPad/components';
import ScoresView from './Scores/components';
export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={LaunchPadView} />
      <Route path="/scores" component={ScoresView} />
    </Switch>
  </App>
);
