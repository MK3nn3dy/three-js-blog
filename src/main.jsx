import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './reduxStore/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  // note that when adding dat.gui, strict mode will render it twice
  // make method to destroy gui whenever new one created - Mat K
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
)
