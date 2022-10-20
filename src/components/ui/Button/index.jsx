import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { CTAButton } from './styles'
import CircleLoader from '~app/components/ui/icons/CircleLoader'

const Button = (props) => {
  const {
    children,
    customClass,
    callback,
    ariaLabel,
    disabled,
    type = 'button',
    stroked,
    strokedColor,
    showLoader,
    id,
    customWidth,
    link,
    icon,
  } = props

  return (
    <CTAButton
      {...props}
      customClass={customClass}
      onClick={() => (disabled ? noop : callback && callback())}
      aria-label={ariaLabel}
      disabled={disabled}
      type={type}
      stroked={stroked}
      strokedColor={strokedColor}
      showLoader={showLoader}
      id={id}
      customWidth={customWidth}
      link={link}
      icon={icon}
    >
      {children}
      {showLoader && <CircleLoader />}
    </CTAButton>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  customClass: PropTypes.shape(),
  callback: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  stroked: PropTypes.bool,
  strokedColor: PropTypes.string,
  showLoader: PropTypes.bool,
  id: PropTypes.string,
  customWidth: PropTypes.string,
  link: PropTypes.bool,
  icon: PropTypes.bool,
}

Button.defaultProps = {
  children: null,
  customClass: null,
  ariaLabel: '',
  disabled: false,
  type: 'button',
  stroked: false,
  strokedColor: '',
  showLoader: false,
  id: undefined,
  customWidth: null,
  link: false,
  icon: false,
}

export default Button
