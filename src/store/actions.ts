import { Ticket } from '../common/jira'

export const TAB_ADD = Symbol('Add a tab')
export const TAB_SET_TICKETS = Symbol(
  'Set the JIRA tickets of one particular Tab',
)
export const TICKET_ADD = Symbol('Add a JIRA ticket')

export type AddTabPayload = {
  id: string
  title: string
  githubToken: string
  githubOrganisation: string
  githubRepository: string
  jiraHost: string
  jiraToken: string
  jiraLogin: string
  jiraJqlQuery: string
}

export const addTab = ({
  id,
  title,
  githubToken,
  githubOrganisation,
  githubRepository,
  jiraHost,
  jiraToken,
  jiraLogin,
  jiraJqlQuery,
}: AddTabPayload) => ({
  type: TAB_ADD,
  payload: {
    id,
    title,
    githubToken,
    githubOrganisation,
    githubRepository,
    jiraHost,
    jiraToken,
    jiraLogin,
    jiraJqlQuery,
  },
})

export type SetTabTicketsPayload = {
  tabId: string
  ticketIds: string[]
}

export const setTabTickets = ({ tabId, ticketIds }: SetTabTicketsPayload) => ({
  type: TAB_SET_TICKETS,
  payload: {
    tabId,
    ticketIds,
  },
})

export const addTicket = ({ id, title, description, status }: Ticket) => ({
  type: TICKET_ADD,
  payload: {
    id,
    title,
    description,
    status,
  },
})
