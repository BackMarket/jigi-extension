import { Ticket } from '../../common/jira'

import { TICKET_ADD } from '../actions'

export type AddTicketsAction = {
  type: Symbol
  payload: Ticket
}

export type Action = AddTicketsAction

export default (state: any = {}, action: Action) => {
  const { type, payload }: Action = action

  switch (type) {
    case TICKET_ADD: {
      return {
        ...state,
        [payload.id]: payload,
      }
    }

    default:
      return state
  }
}
