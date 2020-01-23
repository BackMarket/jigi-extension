import { combineReducers } from 'redux'
import tabs from './reducers/tabs'
import tickets from './reducers/tickets'
import issues from './reducers/issues'

export default combineReducers({
  tabs,
  tickets,
  issues,
})
