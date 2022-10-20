import { UI } from '~app/store/types'

const initialState = {
  showAuth: false,
}

function reducer(state = initialState, action) {
  if (action.type === UI.setShowAuth) {
    return {
      ...state,
      ...action.payload,
    }
  }

  if (action.type === UI.clearUI) {
    return {
      ...initialState,
    }
  }

  return state
}

export default reducer
