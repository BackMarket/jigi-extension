import Octokit from '@octokit/rest'

const github = new Octokit({ auth: '' })

export async function searchIssues(query: string, { maxResults = 50 } = {}) {
  return github.search.issuesAndPullRequests({ q: query, per_page: maxResults })
}
