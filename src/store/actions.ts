import { Tab, Ticket, IssuesList } from '../../types'
import { SetTabTicketsPayload } from './reducers/tabs'

export const TAB_ADD = Symbol('Add an existing tab')
export const TAB_SET_TICKETS = Symbol('Set JIRA tickets of one particular Tab')
export const TAB_SHOW_SETTINGS = Symbol('Show a tab settings')
export const TAB_HIDE_SETTINGS = Symbol('Hide a tab settings')
export const TAB_SAVE_SETTINGS = Symbol('Save tab settings to storage')

export const TICKET_ADD = Symbol('Add a JIRA ticket')

export const ISSUES_ADD = Symbol('Add a github issue')

export const TAB_SET = Symbol('Set active tab')

export const addTab = (payload: Tab): any => ({
  type: TAB_ADD,
  payload,
})

export const showTabSettings = (payload: Tab): any => ({
  type: TAB_SHOW_SETTINGS,
  payload,
})

export const setTabTickets = (payload: SetTabTicketsPayload): any => ({
  type: TAB_SET_TICKETS,
  payload,
})

export const hideTabSettings = (payload: Tab): any => ({
  type: TAB_HIDE_SETTINGS,
  payload,
})

export const saveTabSettings = (payload: Tab): any => ({
  type: TAB_SAVE_SETTINGS,
  payload,
})

export const addTicket = (payload: Ticket): any => ({
  type: TICKET_ADD,
  payload,
})

export const addIssues = (payload: IssuesList): any => ({
  type: ISSUES_ADD,
  payload,
})

export const setTab = (id: string): any => ({
  type: TAB_SET,
  id,
})
