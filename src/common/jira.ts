import { SearchResult } from 'jira-connector/types/api'
import JiraClient from 'jira-connector'

const jira: JiraClient = new JiraClient({
  host: '',
  basic_auth: {
    email: '',
    api_token: '',
  },
  strictSSL: false,
})

const DEFAULT_FIELDS = ['description', 'status', 'summary']

export async function search(
  jql: string,
  { fields = [], maxResults = 50 } = {},
): Promise<SearchResult> {
  return jira.search.search({ fields, jql, maxResults })
}

export async function list(jql: string) {
  const { issues } = await search(jql, { fields: DEFAULT_FIELDS })

  return issues.map(({ key, fields }) => ({
    key,
    description: fields.description,
    status: {
      name: fields.status.name,
      color: fields.status.statusCategory.colorName,
    },
    summary: fields.summary,
  }))
}
