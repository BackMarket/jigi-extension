import React from 'react'
import { createStyles, makeStyles, IconButton } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import SettingsIcon from '@material-ui/icons/Settings'
import { connect } from 'react-redux'
import { toggleTabSettings } from '../store/actions'
import { Tab } from '../../types'

type SettingsButtonProps = {
  tab: Tab
  handleButtonClick: Function
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      alignSelf: 'flex-end',
      marginRight: '0.8rem',
      marginLeft: 'auto',
    },
  }),
)

function SettingsButton(props: SettingsButtonProps) {
  const { tab, handleButtonClick } = props
  const classes = useStyles()

  return (
    <IconButton
      className={classes.button}
      onClick={() => handleButtonClick(tab)}
    >
      {tab.showSettings ? <CheckIcon /> : <SettingsIcon />}
    </IconButton>
  )
}

export default connect(null, dispatch => ({
  handleButtonClick: (tab: Tab) => {
    console.log('handleButtonClick')
    dispatch(toggleTabSettings(tab))
  },
}))(SettingsButton)
