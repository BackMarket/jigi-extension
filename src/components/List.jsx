import React from 'react'

import { makeStyles, createStyles, withStyles } from '@material-ui/core'
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
      maxWidth: '400px',
      display: 'inline-block',
      marginLeft: theme.spacing(4),
      fontSize: 'inherit',
    },
    issues: {
      marginTop: theme.spacing(4),
    },
    issue: {
      display: 'inline-block',
      marginRight: theme.spacing(4),
      border: '1px solid black',
      borderRadius: '4px',
    },
    status: {
      border: '1px solid transparent',
      borderRadius: '3px',
      padding: '0 0.2rem',
      display: 'inline-block',
      textTransform: 'uppercase',
      fontWeight: '600',
      fontSize: '12px',
      marginBottom: 'auto',
      marginTop: '2px',
    },
    statusGreen: {
      color: '#00875a',
      borderColor: '#abf5d1',
    },
    statusBlue: {
      color: '#0052cc',
      borderColor: '#b3d4ff',
    },
    statusGrey: {
      color: '#42526e',
      borderColor: '#c1c7d0',
    },
    expanded: {
      flexDirection: 'column',
      margin: '0 10px',
    },
    markdown: {
      marginTop: theme.spacing(),
      padding: '0 10px',
      borderRadius: '5px',
      background: '#f5f5f5',
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
})(MuiExpansionPanel)

const List = ({ tickets }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

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
                  <span
                    className={[
                      classes.status,
                      {
                        yellow: classes.statusBlue,
                        blue: classes.statusBlue,
                        green: classes.statusGreen,
                      }[status.color] || classes.statusGrey,
                    ].join(' ')}
                  >
                    {status.name}
                  </span>

                  <Typography noWrap className={classes.title}>
                    {title}
                  </Typography>
                </div>

                {issues.length > 0 ? (
                  <div className={classes.issues}>
                    {issues.map(({ pullRequest = { id: 'XXX' } }) => {
                      let background = null
                      let color = null

                      if (pullRequest.merged) {
                        background = '#6F42C1'
                        color = 'white'
                      } else if (pullRequest.mergeableState === 'clean') {
                        background = '#2CBE4E'
                        color = 'white'
                      } else if (pullRequest.mergeableState === 'unstable') {
                        background = '#CB2431'
                        color = 'white'
                      }
                      return (
                        <Chip
                          style={{
                            background,
                            color,
                            marginRight: '3px',
                            marginBottom: '3px',
                          }}
                          label={pullRequest.id}
                          key={pullRequest.id}
                          onClick={event => {
                            event.stopPropagation()
                            window.open(pullRequest.url)
                          }}
                        />
                      )
                    })}
                  </div>
                ) : null}
              </div>
            </ExpansionPanelSummary>
            {description && (
              <ExpansionPanelDetails className={classes.expanded}>
                Ticket Description:
                <ReactMarkdown
                  source={description}
                  className={classes.markdown}
                />
              </ExpansionPanelDetails>
            )}
          </ExpansionPanel>
        ),
      )}
    </>
  )
}

export default List
