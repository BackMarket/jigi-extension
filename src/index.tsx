import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/reducers'
import './index.css'
import App from './components/App'
import { createClient, search } from './common/jira'

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

console.log('Test')
const client = createClient(
  'backmarket.atlassian.net',
  'clement.prevot@backmarket.com',
  'vSv7Ov4OahKPUanhjWsG8D08',
)
search(client, {
  jql:
    'assignee in (currentUser()) AND sprint in openSprints() AND sprint NOT in futureSprints() ORDER BY resolution DESC, status ASC, priority DESC, "Story point estimate" ASC',
}).then(console.log)
