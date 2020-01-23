import React from 'react'
import { createStyles, makeStyles, IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { connect } from 'react-redux'
import { showTabSettings } from '../store/actions'

type SettingsButtonProps = {
  tabId: string
  handleSettingsClick: Function
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
  const { tabId, handleSettingsClick } = props
  const classes = useStyles()

  return (
    <IconButton
      className={classes.button}
      onClick={() => handleSettingsClick(tabId)}
    >
      <SettingsIcon />
    </IconButton>
  )
}

export default connect(null, dispatch => ({
  handleSettingsClick: (tabId: string) => {
    dispatch(showTabSettings(tabId))
  },
}))(SettingsButton)
