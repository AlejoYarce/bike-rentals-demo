import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import smoothscroll from 'smoothscroll-polyfill'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import StyleProvider from '~app/styles/StyleProvider'
import { FirebaseProvider } from '~app/lib/firebase/client'
import ResizeProvider from '~app/components/hooks/useResize'
import { useStore } from '~app/store'

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState)

  useEffect(() => {
    smoothscroll.polyfill()
  }, [])

  return (
    <Provider store={store}>
      <StyleProvider>
        <FirebaseProvider>
          <ResizeProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </ResizeProvider>
        </FirebaseProvider>
      </StyleProvider>
    </Provider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape().isRequired,
}

export default MyApp
