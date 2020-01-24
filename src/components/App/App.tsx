import React, { useEffect, useCallback } from 'react'
import { connect, useDispatch } from 'react-redux'
import List from './List'
import {
  AppBar,
  Tabs,
  Tab as MuiTab,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import SettingsToggleButton from '../SettingsToggleButton'
import Settings from '../Settings'
import { Tab } from '../../../types'
import { list as listTickets } from '../../common/jira'
import { getTabs } from '../../common/storage'
import { searchIssues } from '../../common/github'
import {
  addTab,
  setTab,
  setTabTickets,
  addTicket,
  createNewTab,
} from '../../store/actions'
import { Ticket, TicketsList } from '../../../types'
// import NewTabButton from '../NewTabButton'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

interface AppProps {
  tabs: any
  createNewTab: any
  addTab: any
  setTabTickets: any
  addTicket: any
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

const App = ({
  tabs,
  createNewTab,
  addTab,
  setTabTickets,
  addTicket,
}: AppProps) => {
  const classes = useStyles()
  const [activeTabIndex, setActiveTabIndex] = React.useState(0)
  const tabsArray: Array<Tab> = Object.values(tabs)
  const handleTabsChange = useCallback(
    async (event: any, newValue: number): Promise<void> => {
      if (tabsArray.length === 0) {
        return
      }

      const currentTab: any = tabsArray[newValue]
      setActiveTabIndex(newValue)
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
            console.log(ticket.issues)
            addTicket(ticket)
            return ticket.id
          },
        ),
      )

      setTabTickets({ tabId: currentTab.id, ticketIds })
    },
    [addTicket, setTabTickets, tabsArray],
  )
  const activeTab: any = Object.values(tabs)[activeTabIndex]

  useEffect(() => {
    handleTabsChange({}, 0)
  }, [handleTabsChange])

  const dispatch = useDispatch()

  useEffect(() => {
    getTabs().then((tabs: any = {}) => {
      console.log('LOADED tabs', tabs)
      const tabValues: Array<Tab> = Object.values(tabs)

      if (tabValues.length > 0) {
        tabValues.forEach((tab: Tab) => dispatch(addTab(tab)))
        dispatch(setTab(tabValues[0].id))
      } else {
        createNewTab()
      }
    })
  }, [addTab, createNewTab, dispatch])

  return (
    <div className={classes.wrapper}>
      <AppBar position="static">
        <Tabs
          className={classes.tabs}
          value={activeTabIndex}
          onChange={handleTabsChange}
          textColor="primary"
        >
          {tabsArray.map((tab: any, index: number) => (
            <MuiTab key={tab.id} label={tab.title} />
          ))}
          {/* <NewTabButton
            onCreate={() => {
              console.log('<App> NEW TAB', tabsArray.length)
              setActiveTabIndex(tabsArray.length)
            }}
          /> */}
          {activeTab && <SettingsToggleButton tab={activeTab} />}
        </Tabs>
      </AppBar>
      <TabPanel value={activeTabIndex} index={0}>
        {activeTab && activeTab.showSettings ? (
          <Settings tab={activeTab} />
        ) : (
          <List />
        )}
      </TabPanel>
    </div>
  )
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    createNewTab: () => dispatch(createNewTab()),
    addTab: (payload: any) => dispatch(addTab(payload)),
    addTicket: (payload: any) => dispatch(addTicket(payload)),
    setTabTickets: (payload: any) => dispatch(setTabTickets(payload)),
  }
}

export default connect(({ tabs }: any) => {
  return {
    tabs,
  }
}, mapDispatchToProps)(App)
