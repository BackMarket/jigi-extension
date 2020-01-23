import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { addTab, addIssues } from './store/actions'
import rootReducer from './store/reducers'
import './index.css'
import App from './components/App/App'

// TODO @amercier Remove once storage read/write is ready
// CF Slack for .dev.ts example
import {
  GITHUB_TOKEN,
  GITHUB_ORGANISATION,
  GITHUB_REPOSITORY,
  JIRA_HOST,
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
    jiraHost: JIRA_HOST,
    jiraToken: JIRA_TOKEN,
    jiraLogin: JIRA_LOGIN,
    jiraJqlQuery:
      'assignee in (currentUser()) AND sprint in openSprints() ORDER BY resolution DESC, status ASC, priority DESC, "Story point estimate" ASC',
  }),
)

store.dispatch(
  addIssues([
    {
      id: 1234,
      title: 'Implement Jigi Extension',
      state: 'open',
      body: '123iugh',
      pullRequest: {
        url: '123124',
      },
    },
  ]),
)

// -----------------------------------------------------------------------------

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
