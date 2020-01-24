import React from 'react'

import { createStyles, makeStyles, IconButton } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import SettingsIcon from '@material-ui/icons/Settings'

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      alignSelf: 'flex-end',
      marginRight: '0.8rem',
      marginLeft: 'auto',
    },
  }),
)

export default function SettingsButton(props) {
  const { tab } = props
  const classes = useStyles()

  return (
    <IconButton
      className={classes.button}
      onClick={() => console.log('Toggle settings')}
    >
      {tab.showSettings ? <CheckIcon /> : <SettingsIcon />}
    </IconButton>
  )
}
