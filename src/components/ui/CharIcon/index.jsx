import React from 'react'
import PropTypes from 'prop-types'

import { styled, theme } from '~app/styles/theme'

const CharIconContainer = styled.div`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-color: ${theme.colors.primary.endeavour};
  color: ${({ color }) => color};
  border-radius: 50%;
  text-transform: uppercase;
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const CharIcon = (props) => {
  const {
    char,
    height,
    width,
    color,
    fontSize,
  } = props

  return (
    <CharIconContainer
      height={height}
      width={width}
      fontSize={fontSize}
      color={color}
    >
      {char}
    </CharIconContainer>
  )
}

CharIcon.propTypes = {
  char: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
}

CharIcon.defaultProps = {
  height: '',
  width: '',
  color: theme.colors.primary.white,
  fontSize: '1.8rem',
}

export default CharIcon
