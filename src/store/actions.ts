import { Tab, Ticket } from '../../types'
import {
  AddTabAction,
  SetTabTicketsPayload,
  SetTabTicketsAction,
} from './reducers/tabs'
import { AddTicketsAction } from './reducers/tickets'

export const TAB_ADD = Symbol('Add a tab')
export const TAB_SET_TICKETS = Symbol(
  'Set the JIRA tickets of one particular Tab',
)
export const TICKET_ADD = Symbol('Add a JIRA ticket')

export const addTab = (payload: Tab): AddTabAction => ({
  type: TAB_ADD,
  payload,
})

export const setTabTickets = (
  payload: SetTabTicketsPayload,
): SetTabTicketsAction => ({
  type: TAB_SET_TICKETS,
  payload,
})

export const addTicket = (payload: Ticket): AddTicketsAction => ({
  type: TICKET_ADD,
  payload,
})
