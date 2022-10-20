import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { noop } from 'lodash'

import {
  CustomIconButton,
  CustomIconContainer,
  FieldContainer,
  Hint,
  InlineButton,
  Input,
  InputLabel,
} from './styles'
import Hide from '~app/components/ui/icons/Hide'
import Show from '~app/components/ui/icons/Show'

const validRequired = (required, value) => (required ? value !== '' : true)

const validMatch = (pattern, value) => (pattern ? new RegExp(pattern).test(value) : true)

const validLimit = (limit, value) => (limit ? value.length <= limit : true)

const onChange = (props) => (e) => {
  const {
    onfieldChange,
    required,
    pattern,
    limit,
  } = props
  const { name, value } = e.target

  const valid = validRequired(required, value)
    && validMatch(pattern, value)
    && validLimit(limit, value)

  onfieldChange(name, value, valid)
}

const FormField = (props) => {
  const {
    placeholder,
    type,
    textAlign,
    name,
    value,
    showHint,
    hint,
    marginBottom,
    label,
    labelAlign,
    showInlineLabel,
    disabled,
    required,
    capitalize,
    showPasswordButton,
    customIcon,
    customIconButton,
    customIconButtonCallback,
    customIconHeight,
    moveIconToLeft,
    marginLeft,
    marginRight,
    hideLabel,
    onEnterKeyCallback,
    customWidth,
  } = props

  const [showPass, setShowPass] = useState(false)
  const [inputType, setInputType] = useState(type)

  const onKeyPress = (e) => {
    if ((e.key === 'enter' || e.key === 'Enter') && onEnterKeyCallback) {
      e.preventDefault()

      onEnterKeyCallback()
    }
  }

  return (
    <FieldContainer
      marginBottom={marginBottom}
      showInlineLabel={showInlineLabel}
      marginLeft={marginLeft}
      marginRight={marginRight}
      customWidth={customWidth}
    >
      <InputLabel
        htmlFor={name}
        labelAlign={labelAlign}
        required={required}
        hideLabel={hideLabel}
      >
        {label}
        {label && required && <strong>*</strong>}
      </InputLabel>
      <Input
        placeholder={placeholder}
        textAlign={textAlign}
        id={name}
        name={name}
        onChange={onChange(props)}
        onKeyPress={onKeyPress}
        value={value}
        disabled={disabled}
        capitalize={capitalize}
        {...props}
        type={inputType}
        aria-label={label || name}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />
      {
        showPasswordButton && (
          <InlineButton
            callback={() => {
              setShowPass(!showPass)
              setInputType(inputType === 'password' ? 'text' : 'password')
            }}
            ariaLabel="show pass"
            icon
          >
            {showPass ? <Hide /> : <Show />}
          </InlineButton>
        )
      }
      {
        customIcon && (
          <CustomIconContainer
            hasLabel={!!label && !hideLabel}
            moveIconToLeft={moveIconToLeft}
            customIconHeight={customIconHeight}
          >
            {customIcon}
          </CustomIconContainer>
        )
      }
      {
        customIconButton && (
          <CustomIconButton
            ariaLabel="custom icon button"
            callback={customIconButtonCallback}
            icon
          >
            {customIconButton}
          </CustomIconButton>
        )
      }
      {
        hint
          ? <Hint>{showHint ? hint : ''}</Hint>
          : null
      }
    </FieldContainer>
  )
}

FormField.propTypes = {
  customWidth: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  textAlign: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  showHint: PropTypes.bool,
  hint: PropTypes.string,
  marginBottom: PropTypes.string,
  label: PropTypes.string,
  labelAlign: PropTypes.string,
  showInlineLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  isTextArea: PropTypes.bool,
  textAreaRows: PropTypes.number,
  required: PropTypes.bool,
  capitalize: PropTypes.bool,
  showPasswordButton: PropTypes.bool,
  customIcon: PropTypes.node,
  customIconButton: PropTypes.node,
  customIconButtonCallback: PropTypes.func,
  customIconHeight: PropTypes.string,
  moveIconToLeft: PropTypes.bool,
  inputHeight: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  hideLabel: PropTypes.bool,
  onEnterKeyCallback: PropTypes.func,
}

FormField.defaultProps = {
  customWidth: '',
  textAlign: 'start',
  value: '',
  showHint: false,
  hint: '',
  marginBottom: '0.5rem',
  label: '',
  labelAlign: 'left',
  showInlineLabel: false,
  disabled: false,
  isTextArea: false,
  textAreaRows: 9,
  required: false,
  capitalize: false,
  inputHeight: '4.2',
  showPasswordButton: false,
  customIcon: null,
  customIconButton: null,
  customIconButtonCallback: noop,
  customIconHeight: '2rem',
  moveIconToLeft: false,
  marginLeft: '0',
  marginRight: '0',
  hideLabel: false,
  onEnterKeyCallback: noop,
}

export default FormField
