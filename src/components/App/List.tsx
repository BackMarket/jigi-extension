import React from 'react'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchIcon from '@material-ui/icons/Search'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import { makeStyles, createStyles, Grid, withStyles } from '@material-ui/core'

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

const List = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const tickets = [
    {
      status: 'todo',
      title: 'foobar',
      description: 'seugfduseygfb',
    },
    {
      status: 'todo',
      title: 'bar',
      description: 'seugfduseygfb',
    },
    {
      status: 'todo',
      title: 'baz',
      description: 'seugfduseygfb',
    },
  ]

  const handlePanelChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
      <Grid container spacing={1}>
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
      </Grid>
      {tickets.map((ticket, index) => (
        <ExpansionPanel
          square
          expanded={expanded === `panel${index}`}
          onChange={handlePanelChange(`panel${index}`)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Chip color="primary" label={ticket.status} />
            <span>{ticket.title}</span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{ticket.description}</ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </>
  )
}

export default List
