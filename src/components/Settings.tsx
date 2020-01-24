import { Tab } from '../../types'

import React from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { createStyles, makeStyles, Button, TextField } from '@material-ui/core'

import { saveTab } from '../common/storage'

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

  const [updateSetting] = useDebouncedCallback((field, value) => {
    const newTab = { ...tab, [field]: value }
    saveTab(newTab)
  }, 100)

  const [updateJiraSetting] = useDebouncedCallback((field, value) => {
    const newTab = { ...tab, [field]: value }
    saveTab(newTab)
  }, 1000)

  const [updateGithubSetting] = useDebouncedCallback((field, value) => {
    const newTab = { ...tab, [field]: value }
    saveTab(newTab)
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
          onChange={(event: any) => updateSetting('title', event.target.value)}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraHost"
          label="JIRA domain"
          placeholder="Ex: mycompany.atlassian.net"
          defaultValue={tab.jiraHost}
          onChange={(event: any) =>
            updateJiraSetting('jiraHost', event.target.value)
          }
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraLogin"
          label="JIRA login"
          placeholder="E-mail address"
          defaultValue={tab.jiraLogin}
          onChange={(event: any) =>
            updateJiraSetting('jiraLogin', event.target.value)
          }
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraToken"
          label="JIRA token"
          defaultValue={tab.jiraToken}
          onChange={(event: any) =>
            updateJiraSetting('jiraToken', event.target.value)
          }
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraJqlQuery"
          label="JIRA JQL Query"
          defaultValue={tab.jiraJqlQuery}
          onChange={(event: any) =>
            updateJiraSetting('jiraJqlQuery', event.target.value)
          }
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubOrganisation"
          label="GitHub organization or username"
          defaultValue={tab.githubOrganisation}
          onChange={(event: any) =>
            updateGithubSetting('githubOrganisation', event.target.value)
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
          onChange={(event: any) =>
            updateGithubSetting('githubRepository', event.target.value)
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
          onChange={(event: any) =>
            updateGithubSetting('githubToken', event.target.value)
          }
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
          onClick={() => console.log('Delete tab')}
        >
          Remove this page
        </Button>
      </div>
    </form>
  )
}
