import React from 'react'
import { connect } from 'react-redux'
import List from './List'
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core'
import { list as listTickets, createClient } from '../../common/jira'

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

const App = ({ tabs }: AppProps) => {
  const classes = useStyles()
  const [activeTabIndex, setActiveTabIndex] = React.useState(0)
  const tabsArray = Object.values(tabs)
  const handleTabsChange = async (
    event: React.ChangeEvent<{}>,
    newValue: number,
  ) => {
    const currentTab = tabs[newValue]
    setActiveTabIndex(newValue)
    const client = await createClient(
      currentTab.jiraHost,
      currentTab.jiraLogin,
      currentTab.jiraToken,
    )
    listTickets(client, '')
  }

  return (
    <div className={classes.wrapper}>
      <AppBar position="static">
        <Tabs
          className={classes.tabs}
          value={activeTabIndex}
          onChange={handleTabsChange}
          textColor="primary"
        >
          {tabsArray.map((tab: any) => (
            <Tab key={tab.id} label={tab.title} />
          ))}
        </Tabs>
      </AppBar>
      <TabPanel value={activeTabIndex} index={0}>
        <List />
      </TabPanel>
    </div>
  )
}

export default connect(({ tabs }: any) => {
  return {
    tabs,
  }
})(App)
