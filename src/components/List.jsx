import React from 'react'

import { makeStyles, createStyles, withStyles, Select } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import ReactMarkdown from 'react-markdown'

import theme from '../theme'

const useStyles = makeStyles(() =>
  createStyles({
    search: {
      width: '100%',
    },
    searchIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ticket: {
      display: 'flex',
      flexDirection: 'column',
    },
    information: {
      display: 'flex',
      flexDirection: 'row',
    },
    title: {
      flex: 1,
      maxWidth: '300px',
      display: 'inline-block',
      marginLeft: theme.spacing(4),
    },
    issues: {},
    issue: {
      display: 'inline-block',
      marginRight: theme.spacing(4),
      border: '1px solid black',
      borderRadius: '4px',
    },
  }),
)

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {
    flexDirection: 'column',
  },
})(MuiExpansionPanel)

const List = ({ tickets }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const statusList = ['to-do', 'Running']

  const handlePanelChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const ticketsArray = Object.values(tickets)

  return (
    <>
      {ticketsArray.map(
        ({ status, title, description, issues = [] }, index) => (
          <ExpansionPanel
            key={title}
            square
            expanded={expanded === `panel${index}`}
            onChange={handlePanelChange(`panel${index}`)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.ticket}>
                <div className={classes.information}>
                  <Select
                    onClick={event => event.stopPropagation()}
                    native
                    value={status.name}
                  >
                    {statusList.map(statusListItem => (
                      <option key={statusListItem} value={statusListItem}>
                        {statusListItem}
                      </option>
                    ))}
                  </Select>

                  <Typography noWrap className={classes.title}>
                    {title}
                  </Typography>
                </div>

                {issues.length > 0 ? (
                  <div className={classes.issues}>
                    {issues.map(({ pullRequest = { id: 'XXX' } }) => {
                      return (
                        <Chip label={pullRequest.id} key={pullRequest.id} />
                      )
                    })}
                  </div>
                ) : null}
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expanded}>
              <ReactMarkdown source={description} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ),
      )}
    </>
  )
}

export default List
