// @flow
import * as React from 'react';
import { Router } from '@reach/router'
import { Provider} from 'react-redux'
import styled from 'styled-components'
import Serialport from 'serialport'

const Layout = styled.div`
background: papayawhip;
color: red;
`

Serialport.list().then(ports => {
  console.log(ports)
})

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
