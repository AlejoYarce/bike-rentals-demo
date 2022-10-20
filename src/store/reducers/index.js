import { combineReducers } from 'redux'

import user from './user'
import ui from './ui'

const rootReducer = combineReducers({
  user,
  ui,
})

export default rootReducer
