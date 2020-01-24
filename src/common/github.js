import Octokit from '@octokit/rest'

export function createClient(token) {
  return new Octokit({
    auth: token,
  })
}

export async function searchIssues(
  client,
  owner,
  repo,
  { query = '', maxResults = 50 } = {},
) {
  const {
    data: { items: issues },
  } = await client.search.issuesAndPullRequests({
    q: query,
    per_page: maxResults,
  })

  return await Promise.all(
    issues.map(
      async ({
        id,
        title,
        user,
        labels,
        state,
        assignee,
        pull_request = { html_url: '' },
        body,
      }) => {
        const pullRequestId =
          pull_request.html_url.split('/').pop() || undefined
        const pullRequest = pullRequestId
          ? await getPullRequest(client, owner, repo, pullRequestId)
          : {}

        return {
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
            id: pullRequestId,
            url: pull_request.html_url,
            state: pullRequest.state,
            title: pullRequest.title,
            user: pullRequest.user,
            body: pullRequest.body,
            labels: pullRequest.labels,
            merged: pullRequest.merged,
            mergeable: pullRequest.mergeable,
            mergeableState: pullRequest.mergeable_state,
          },
          body,
        }
      },
    ),
  )
}

export async function getPullRequest(client, owner, repo, pullRequestId) {
  const { data: pullRequest } = await client.pulls.get({
    owner,
    repo,
    pull_number: pullRequestId,
  })

  return pullRequest
}
