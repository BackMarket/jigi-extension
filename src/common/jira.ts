import { Issue, SearchResult } from 'jira-connector/types/api'
import { TicketsList, Ticket } from '../../types'

import JiraClient from 'jira-connector'

export type SearchParams = {
  fields?: Array<string>
  jql?: string
  maxResults?: number
}

const DEFAULT_MAX_RESULTS = 100
const DEFAULT_FIELDS: Array<string> = ['description', 'status', 'summary']

export function createClient(
  host: string,
  login: string,
  token: string,
): JiraClient {
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
  client: JiraClient,
  { fields = [], jql = '', maxResults }: SearchParams = {},
): Promise<SearchResult> {
  return client.search.search({ fields, jql, maxResults })
}

export async function list(
  client: JiraClient,
  jql: string = '',
): Promise<TicketsList> {
  const { issues: tickets } = await search(client, {
    fields: DEFAULT_FIELDS,
    jql,
    maxResults: DEFAULT_MAX_RESULTS,
  })

  return tickets.map(
    ({ key, fields }: { key: string; fields: Issue }): Ticket => ({
      id: key,
      description: fields.description,
      status: {
        name: fields.status.name,
        color: fields.status.statusCategory.colorName,
      },
      title: fields.summary,
    }),
  )
}
