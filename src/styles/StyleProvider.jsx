import React from 'react'
import { ThemeProvider } from '@emotion/react'

import { theme } from './theme'
import { GlobalStyles } from './global'
import { childrenProps } from '~app/utils/props'

const StyleProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
)

StyleProvider.propTypes = {
  children: childrenProps.isRequired,
}

export default StyleProvider
