import React from 'react'
import { createStyles, makeStyles, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useDispatch } from 'react-redux'
import { createNewTab } from '../store/actions'

type NewTabButtonProps = {
  onCreate: Function
  handleNewTabClick: Function
}

const useStyles = makeStyles(() =>
  createStyles({
    button: {},
  }),
)

export default function NewTabButton() {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <IconButton
      className={classes.button}
      onClick={() => {
        dispatch(createNewTab())
      }}
    >
      <AddIcon />
    </IconButton>
  )
}
