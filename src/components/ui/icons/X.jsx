import React from 'react'
import PropTypes from 'prop-types'

import { styled } from '~app/styles/theme'

const Svg = styled.svg`
  &.plus-sign {
    transform: rotate(45deg);
    transition-duration: 500ms;
  }
  &.x-sign {
    transform: rotate(180deg);
    transition-duration: 500ms;
  }
`
const X = ({ className }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" className={className}>
    <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
  </Svg>
)

X.propTypes = {
  className: PropTypes.string,
}

X.defaultProps = {
  className: '',
}

export default X
