import React from 'react'
import Chip from '@material-ui/core/Chip'
import TextField from '@material-ui/core/TextField'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SearchIcon from '@material-ui/icons/Search'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import {
  makeStyles,
  createStyles,
  Grid,
  withStyles,
  Select,
  Typography,
} from '@material-ui/core'
import theme from '../../theme'

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

const List = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const tickets = [
    {
      status: 'todo',
      title: 'foobar',
      description: 'seugfduseygfb',
      issues: [
        {
          number: '1234',
          status: 'closed',
        },
        {
          number: '1232',
          status: 'closed',
        },
      ],
    },
    {
      status: 'todo',
      title: 'bar',
      description: 'seugfduseygfb',
      issues: [
        {
          number: '1231',
          status: 'closed',
        },
        {
          number: '1222',
          status: 'closed',
        },
      ],
    },
    {
      status: 'todo',
      title: 'baz',
      description: 'seugfduseygfb',
      issues: [
        {
          number: '2234',
          status: 'closed',
        },
        {
          number: '2232',
          status: 'closed',
        },
      ],
    },
  ]

  const statusList = ['todo', 'done']

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
      {tickets.map(({ status, title, description, issues }, index) => (
        <ExpansionPanel
          square
          expanded={expanded === `panel${index}`}
          onChange={handlePanelChange(`panel${index}`)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={1}>
              <Grid container item xs={6}>
                <Select
                  onClick={event => event.stopPropagation()}
                  native
                  value={status}
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  {statusList.map(status => (
                    <option value={status}>{status}</option>
                  ))}
                </Select>
                <Typography className={classes.ticketTitle} variant="h6">
                  {title}
                </Typography>
              </Grid>
              <Grid container item xs={6} justify="flex-end">
                <div>
                  {issues.map(issue => (
                    <Chip color="secondary" label={issue.number} />
                  ))}
                </div>
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              {issues.map(issue => (
                <Chip color="secondary" label={issue.number} />
              ))}
            </div>
            <div>{description}</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </>
  )
}

export default List
