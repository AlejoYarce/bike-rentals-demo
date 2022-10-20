import React from 'react'
import PropTypes from 'prop-types'

import { CustomTitle } from './styles'
import { childrenProps } from '~app/utils/props'

const Title = (props) => {
  const {
    children,
    customClass,
    marginTop,
    marginBottom,
    textAlign,
    min,
    max,
    capitalize,
    id,
    fontWeight,
    underline,
    color,
  } = props

  return (
    <CustomTitle
      id={id}
      css={customClass}
      marginTop={marginTop}
      marginBottom={marginBottom}
      textAlign={textAlign}
      min={min}
      max={max}
      capitalize={capitalize}
      fontWeight={fontWeight}
      underline={underline}
      color={color}
    >
      {children}
    </CustomTitle>
  )
}

Title.propTypes = {
  children: childrenProps.isRequired,
  customClass: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  textAlign: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  capitalize: PropTypes.bool,
  id: PropTypes.string,
  fontWeight: PropTypes.number,
  underline: PropTypes.bool,
  color: PropTypes.string,
}

Title.defaultProps = {
  customClass: '',
  marginTop: '0rem',
  marginBottom: '0rem',
  textAlign: 'center',
  min: 2.4,
  max: 2.4,
  capitalize: false,
  id: undefined,
  fontWeight: 700,
  underline: false,
  color: '',
}

export default Title
