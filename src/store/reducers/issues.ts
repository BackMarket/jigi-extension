import { ISSUES_ADD } from '../actions'
import { Issue, IssuesList } from '../../../types'

export type AddIssuesAction = {
  type: Symbol
  payload: IssuesList
}

export type Action = AddIssuesAction

export default (state: any = {}, action: any) => {
  const { type, payload } = action

  switch (type) {
    case ISSUES_ADD: {
      const issues = payload.reduce(
        (acc: Issue, item: Issue) => ({
          ...acc,
          [item.id]: item,
        }),
        {},
      )
      return {
        ...state,
        issues,
      }
    }

    default:
      return state
  }
}
