import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  // note that when adding dat.gui, strict mode will render it twice
  // make method to destroy gui whenever new one created - Mat K
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
