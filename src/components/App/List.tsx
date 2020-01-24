import React from 'react'
// import TextField from '@material-ui/core/TextField'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import SearchIcon from '@material-ui/icons/Search'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import {
  makeStyles,
  createStyles,
  // Grid,
  withStyles,
  Select,
  Typography,
} from '@material-ui/core'
import theme from '../../theme'
import { connect } from 'react-redux'
import { Ticket, IssuesList, TicketsList } from '../../../types'

interface ListProps {
  tickets: TicketsList
  issues: IssuesList
}

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
    ticketTitle: {
      marginLeft: theme.spacing(4),
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
  expanded: {},
})(MuiExpansionPanel)

const List = ({ tickets, issues }: ListProps) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState<string | false>(false)

  console.log(tickets)
  const statusList = ['to-do', 'Running']

  const handlePanelChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false)
  }
  const ticketsArray = Object.values(tickets)

  return (
    <>
      {/* <Grid container spacing={1}>
        <Grid className={classes.searchIcon} item xs={1}>
          <SearchIcon />
        </Grid>
        <Grid item xs={11}>
          <TextField
            className={classes.search}
            id="search-text-field"
            label="Search"
          />
        </Grid>
      </Grid> */}
      {ticketsArray.map(
        ({ status, title, description, issues = [] }: Ticket, index) => (
          <ExpansionPanel
            key={title}
            square
            expanded={expanded === `panel${index}`}
            onChange={handlePanelChange(`panel${index}`)}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Select
                onClick={event => event.stopPropagation()}
                native
                value={status.name}
              >
                {statusList.map(statusListItem => (
                  <option value={statusListItem}>{statusListItem}</option>
                ))}
              </Select>
              <Typography className={classes.ticketTitle} variant="h6">
                {title}
              </Typography>
              {issues.map(({ pullRequest = { id: 'XXX' } }) => (
                <span>#{pullRequest.id}</span>
              ))}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>{description}</div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ),
      )}
    </>
  )
}

const mapStateToProps = ({ tickets, issues }: any) => {
  return {
    tickets,
    issues,
  }
}

export default connect(mapStateToProps)(List)
