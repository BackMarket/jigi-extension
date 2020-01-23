import { Tab, Ticket, IssuesList } from '../../types'
import { SetTabTicketsPayload } from './reducers/tabs'

export const TAB_ADD = Symbol('Add a tab')
export const TAB_SET_TICKETS = Symbol(
  'Set the JIRA tickets of one particular Tab',
)
export const TAB_SHOW_SETTINGS = Symbol('Show a tab settings')

export const TICKET_ADD = Symbol('Add a JIRA ticket')

export const ISSUES_ADD = Symbol('Add a github issue')

export const TAB_SET = Symbol('Set active tab')

export const addTab = (payload: Omit<Tab, 'showSettings'>): any => ({
  type: TAB_ADD,
  payload,
})

export const showTabSettings = (payload: string): any => ({
  type: TAB_SHOW_SETTINGS,
  payload,
})

export const setTabTickets = (payload: SetTabTicketsPayload): any => ({
  type: TAB_SET_TICKETS,
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
