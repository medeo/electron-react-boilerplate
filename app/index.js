import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { configureStore, history } from './store/configureStore';
import App from './App'
const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

render(
  <AppContainer>
    <App store={store} history={history}/>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    render(
      <AppContainer>
        <NextApp store={store}/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

store.dispatch({ type: 'hello' });
