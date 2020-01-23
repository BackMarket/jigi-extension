import { Issue, IssuesList } from '../../types'

import Octokit from '@octokit/rest'

export type SearchIssuesParams = {
  maxResults?: number
  query?: string
}

export function createClient(token: string): Octokit {
  return new Octokit({
    auth: token,
  })
}

export async function searchIssues(
  client: Octokit,
  { query = '', maxResults = 50 }: SearchIssuesParams = {},
): Promise<IssuesList> {
  const {
    data: { items: issues },
  } = await client.search.issuesAndPullRequests({
    q: query,
    per_page: maxResults,
  })

  return issues.map(
    ({
      id,
      title,
      user,
      labels,
      state,
      assignee,
      pull_request,
      body,
    }): Issue => ({
      id,
      title,
      user: {
        id: user.id,
        login: user.login,
        avatar: user.avatar_url,
        url: user.html_url,
      },
      labels,
      state,
      assignee,
      pullRequest: { url: pull_request.html_url },
      body,
    }),
  )
}
