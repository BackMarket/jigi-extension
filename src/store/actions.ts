import { Tab, Ticket, IssuesList } from '../../types'

export const TAB_ADD = Symbol('Add a tab')
export const TAB_SET_TICKETS = Symbol(
  'Set the JIRA tickets of one particular Tab',
)
export const TICKET_ADD = Symbol('Add a JIRA ticket')

export const ISSUES_ADD = Symbol('Add a github issue')

export const addTab = (payload: Tab): any => ({
  type: TAB_ADD,
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
