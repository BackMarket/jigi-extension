import Octokit from '@octokit/rest'

import { GITHUB_TOKEN } from '../.dev'

export type SearchIssuesParams = {
  maxResults?: number
}

const github = new Octokit({ auth: GITHUB_TOKEN })

export async function searchIssues(
  query: string,
  { maxResults = 50 }: SearchIssuesParams = {},
) {
  return github.search.issuesAndPullRequests({ q: query, per_page: maxResults })
}
