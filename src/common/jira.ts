import { Issue, SearchResult } from 'jira-connector/types/api'
import JiraClient from 'jira-connector'

export type SearchParams = {
  fields?: Array<string>
  maxResults?: number
}

export type Status = {
  name: string
  color?: string
}
export type Ticket = {
  id: string
  description?: string
  status: Status
  summary: string
}
export type List = Array<Ticket>

const jira: JiraClient = new JiraClient({
  host: '',
  basic_auth: {
    email: '',
    api_token: '',
  },
  strictSSL: false,
})

const DEFAULT_FIELDS: Array<string> = ['description', 'status', 'summary']

export async function search(
  jql: string,
  { fields = [], maxResults }: SearchParams = {},
): Promise<SearchResult> {
  return jira.search.search({ fields, jql, maxResults })
}

export async function list(jql: string, maxResults?: number): Promise<List> {
  const { issues } = await search(jql, { fields: DEFAULT_FIELDS, maxResults })

  return issues.map(
    ({ key, fields }: { key: string; fields: Issue }): Ticket => ({
      id: key,
      description: fields.description,
      status: {
        name: fields.status.name,
        color: fields.status.statusCategory.colorName,
      },
      summary: fields.summary,
    }),
  )
}
