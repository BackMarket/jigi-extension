import { createClient as createGithubClient } from '../../common/github'
import { createClient as createJiraClient } from '../../common/jira'

import { TAB_ADD, TAB_SET_TICKETS } from '../actions'

export default (state: any = {}, action: any) => {
  const { type, payload } = action

  switch (type) {
    case TAB_ADD: {
      return {
        ...state,
        [payload.id]: {
          title: payload.title,
          githubClient: createGithubClient(payload.githubToken),
          githubOrganisation: payload.githubOrganisation,
          githubRepository: payload.githubRepository,
          jiraClient: createJiraClient(
            payload.jiraHost,
            payload.jiraLogin,
            payload.jiraToken,
          ),
          jiraJqlQuery: payload.jiraJqlQuery,
          ticketIds: [],
        },
      }
    }

    case TAB_SET_TICKETS: {
      if (!(payload.id in state)) {
        return state
      }

      const tab = {
        ...state[payload.tabId],
        ticketIds: payload.ticketIds,
      }
      return { ...state, [payload.tabId]: tab }
    }

    default:
      return state
  }
}
