import Octokit from '@octokit/rest'

export function createClient(token) {
  return new Octokit({
    auth: token,
  })
}

export async function searchIssues(
  client,
  { query = '', maxResults = 50 } = {},
) {
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
      pull_request = { html_url: '' },
      body,
    }) => ({
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
      pullRequest: {
        id: pull_request.html_url.split('/').pop() || '',
        url: pull_request.html_url,
      },
      body,
    }),
  )
}
