import React from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import { CheckboxInput, CheckboxLabel, Checkmark } from './styles'

const Checkbox = (props) => {
  const {
    name,
    label,
    onChange,
    required,
    value,
    fontSize,
    fontWeight,
    marginBottom,
    labelId,
    customWidth,
  } = props

  const onChecked = (e) => {
    const { checked } = e.target

    onChange(name, checked, required ? checked : true)
  }

  return (
    <CheckboxLabel
      id={labelId}
      htmlFor={name}
      fontSize={fontSize}
      fontWeight={fontWeight}
      marginBottom={marginBottom}
      customWidth={customWidth}
    >
      <CheckboxInput
        type="checkbox"
        name={name}
        id={name}
        onChange={onChecked}
        checked={value}
      />
      {label}
      <Checkmark />
    </CheckboxLabel>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.bool,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  marginBottom: PropTypes.string,
  labelId: PropTypes.string,
  customWidth: PropTypes.string,
}

Checkbox.defaultProps = {
  name: '',
  label: '',
  onChange: noop,
  required: false,
  value: false,
  fontSize: '1.8rem',
  fontWeight: '400',
  marginBottom: '1.2rem',
  labelId: '',
  customWidth: '',
}

export default Checkbox
