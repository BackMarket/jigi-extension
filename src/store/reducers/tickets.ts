import { TICKET_ADD } from '../actions'

export default (state: any = {}, action: any) => {
  const { type, payload } = action

  switch (type) {
    case TICKET_ADD: {
      return {
        ...state,
        [payload.id]: {
          id: payload.id,
          title: payload.title,
          description: payload.description,
          status: payload.status,
          statusColor: payload.statusColor,
        },
      }
    }

    default:
      return state
  }
}
