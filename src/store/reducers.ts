import { combineReducers } from 'redux'
import tabs from './reducers/tabs'
import tickets from './reducers/tickets'

export default combineReducers({
  tabs,
  tickets,
})
