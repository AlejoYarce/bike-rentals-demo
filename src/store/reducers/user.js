import { USER } from '~app/store/types'

const initialState = {
  id: '',
  email: '',
  createdAt: null,
}

function reducer(state = initialState, action) {
  if (action.type === USER.setUserData) {
    return {
      ...state,
      ...action.payload,
    }
  }

  if (action.type === USER.clearUserData) {
    return {
      ...initialState,
    }
  }

  return state
}

export default reducer
