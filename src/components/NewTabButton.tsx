import React from 'react'
import { createStyles, makeStyles, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { connect } from 'react-redux'
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

function NewTabButton(props: NewTabButtonProps) {
  const { onCreate, handleNewTabClick } = props
  const classes = useStyles()

  return (
    <IconButton
      className={classes.button}
      onClick={() => {
        handleNewTabClick()
        onCreate()
      }}
    >
      <AddIcon />
    </IconButton>
  )
}

export default connect(null, dispatch => ({
  handleNewTabClick: () => {
    dispatch(createNewTab())
  },
}))(NewTabButton)
