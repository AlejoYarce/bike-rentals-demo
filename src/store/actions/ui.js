import { createAction } from '@reduxjs/toolkit'

import { UI } from '~app/store/types'

const setShowAuth = createAction(UI.setShowAuth)

const clearUI = createAction(UI.clearUI)

const UIactions = {
  setShowAuth,
  clearUI,
}

export default UIactions
