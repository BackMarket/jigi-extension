import Octokit from '@octokit/rest'

import { GITHUB_TOKEN } from '../.dev'

export type SearchIssuesParams = {
  maxResults?: number
  query?: string
}

const github = new Octokit({ auth: GITHUB_TOKEN })

export function createClient(token: string): Octokit {
  return new Octokit({
    auth: token,
  })
}

export async function searchIssues(
  client: Octokit,
  { query = '', maxResults = 50 }: SearchIssuesParams = {},
) {
  return github.search.issuesAndPullRequests({ q: query, per_page: maxResults })
}
