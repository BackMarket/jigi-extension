import React, { useState, useEffect } from 'react'

import {
  makeStyles,
  createStyles,
  AppBar,
  Tabs,
  Tab as MuiTab,
} from '@material-ui/core'

import { getTabs, saveTab } from '../common/storage'
import {
  createClient as createJiraClient,
  list as listTickets,
} from '../common/jira'
import {
  createClient as createGithubClient,
  searchIssues,
} from '../common/github'

import TabPanel from './TabPanel'
import NewTabButton from './NewTabButton'
import SettingsToggleButton from './SettingsToggleButton'
import Settings from './Settings'
import List from './List'

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

const App = () => {
  const classes = useStyles()
  const [tabs, setTabs] = useState([])
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [jiraClient, setJiraClient] = useState(null)
  const [githubClient, setGithubClient] = useState(null)
  const [loadingTickets, setIsLoadingTickets] = useState(false)
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    const loadTabs = async () => {
      console.log('LoadTabs')
      const tabs = await getTabs()

      if (!tabs || Object.keys(tabs).length === 0) {
        return
      }

      const tabsArray = Object.values(tabs)
      setTabs(tabsArray)

      const defaultIndex = 0
      setActiveTabIndex(defaultIndex)

      const tab = tabsArray[defaultIndex]
      setJiraClient(
        createJiraClient(tab.jiraHost, tab.jiraLogin, tab.jiraToken),
      )
      setGithubClient(createGithubClient(tab.githubToken))
    }

    loadTabs()
  }, [])

  useEffect(() => {
    const loadTickets = async () => {
      console.log('LoadTickets')
      if (
        tabs.length === 0 ||
        activeTabIndex < 0 ||
        activeTabIndex >= tabs.length
      ) {
        return
      }

      const currentTab = tabs[activeTabIndex]

      if (currentTab.tickets && currentTab.tickets.length > 0) {
        setTickets(currentTab.tickets)
      }

      if (!jiraClient) {
        return
      }

      setIsLoadingTickets(true)

      const fetchedTickets = await listTickets(
        jiraClient,
        currentTab.jiraJqlQuery,
      )

      const ticketsToAdd = await Promise.all(
        fetchedTickets.map(async ticket => {
          let issues = []

          if (githubClient) {
            try {
              issues = await searchIssues(githubClient, {
                query: `is:pr in:title [${ticket.id}]`,
              })
            } catch (err) {
              console.error(err)
            }
          }

          return {
            ...ticket,
            issues,
          }
        }),
      )

      saveTab({ ...currentTab, tickets: ticketsToAdd })

      setTickets(ticketsToAdd)
      setIsLoadingTickets(false)
    }

    loadTickets()
  }, [tabs, activeTabIndex, jiraClient, githubClient])

  const activeTab = tabs[activeTabIndex]

  return (
    <div className={classes.wrapper}>
      <AppBar position="static">
        <Tabs
          className={classes.tabs}
          value={activeTabIndex}
          onChange={(event, tabIndex) => setActiveTabIndex(tabIndex)}
          textColor="primary"
        >
          {tabs.map((tab, index) => (
            <MuiTab key={tab.id} label={tab.title || 'New repository'} />
          ))}
          <NewTabButton />
          {activeTab && <SettingsToggleButton tab={activeTab} />}
        </Tabs>
      </AppBar>

      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} index={index} value={activeTabIndex}>
          {activeTab && activeTab.showSettings ? (
            'Settings'
          ) : (
            <>
              {loadingTickets ? 'Updating...' : ''}
              <List tickets={tickets} />}
            </>
          )}
        </TabPanel>
      ))}
    </div>
  )
}

export default App
