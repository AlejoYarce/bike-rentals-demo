import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Login from './Login'
import CreateAccount from './CreateAccount'
import { Content } from './styles'
import { uiSelector } from '~app/store/selectors/ui'

const Form = () => {
  const uiState = useSelector(uiSelector)
  const [formToShow, setFormToShow] = useState('Login')
  const [extraProps, setExtraProps] = useState({})

  const handleSwitch = (value = 'Login', otherProps) => {
    setFormToShow(value)
    setExtraProps(otherProps || {})
  }

  useEffect(() => {
    if (!uiState.showAuth) {
      handleSwitch()
    }
  }, [uiState.showAuth])

  const handleForm = () => {
    switch (formToShow) {
      case 'CreateAccount':
        return <CreateAccount handleSwitch={handleSwitch} {...extraProps} />
      default:
        return <Login handleSwitch={handleSwitch} />
    }
  }

  return uiState.showAuth && <Content>{handleForm()}</Content>
}

export default Form
