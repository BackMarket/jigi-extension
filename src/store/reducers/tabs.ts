import { Tab } from '../../../types'
import { createClient as createGithubClient } from '../../common/github'
import { createClient as createJiraClient } from '../../common/jira'

import { TAB_ADD, TAB_SHOW_SETTINGS } from '../actions'

export type AddTabAction = {
  type: Symbol
  payload: Tab
}

export type Action = any

export default (state: any = {}, action: Action) => {
  const { type, payload }: Action = action

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
          showSettings: false,
        },
      }
    }

    case TAB_SHOW_SETTINGS:
      return {
        ...state,
        [payload]: {
          ...state[payload],
          showSettings: true,
        },
      }

    default:
      return state
  }
}
