import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react'
import { debounce, chain } from 'lodash'

import { breakpoints } from '~app/styles/media'
import { childrenProps } from '~app/utils/props'

const isMobile = (bp) => bp === 'sm'
const isMD = (bp) => bp === 'md'

const getWindowWidth = () => (typeof window !== 'undefined' ? window.innerWidth : 0)

const getWindowHeight = () => (typeof window !== 'undefined' ? window.innerHeight : 0)

const sortedBreakpoints = chain(breakpoints)
  .map((value, key) => ({ breakpoint: key, value }))
  .orderBy(['value'], ['desc'])
  .value()

export const getBreakpoint = (width) => {
  const { breakpoint } = sortedBreakpoints.find(({ value }) => width >= value) || {
    breakpoint: 'sm',
    value: 0,
  }

  return breakpoint
}

const defaultHeight = getWindowHeight()

const defaultValue = {
  isMobile: true,
  isMD: false,
  isMobileOrTablet: false,
}

const ResizeContext = React.createContext(defaultValue)

/**
 * NOTE:
 * iosDynamicHeight, describes the delta when in an iOS
 * device the top search bar and lower bar appear or desapear
 * if the delta is bigger means it vertical resize.
 */
export const iosDynamicHeight = 120

const ResizeProvider = ({ children }) => {
  const [value, setValue] = useState(defaultValue)
  const prevInnerHeight = useRef(defaultHeight)
  const deltaHeight = useRef(0)

  const updateValue = () => {
    const width = getWindowWidth()
    const breakpoint = getBreakpoint(width)

    setValue((prevState) => ({
      ...prevState,
      isMobile: isMobile(breakpoint),
      isMD: isMD(breakpoint),
      isMobileOrTablet: isMobile(breakpoint) || isMD(breakpoint),
    }))
  }

  // Debounce function that it is executed when resize event stop
  const onResizeEnd = useCallback(
    debounce(() => {
      const heightChange = Math.abs(prevInnerHeight.current - window.innerHeight)

      if (heightChange > iosDynamicHeight) {
        deltaHeight.current = heightChange
        prevInnerHeight.current = window.innerHeight
      }

      const resizing = false
      updateValue(resizing)
    }, 300),
    [],
  )

  const onResize = useCallback(() => {
    const { resizing } = value
    if (!resizing) {
      updateValue(!resizing)
    }
    onResizeEnd()
  }, [onResizeEnd])

  useEffect(() => {
    updateValue(false)
    prevInnerHeight.current = window.innerHeight

    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  return <ResizeContext.Provider value={value}>{children}</ResizeContext.Provider>
}

export const useResize = () => useContext(ResizeContext)

ResizeProvider.propTypes = {
  children: childrenProps.isRequired,
}

export default ResizeProvider
