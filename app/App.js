// @flow
import * as React from 'react';
import { Router } from '@reach/router'
import { Provider} from 'react-redux'

const HelloWorld = () => <div> hello world</div>
const App = ({ store }) =>
  <Provider store={store}>

  <Router>
    <HelloWorld default/>
  </Router>
  </Provider>


export default App
