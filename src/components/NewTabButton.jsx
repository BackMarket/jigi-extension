import React from 'react'

import { createStyles, makeStyles, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(() =>
  createStyles({
    button: {},
  }),
)

export default function NewTabButton() {
  const classes = useStyles()

  return (
    <IconButton
      className={classes.button}
      onClick={() => console.log('New tab')}
    >
      <AddIcon />
    </IconButton>
  )
}
