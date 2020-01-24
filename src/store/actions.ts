import uuidv4 from 'uuid/v4'
import { Tab, Ticket, IssuesList } from '../../types'
import { SetTabTicketsPayload } from './reducers/tabs'

import {
  GITHUB_TOKEN,
  GITHUB_ORGANISATION,
  GITHUB_REPOSITORY,
  JIRA_HOST,
  JIRA_TOKEN,
  JIRA_LOGIN,
} from '../.dev'

export const TAB_ADD = Symbol('Add an existing tab')
export const TAB_SET_TICKETS = Symbol('Set JIRA tickets of one particular Tab')
export const TAB_UPDATE_SETTINGS = Symbol('Update tab settings')
export const TAB_UPDATE_JIRA_SETTINGS = Symbol('Update tab JIRA settings')
export const TAB_UPDATE_GITHUB_SETTINGS = Symbol('Update tab GitHub settings')
export const TAB_TOGGLE_SETTINGS = Symbol('Show/hide a tab settings')

export const TICKET_ADD = Symbol('Add a JIRA ticket')

export const ISSUES_ADD = Symbol('Add a github issue')

export const TAB_SET = Symbol('Set active tab')

export const createNewTab = (): any => {
  console.log('TAB_ADD (new)')
  return {
    type: TAB_ADD,
    payload: {
      id: uuidv4(),
      title: 'My Sprint',
      githubToken: GITHUB_TOKEN,
      githubOrganisation: GITHUB_ORGANISATION,
      githubRepository: GITHUB_REPOSITORY,
      jiraHost: JIRA_HOST,
      jiraToken: JIRA_TOKEN,
      jiraLogin: JIRA_LOGIN,
      jiraJqlQuery:
        'assignee in (currentUser()) AND sprint in openSprints() AND sprint NOT in futureSprints() ORDER BY resolution DESC, status ASC, priority DESC, "Story point estimate" ASC',
      showSettings: false,
    },
  }
}

export const addTab = (payload: Tab): any => {
  console.info('TAB_ADD', payload)
  return {
    type: TAB_ADD,
    payload,
  }
}

export const toggleTabSettings = (payload: Tab): any => {
  console.info('TAB_TOGGLE_SETTINGS', payload)
  return {
    type: TAB_TOGGLE_SETTINGS,
    payload,
  }
}

export const updateTabSettings = (payload: any): any => {
  console.info('TAB_UPDATE_SETTINGS', payload)
  return {
    type: TAB_UPDATE_SETTINGS,
    payload,
  }
}

export const updateTabJiraSettings = (payload: any): any => {
  console.info('TAB_UPDATE_JIRA_SETTINGS', payload)
  return {
    type: TAB_UPDATE_JIRA_SETTINGS,
    payload,
  }
}

export const updateTabGithubSettings = (payload: any): any => {
  console.info('TAB_UPDATE_GITHUB_SETTINGS', payload)
  return {
    type: TAB_UPDATE_GITHUB_SETTINGS,
    payload,
  }
}

export const setTabTickets = (payload: SetTabTicketsPayload): any => {
  console.info('TAB_SET_TICKETS', payload)
  return {
    type: TAB_SET_TICKETS,
    payload,
  }
}

export const addTicket = (payload: Ticket): any => {
  // console.info('TICKET_ADD', payload)
  return {
    type: TICKET_ADD,
    payload,
  }
}

export const addIssues = (payload: IssuesList): any => {
  // console.info('ISSUES_ADD', payload)
  return {
    type: ISSUES_ADD,
    payload,
  }
}

export const setTab = (id: string): any => {
  console.info('TAB_SET', id)
  return {
    type: TAB_SET,
    id,
  }
}
