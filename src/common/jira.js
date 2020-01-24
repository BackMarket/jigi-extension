import JiraClient from 'jira-connector'

const DEFAULT_MAX_RESULTS = 100
const DEFAULT_FIELDS = ['description', 'status', 'summary']

export function createClient(host, login, token) {
  return new JiraClient({
    host,
    basic_auth: {
      email: login,
      api_token: token,
    },
    strictSSL: false,
  })
}

export async function search(
  client,
  { fields = [], jql = '', maxResults } = {},
) {
  return client.search.search({ fields, jql, maxResults })
}

export async function list(client, jql = '') {
  const { issues: tickets } = await search(client, {
    fields: DEFAULT_FIELDS,
    jql,
    maxResults: DEFAULT_MAX_RESULTS,
  })

  return tickets.map(({ key, fields }) => ({
    id: key,
    description: fields.description,
    status: {
      name: fields.status.name,
      color: fields.status.statusCategory.colorName,
    },
    title: fields.summary,
  }))
}
