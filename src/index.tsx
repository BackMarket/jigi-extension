import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { addTab, setTabTickets, addTicket } from './store/actions'
import rootReducer from './store/reducers'
import './index.css'
import App from './components/App/App'

// TODO @amercier Remove once storage read/write is ready
// CF Slack for .dev.ts example
import {
  GITHUB_TOKEN,
  GITHUB_ORGANISATION,
  GITHUB_REPOSITORY,
  JIRA_TOKEN,
  JIRA_LOGIN,
} from './.dev'

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
)

// -----------------------------------------------------------------------------
// TODO @amercier Implement storage read/write

store.dispatch(
  addTab({
    id: 'acc0dade-d301-4b4b-afd8-8c80d647b2f0',
    title: 'My Sprint',
    githubToken: GITHUB_TOKEN,
    githubOrganisation: GITHUB_ORGANISATION,
    githubRepository: GITHUB_REPOSITORY,
    jiraToken: JIRA_TOKEN,
    jiraLogin: JIRA_LOGIN,
    jiraJqlQuery:
      'assignee in (currentUser()) AND sprint in openSprints() ORDER BY resolution DESC, status ASC, priority DESC, "Story point estimate" ASC',
  }),
)

store.dispatch(
  addTicket({
    id: '9ecfa55b-0970-43a3-975b-dc3c7351893e',
    title: 'Implement Jigi Extension',
    description: '',
    status: 'Running',
    statusColor: 'blue',
  }),
)

store.dispatch(
  addTicket({
    id: 'b2d30294-563e-49e4-a70e-499e366e85fd',
    title: 'Drink Champagne',
    description: '',
    status: 'To Do',
    statusColor: 'grey',
  }),
)

store.dispatch(
  addTicket({
    id: '487ba5e0-f9c2-4f30-87b4-8992b243c8d2',
    title: 'Jigi Extension Brainstorming',
    description: '',
    status: 'Done',
    statusColor: 'green',
  }),
)

store.dispatch(
  setTabTickets({
    tabId: '6317a39d-b788-40ad-9646-b8162009d73a',
    ticketIds: [
      '9ecfa55b-0970-43a3-975b-dc3c7351893e',
      'b2d30294-563e-49e4-a70e-499e366e85fd',
      '487ba5e0-f9c2-4f30-87b4-8992b243c8d2',
    ],
  }),
)

// -----------------------------------------------------------------------------

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
