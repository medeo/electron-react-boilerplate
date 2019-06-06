// @flow
import * as React from 'react';
import { Router } from '@reach/router'
import { Provider} from 'react-redux'
import styled from 'styled-components'

const Layout = styled.div`
background: papayawhip;
color: red;
`

const HelloWorld = () => <div> hello world</div>


const App = ({ store }) =>
  <Provider store={store}>
    <Layout>
    <Router>
      <HelloWorld default/>
    </Router>
  </Layout>
  </Provider>


export default App
