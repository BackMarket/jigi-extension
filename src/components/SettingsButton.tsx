import React from 'react'
import { createStyles, makeStyles, IconButton } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { connect } from 'react-redux'
import { showTabSettings } from '../store/actions'
import { Tab } from '../../types'

type SettingsButtonProps = {
  tab: Tab
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
  const { tab, handleSettingsClick } = props
  const classes = useStyles()

  return (
    <IconButton
      className={classes.button}
      onClick={() => handleSettingsClick(tab)}
    >
      <SettingsIcon />
    </IconButton>
  )
}

export default connect(null, dispatch => ({
  handleSettingsClick: (tab: Tab) => {
    dispatch(showTabSettings(tab))
  },
}))(SettingsButton)
