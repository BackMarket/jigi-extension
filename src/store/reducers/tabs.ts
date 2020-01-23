import { TAB_ADD, TAB_SET_TICKETS } from '../actions'

export default (state: any = {}, action: any) => {
  switch (action.type) {
    case TAB_ADD: {
      return {
        ...state,
        [action.id]: {
          title: action.title,
          githubToken: action.githubToken,
          githubOrganisation: action.githubOrganisation,
          githubRepository: action.githubRepository,
          jiraToken: action.jiraToken,
          jiraLogin: action.jiraLogin,
          jiraJqlQuery: action.jiraJqlQuery,
          ticketIds: [],
        },
      }
    }

    case TAB_SET_TICKETS: {
      if (!(action.id in state)) {
        return state
      }

      const tab = {
        ...state[action.tabId],
        ticketIds: action.ticketIds,
      }
      return { ...state, [action.tabId]: tab }
    }

    default:
      return state
  }
}
