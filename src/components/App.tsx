import React, { useEffect, useCallback } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import List from './List'
import {
  AppBar,
  Tabs,
  Tab as MuiTab,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import { list as listTickets } from '../common/jira'
import { getTabs } from '../common/storage'
import { searchIssues } from '../common/github'
import {
  addTab,
  setTabTickets,
  addTicket,
  createNewTab,
  setActiveTabIndex,
} from '../store/actions'
import { Tab, Ticket, TicketsList } from '../../types'
import NewTabButton from './NewTabButton'
import SettingsToggleButton from './SettingsToggleButton'
import Settings from './Settings'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

interface AppProps {
  tabs: any
}

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      width: '600px',
    },
    tabs: {
      background: 'white',
    },
  }),
)

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Typography>
  )
}

const App = ({ tabs = {} }: AppProps) => {
  const classes = useStyles()
  const activeTabIndex = useSelector((state: any) => state.tabs.activeTabIndex)
  const activeTab = useSelector((state: any) => {
    const id = Object.keys(state.tabs.tabs)[state.tabs.activeTabIndex]
    return state.tabs.tabs[id]
  })
  const dispatch = useDispatch()

  const tabsArray: Array<Tab> = Object.values(tabs)

  useEffect(() => {
    const loadTabs = async () => {
      const tabs = await getTabs()

      if (!tabs || Object.keys(tabs).length === 0) {
        dispatch(createNewTab())

        return
      }

      const tabValues: Array<Tab> = Object.values(tabs)
      tabValues.forEach((tab: Tab) => dispatch(addTab(tab)))
    }

    loadTabs()
  }, [dispatch])

  const handleTabsChange = useCallback(
    async (event: any, newValue: number): Promise<void> => {
      if (tabsArray.length === 0) {
        return
      }

      const currentTab: any = tabsArray[newValue]
      const fetchedTickets: TicketsList = await listTickets(
        currentTab.jiraClient,
        currentTab.jiraJqlQuery,
      )

      const ticketIds: Array<string> = await Promise.all(
        fetchedTickets.map(
          async (ticket: Ticket): Promise<string> => {
            ticket.issues = await searchIssues(currentTab.githubClient, {
              query: `is:pr in:title [${ticket.id}]`,
            })

            dispatch(addTicket(ticket))

            return ticket.id
          },
        ),
      )

      dispatch(setTabTickets({ tabId: currentTab.id, ticketIds }))
    },
    [dispatch, tabsArray],
  )

  useEffect(() => {
    handleTabsChange({}, 0)
  }, [])

  return (
    <div className={classes.wrapper}>
      <AppBar position="static">
        <Tabs
          className={classes.tabs}
          value={activeTabIndex}
          onChange={(event, value) => dispatch(setActiveTabIndex(value))}
          textColor="primary"
        >
          {tabsArray.map((tab: any, index: number) => (
            <MuiTab key={tab.id} label={tab.title || 'New repository'} />
          ))}
          <NewTabButton />
          {activeTab && <SettingsToggleButton tab={activeTab} />}
        </Tabs>
      </AppBar>

      {tabsArray.map((tab: any, index: number) => (
        <TabPanel key={tab.id} index={index} value={activeTabIndex}>
          {activeTab && activeTab.showSettings ? (
            <Settings tab={tab} />
          ) : (
            <List />
          )}
        </TabPanel>
      ))}
    </div>
  )
}

export default connect(({ tabs }: any) => {
  return {
    tabs: tabs.tabs,
  }
})(App)
