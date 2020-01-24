import uuidv4 from 'uuid/v4'
import { Tab, Ticket, IssuesList } from '../../types'
import { SetTabTicketsPayload } from './reducers/tabs'

export const TAB_ADD = Symbol('Add an existing tab')
export const TAB_SET_TICKETS = Symbol('Set JIRA tickets of one particular Tab')
export const TAB_UPDATE_SETTINGS = Symbol('Update tab settings')
export const TAB_UPDATE_JIRA_SETTINGS = Symbol('Update tab JIRA settings')
export const TAB_UPDATE_GITHUB_SETTINGS = Symbol('Update tab GitHub settings')
export const TAB_TOGGLE_SETTINGS = Symbol('Show/hide a tab settings')
export const TAB_DELETE = Symbol('Delete a tab')

export const TICKET_ADD = Symbol('Add a JIRA ticket')

export const ISSUES_ADD = Symbol('Add a github issue')

export const TAB_SET_ACTIVE_TAB_INDEX = Symbol('Set active tab')

export const createNewTab = (): any => {
  return {
    type: TAB_ADD,
    payload: {
      id: uuidv4(),
      title: '',
      githubToken: '',
      githubOrganisation: '',
      githubRepository: '',
      jiraHost: '',
      jiraToken: '',
      jiraLogin: '',
      jiraJqlQuery:
        'assignee in (currentUser()) AND sprint in openSprints() AND sprint NOT in futureSprints() ORDER BY resolution DESC, status ASC, priority DESC, "Story point estimate" ASC',
      showSettings: true,
    },
  }
}

export const addTab = (payload: Tab): any => {
  return {
    type: TAB_ADD,
    payload,
  }
}

export const toggleTabSettings = (payload: Tab): any => {
  return {
    type: TAB_TOGGLE_SETTINGS,
    payload,
  }
}

export const updateTabSettings = (payload: any): any => {
  return {
    type: TAB_UPDATE_SETTINGS,
    payload,
  }
}

export const updateTabJiraSettings = (payload: any): any => {
  return {
    type: TAB_UPDATE_JIRA_SETTINGS,
    payload,
  }
}

export const updateTabGithubSettings = (payload: any): any => {
  return {
    type: TAB_UPDATE_GITHUB_SETTINGS,
    payload,
  }
}

export const setTabTickets = (payload: SetTabTicketsPayload): any => {
  return {
    type: TAB_SET_TICKETS,
    payload,
  }
}

export const addTicket = (payload: Ticket): any => {
  return {
    type: TICKET_ADD,
    payload,
  }
}

export const addIssues = (payload: IssuesList): any => {
  return {
    type: ISSUES_ADD,
    payload,
  }
}

export const setActiveTabIndex = (payload: number): any => {
  return {
    type: TAB_SET_ACTIVE_TAB_INDEX,
    payload,
  }
}

export const deleteTab = (payload: Tab): any => {
  return {
    type: TAB_DELETE,
    payload,
  }
}
