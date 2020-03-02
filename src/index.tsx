import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// When browser loads an extension, it automatically loads its background
// script, when defined in `manifest.json`. First, we create a new chunk that we
// manually name "background", so it is build as `build/js/background.js`.
// Second, we inject it manually in development mode.
if (process.env.NODE_ENV === 'development') {
  import('./background').catch(error => {
    // eslint-disable-next-line no-console
    console.error('Error while loading background script:', error)
  })
}
