import React from 'react'
import { createStyles, makeStyles, IconButton } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import SettingsIcon from '@material-ui/icons/Settings'
import { useDispatch } from 'react-redux'
import { toggleTabSettings } from '../store/actions'
import { Tab } from '../../types'

type SettingsButtonProps = {
  tab: Tab
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

export default function SettingsButton(props: SettingsButtonProps) {
  const { tab } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <IconButton
      className={classes.button}
      onClick={() => dispatch(toggleTabSettings(tab))}
    >
      {tab.showSettings ? <CheckIcon /> : <SettingsIcon />}
    </IconButton>
  )
}
