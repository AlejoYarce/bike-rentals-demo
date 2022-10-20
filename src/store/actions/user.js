import { createAction } from '@reduxjs/toolkit'

import { USER } from '~app/store/types'

const setUserData = createAction(USER.setUserData)

const clearUserData = createAction(USER.clearUserData)

const UserActions = {
  setUserData,
  clearUserData,
}

export default UserActions
