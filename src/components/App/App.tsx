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

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      width: '500px',
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

const App = () => {
  const classes = useStyles()
  const [activeTabIndex, setActiveTabIndex] = React.useState(0)
  const handleTabsChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTabIndex(newValue)
  }
  const repos = [
    {
      name: 'repo1',
    },
    {
      name: 'repo2',
    },
  ]

  return (
    <div className={classes.wrapper}>
      <AppBar position="static">
        <Tabs
          className={classes.tabs}
          value={activeTabIndex}
          onChange={handleTabsChange}
          textColor="primary"
        >
          {repos.map(repo => (
            <Tab key={repo.name} label={repo.name} />
          ))}
        </Tabs>
      </AppBar>
      <TabPanel value={activeTabIndex} index={0}>
        <List />
      </TabPanel>
    </div>
  )
}

export default connect(
  (state: any) => {
    console.log('REDUX STATE', state)
    return {}
  }
)(App)
