import React, { useState, useEffect } from 'react'
import debounce from 'debounce'
import { createStyles, makeStyles, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import { Tab } from '../../types'
import { saveTab } from '../common/storage'
import {
  updateTabSettings,
  updateTabJiraSettings,
  updateTabGithubSettings,
} from '../store/actions'

type SettingsProps = {
  tab: Tab
  updateTabSettings: Function
  updateTabJiraSettings: Function
  updateTabGithubSettings: Function
}

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      padding: '2rem',
    },
    field: {
      marginBottom: '1rem',
    },
    fields: {
      marginBottom: '2rem',
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    action: {
      marginLeft: '1rem',
    },
  }),
)

function Settings({
  tab,
  updateTabSettings,
  updateTabJiraSettings,
  updateTabGithubSettings,
}: SettingsProps) {
  const { id } = tab
  const classes = useStyles()
  const [title, setTitle] = useState(tab.title)
  const [jiraHost, setJiraHost] = useState(tab.jiraHost)
  const [jiraLogin, setJiraLogin] = useState(tab.jiraLogin)
  const [jiraToken, setJiraToken] = useState(tab.jiraToken)
  const [jiraJqlQuery, setJiraJqlQuery] = useState(tab.jiraJqlQuery)
  const [githubOrganisation, setGithubOrganisation] = useState(
    tab.githubOrganisation,
  )
  const [githubRepository, setGithubRepository] = useState(tab.githubRepository)
  const [githubToken, setGithubToken] = useState(tab.githubToken)

  useEffect(() => {
    updateTabSettings({
      id,
      title,
    })
  }, [id, title, updateTabSettings])

  useEffect(
    debounce(() => {
      updateTabJiraSettings({
        id,
        jiraHost,
        jiraLogin,
        jiraToken,
        jiraJqlQuery,
      })
    }, 1000),
    [jiraHost, jiraLogin, jiraToken, jiraJqlQuery],
  )

  useEffect(
    debounce(() => {
      updateTabGithubSettings({
        id,
        githubOrganisation,
        githubRepository,
        githubToken,
      })
    }, 500),
    [githubOrganisation, githubRepository, githubToken],
  )

  useEffect(
    debounce(() => {
      saveTab({
        id,
        title,
        jiraHost,
        jiraLogin,
        jiraToken,
        jiraJqlQuery,
        githubOrganisation,
        githubRepository,
        githubToken,
      })
    }, 200),
    [
      title,
      jiraHost,
      jiraLogin,
      jiraToken,
      jiraJqlQuery,
      githubOrganisation,
      githubRepository,
      githubToken,
    ],
  )

  return (
    <form
      className={classes.form}
      autoComplete="off"
      onSubmit={event => {
        event.preventDefault()
      }}
    >
      <div className={classes.fields}>
        <TextField
          className={classes.field}
          id="title"
          label="Title"
          placeholder="Give a name to your tab..."
          value={title}
          onChange={event => setTitle(event.target.value)}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraHost"
          label="JIRA domain"
          placeholder="Ex: mycompany.atlassian.net"
          value={jiraHost}
          onChange={event => setJiraHost(event.target.value)}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraLogin"
          label="JIRA login"
          placeholder="E-mail address"
          value={jiraLogin}
          onChange={event => setJiraLogin(event.target.value)}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraToken"
          label="JIRA token"
          value={jiraToken}
          onChange={event => setJiraToken(event.target.value)}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraJqlQuery"
          label="JIRA JQL Query"
          value={jiraJqlQuery}
          onChange={event => setJiraJqlQuery(event.target.value)}
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubOrganisation"
          label="GitHub organization or username"
          value={githubOrganisation}
          onChange={event => setGithubOrganisation(event.target.value)}
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubRepository"
          label="GitHub repository"
          value={githubRepository}
          onChange={event => setGithubRepository(event.target.value)}
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubToken"
          label="GitHub token"
          value={githubToken}
          onChange={event => setGithubToken(event.target.value)}
          required
          fullWidth
          multiline
        />
      </div>
    </form>
  )
}

export default connect(null, dispatch => ({
  updateTabSettings: (tab: Tab) => dispatch(updateTabSettings(tab)),
  updateTabJiraSettings: (tab: Tab) => dispatch(updateTabJiraSettings(tab)),
  updateTabGithubSettings: (tab: Tab) => dispatch(updateTabGithubSettings(tab)),
}))(Settings)
