import { Tab } from '../../../types'
import { createClient as createGithubClient } from '../../common/github'
import { createClient as createJiraClient } from '../../common/jira'

import {
  TAB_ADD,
  TAB_UPDATE_SETTINGS,
  TAB_UPDATE_JIRA_SETTINGS,
  TAB_UPDATE_GITHUB_SETTINGS,
  TAB_SET_TICKETS,
  TAB_TOGGLE_SETTINGS,
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
    case TAB_ADD: {
      let githubClient
      try {
        githubClient = createGithubClient(payload.githubToken)
      } catch {}
      let jiraClient
      try {
        jiraClient = createJiraClient(
          payload.jiraHost,
          payload.jiraLogin,
          payload.jiraToken,
        )
      } catch {}
      return {
        ...state,
        [payload.id]: {
          id: payload.id,
          title: payload.title,
          githubToken: payload.githubToken,
          githubOrganisation: payload.githubOrganisation,
          githubRepository: payload.githubRepository,
          githubClient,
          jiraHost: payload.jiraHost,
          jiraLogin: payload.jiraLogin,
          jiraToken: payload.jiraToken,
          jiraJqlQuery: payload.jiraJqlQuery,
          jiraClient,
          ticketIds: [],
          showSettings: payload.showSettings,
        },
      }
    }

    case TAB_UPDATE_SETTINGS: {
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          title: payload.title,
        },
      }
    }

    case TAB_UPDATE_JIRA_SETTINGS: {
      let jiraClient
      try {
        jiraClient = createJiraClient(
          payload.jiraHost,
          payload.jiraLogin,
          payload.jiraToken,
        )
      } catch {}
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          jiraHost: payload.jiraHost,
          jiraLogin: payload.jiraLogin,
          jiraToken: payload.jiraToken,
          jiraJqlQuery: payload.jiraJqlQuery,
          jiraClient,
        },
      }
    }

    case TAB_UPDATE_GITHUB_SETTINGS: {
      let githubClient
      try {
        githubClient = createGithubClient(payload.githubToken)
      } catch {}
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          githubToken: payload.githubToken,
          githubOrganisation: payload.githubOrganisation,
          githubRepository: payload.githubRepository,
          githubClient,
        },
      }
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

    case TAB_TOGGLE_SETTINGS:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          showSettings: !payload.showSettings,
        },
      }

    default:
      return state
  }
}
