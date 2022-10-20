import { useMemo } from 'react'
import { createStore, compose } from 'redux'

import rootReducer from './reducers'

const composeEnhancers = (typeof window === 'object'
  && window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose

export const initializeStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(),
  )

  return store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
