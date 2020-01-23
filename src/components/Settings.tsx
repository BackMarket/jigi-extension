import React from 'react'
import { createStyles, makeStyles, Button, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import { hideTabSettings, saveTabSettings } from '../store/actions'
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
  return (
    <form
      className={classes.form}
      autoComplete="off"
      onSubmit={values => handleSubmit(tab, values)}
    >
      <div className={classes.fields}>
        <TextField
          className={classes.field}
          id="title"
          label="Title"
          value={tab.title}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraDomain"
          label="JIRA domain"
          value={tab.jiraHost}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraLogin"
          label="JIRA login"
          value={tab.jiraLogin}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraToken"
          label="JIRA token"
          value={tab.jiraToken}
          required
          fullWidth
        />
        <TextField
          className={classes.field}
          id="jiraJqlQuery"
          label="JIRA JQL Query"
          value={tab.jiraHost}
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubOrganisation"
          label="GitHub token"
          value={tab.githubOrganisation}
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubRepository"
          label="GitHub token"
          value={tab.githubRepository}
          required
          fullWidth
          multiline
        />
        <TextField
          className={classes.field}
          id="githubToken"
          label="GitHub token"
          value={tab.githubToken}
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
  handleSubmit: (tab: Tab, values: any) => {
    dispatch(saveTabSettings({ tab, values }))
    dispatch(hideTabSettings(tab))
  },
}))(Settings)
