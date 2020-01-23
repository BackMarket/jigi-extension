import Octokit from '@octokit/rest'

export type SearchIssuesParams = {
  maxResults?: number
}

const github = new Octokit({ auth: '' })

export async function searchIssues(
  query: string,
  { maxResults = 50 }: SearchIssuesParams = {},
) {
  return github.search.issuesAndPullRequests({ q: query, per_page: maxResults })
}
