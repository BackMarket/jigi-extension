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
  jiraToken,
  jiraLogin,
  jiraJqlQuery,
}: AddTabPayload) => ({
  type: TAB_ADD,
  id,
  title,
  githubToken,
  githubOrganisation,
  githubRepository,
  jiraToken,
  jiraLogin,
  jiraJqlQuery,
})

export type SetTabTicketsPayload = {
  tabId: string
  ticketIds: string[]
}

export const setTabTickets = ({ tabId, ticketIds }: SetTabTicketsPayload) => ({
  type: TAB_SET_TICKETS,
  tabId,
  ticketIds,
})

export type AddTicketPayload = {
  id: string
  title: string
  description: string
  status: string
  statusColor: string
}

export const addTicket = ({
  id,
  title,
  description,
  status,
  statusColor,
}: AddTicketPayload) => ({
  type: TICKET_ADD,
  id,
  title,
  description,
  status,
  statusColor,
})
