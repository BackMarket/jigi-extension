import React, { useState } from 'react'
import { createStyles, makeStyles, Button, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import { hideTabSettings, addTab } from '../store/actions'
import { Tab } from '../../types'

type SettingsProps = {
  tab: Tab
  handleSubmit: Function
  handleCancel: Function
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

function Settings({ tab, handleSubmit, handleCancel }: SettingsProps) {
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

  return (
    <form
      className={classes.form}
      autoComplete="off"
      onSubmit={event =>
        handleSubmit(event, tab, {
          title,
          jiraHost,
          jiraLogin,
          jiraToken,
          jiraJqlQuery,
          githubOrganisation,
          githubRepository,
          githubToken,
        })
      }
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
          label="GitHub token"
          value={githubOrganisation}
          onChange={event => setGithubOrganisation(event.target.value)}
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubRepository"
          label="GitHub token"
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

      <div className={classes.actions}>
        <Button
          className={classes.action}
          color="primary"
          onClick={() => handleCancel(tab)}
        >
          Cancel
        </Button>
        <Button
          className={classes.action}
          color="primary"
          variant="contained"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default connect(null, dispatch => ({
  handleCancel: (tab: Tab) => {
    dispatch(hideTabSettings(tab))
  },
  handleSubmit: (event: any, tab: Tab, values: any) => {
    event.preventDefault()
    dispatch(addTab({ ...tab, ...values }))
    dispatch(hideTabSettings(tab))
  },
}))(Settings)
