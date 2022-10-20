import React from 'react'
import PropTypes from 'prop-types'

import { Checkmark, RadioInput, RadioLabel } from './styles'

const Radio = ({
  id,
  name,
  label,
  initialValue,
  onChange,
  checked,
}) => (
  <RadioLabel htmlFor={id}>
    <RadioInput
      type="radio"
      name={name}
      id={id}
      checked={initialValue === checked}
      onChange={onChange}
      value={initialValue}
    />
    {label}
    <Checkmark />
  </RadioLabel>
)

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.node],
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number],
  ).isRequired,
  initialValue: PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number],
  ).isRequired,
}

export default Radio
