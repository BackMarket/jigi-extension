import { Tab } from '../../../types'
import { createClient as createGithubClient } from '../../common/github'
import { createClient as createJiraClient } from '../../common/jira'

import {
  TAB_ADD,
  TAB_SET_TICKETS,
  TAB_SHOW_SETTINGS,
  TAB_HIDE_SETTINGS,
  TAB_SAVE_SETTINGS,
} from '../actions'

export type AddTabAction = {
  type: Symbol
  payload: Tab
}

export type SetTabTicketsPayload = {
  tabId: string
  ticketIds: Array<string>
}

export type SetTabTicketsAction = {
  type: Symbol
  payload: SetTabTicketsPayload
}

export type Action = any

export default (state: any = {}, action: Action) => {
  const { type, payload }: Action = action

  switch (type) {
    case TAB_ADD:
    case TAB_SAVE_SETTINGS:
      return {
        ...state,
        [payload.id]: {
          id: payload.id,
          title: payload.title,
          githubClient: createGithubClient(payload.githubToken),
          githubToken: payload.githubToken,
          githubOrganisation: payload.githubOrganisation,
          githubRepository: payload.githubRepository,
          jiraClient: createJiraClient(
            payload.jiraHost,
            payload.jiraLogin,
            payload.jiraToken,
          ),
          jiraHost: payload.jiraHost,
          jiraLogin: payload.jiraLogin,
          jiraToken: payload.jiraToken,
          jiraJqlQuery: payload.jiraJqlQuery,
          ticketIds: [],
          showSettings: false,
        },
      }

    case TAB_SET_TICKETS: {
      if (!(payload.tabId in state)) {
        return state
      }

      const tab = {
        ...state[payload.tabId],
        ticketIds: payload.ticketIds,
      }

      return { ...state, [payload.tabId]: tab }
    }

    case TAB_SHOW_SETTINGS:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          showSettings: true,
        },
      }

    case TAB_HIDE_SETTINGS:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          showSettings: false,
        },
      }

    default:
      return state
  }
}
