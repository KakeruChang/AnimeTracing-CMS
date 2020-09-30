import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter } from 'react-router-dom'

import App from './App'

ReactDom.render(
  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  //   <App />
  // </BrowserRouter>
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
