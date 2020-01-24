export type Status = {
  name: string
  color?: string
}

export type Ticket = {
  id: string
  description?: string | null
  status: Status
  title: string
  issues?: IssuesList
}

export type TicketsList = Array<Ticket>

export type Tab = {
  id: string
  title: string
  githubToken: string
  githubOrganisation: string
  githubRepository: string
  jiraHost: string
  jiraToken: string
  jiraLogin: string
  jiraJqlQuery: string
  showSettings: boolean
}

export type GithubLabel = {
  id: number
  name: string
  color: string
}

export type GithubUser = {
  id: number
  login: string
  avatar?: string
  url?: string
}

export type Issue = {
  id: number
  title: string
  user?: GithubUser
  labels?: Array<GithubLabel>
  state: string
  assignee?: string | null
  pullRequest?: {
    id: string
    url?: string | null
  }
  body: string
}

export type IssuesList = Array<Issue>
