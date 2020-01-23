export type Status = {
  name: string
  color?: string
}

export type Ticket = {
  id: string
  description?: string | null
  status: Status
  title: string
}

export type List = Array<Ticket>

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
}
