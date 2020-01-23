import { TICKET_ADD } from '../actions'

export default (state: any = {}, action: any) => {
  switch (action.type) {
    case TICKET_ADD: {
      return {
        ...state,
        [action.id]: {
          id: action.id,
          title: action.title,
          description: action.description,
          status: action.status,
          statusColor: action.statusColor,
        },
      }
    }

    default:
      return state
  }
}
