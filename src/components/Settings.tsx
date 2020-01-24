import React from 'react'
import { createStyles, makeStyles, Button, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { Tab } from '../../types'
import { saveTab } from '../common/storage'
import {
  updateTabSettings,
  updateTabJiraSettings,
  updateTabGithubSettings,
  deleteTab,
} from '../store/actions'

type SettingsProps = {
  tab: Tab
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

export default function Settings({ tab }: SettingsProps) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isLastTab = useSelector(
    (state: any) => Object.values(state.tabs.tabs).length <= 1,
  )

  const [updateSetting] = useDebouncedCallback((field, value) => {
    const newTab = { ...tab, [field]: value }
    saveTab(newTab)
    dispatch(updateTabSettings(newTab))
  }, 100)

  const [updateJiraSetting] = useDebouncedCallback((field, value) => {
    const newTab = { ...tab, [field]: value }
    saveTab(newTab)
    dispatch(updateTabJiraSettings(newTab))
  }, 1000)

  const [updateGithubSetting] = useDebouncedCallback((field, value) => {
    const newTab = { ...tab, [field]: value }
    saveTab(newTab)
    dispatch(updateTabGithubSettings(newTab))
  }, 1000)

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
          defaultValue={tab.title}
          onChange={e => updateSetting('title', e.target.value)}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraHost"
          label="JIRA domain"
          placeholder="Ex: mycompany.atlassian.net"
          defaultValue={tab.jiraHost}
          onChange={e => updateJiraSetting('jiraHost', e.target.value)}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraLogin"
          label="JIRA login"
          placeholder="E-mail address"
          defaultValue={tab.jiraLogin}
          onChange={e => updateJiraSetting('jiraLogin', e.target.value)}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraToken"
          label="JIRA token"
          defaultValue={tab.jiraToken}
          onChange={e => updateJiraSetting('jiraToken', e.target.value)}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraJqlQuery"
          label="JIRA JQL Query"
          defaultValue={tab.jiraJqlQuery}
          onChange={e => updateJiraSetting('jiraJqlQuery', e.target.value)}
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubOrganisation"
          label="GitHub organization or username"
          defaultValue={tab.githubOrganisation}
          onChange={e =>
            updateGithubSetting('githubOrganisation', e.target.value)
          }
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubRepository"
          label="GitHub repository"
          defaultValue={tab.githubRepository}
          onChange={e =>
            updateGithubSetting('githubRepository', e.target.value)
          }
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubToken"
          label="GitHub token"
          defaultValue={tab.githubToken}
          onChange={e => updateGithubSetting('githubToken', e.target.value)}
          required
          fullWidth
          multiline
        />
      </div>

      <div className={classes.actions}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.action}
          onClick={() => dispatch(deleteTab(tab))}
          disabled={isLastTab}
        >
          Remove this page
        </Button>
      </div>
    </form>
  )
}
