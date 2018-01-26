/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import styled from 'styled-components';
import App from './containers/App';
const Routes = ({className}) => (
  <App className={className}>
    hello world
  </App>
);

const StyledApp = styled(Routes)`
  display: grid;
  grid-template-columns: [full-start] 5rem [main-start] 1fr [full-end];

`;
export default StyledApp;
