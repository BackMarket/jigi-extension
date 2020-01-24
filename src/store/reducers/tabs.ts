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
  TAB_DELETE,
  TAB_SET_ACTIVE_TAB_INDEX,
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

export default (
  state: any = {
    tabs: {},
    activeTabIndex: 0,
  },
  action: Action,
) => {
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
      const tabs = {
        ...state.tabs,
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
      return {
        tabs,
        activeTabIndex: Object.values(tabs).length - 1,
      }
    }

    case TAB_UPDATE_SETTINGS: {
      return {
        tabs: {
          ...state.tabs,
          [payload.id]: {
            ...state.tabs[payload.id],
            title: payload.title,
          },
        },
        activeTabIndex: state.activeTabIndex,
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
        tabs: {
          ...state.tabs,
          [payload.id]: {
            ...state.tabs[payload.id],
            jiraHost: payload.jiraHost,
            jiraLogin: payload.jiraLogin,
            jiraToken: payload.jiraToken,
            jiraJqlQuery: payload.jiraJqlQuery,
            jiraClient,
          },
        },
        activeTabIndex: state.activeTabIndex,
      }
    }

    case TAB_UPDATE_GITHUB_SETTINGS: {
      let githubClient
      try {
        githubClient = createGithubClient(payload.githubToken)
      } catch {}
      return {
        tabs: {
          ...state.tabs,
          [payload.id]: {
            ...state.tabs[payload.id],
            githubToken: payload.githubToken,
            githubOrganisation: payload.githubOrganisation,
            githubRepository: payload.githubRepository,
            githubClient,
          },
        },
        activeTabIndex: state.activeTabIndex,
      }
    }

    case TAB_SET_TICKETS: {
      if (!(payload.tabId in state.tabs)) {
        return state
      }

      const tab = {
        ...state.tabs[payload.tabId],
        ticketIds: payload.ticketIds,
      }

      return {
        tabs: { ...state.tabs, [payload.tabId]: tab },
        activeTabIndex: state.activeTabIndex,
      }
    }

    case TAB_SET_ACTIVE_TAB_INDEX:
      return {
        tabs: state.tabs,
        activeTabIndex: payload,
      }

    case TAB_TOGGLE_SETTINGS:
      return {
        tabs: {
          ...state.tabs,
          [payload.id]: {
            ...state.tabs[payload.id],
            showSettings: !payload.showSettings,
          },
        },
        activeTabIndex: state.activeTabIndex,
      }

    case TAB_DELETE:
      const { [payload.id]: tabToDelete, ...restOfTabs } = state.tabs
      return {
        tabs: restOfTabs,
        activeTabIndex: Math.min(
          Object.keys(restOfTabs).length - 1,
          state.activeTabIndex,
        ),
      }

    default:
      return state
  }
}
