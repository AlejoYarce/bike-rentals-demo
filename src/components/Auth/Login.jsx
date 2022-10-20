import React, { useState } from 'react'
import { some, noop } from 'lodash'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/react'

import Title from '~app/components/ui/Title'
import { theme } from '~app/styles/theme'
import FormField from '~app/components/ui/FormField'
import Button from '~app/components/ui/Button'
import { patterns } from '~app/utils/utils'
import BikeRentalsLogo from '~app/components/ui/icons/BikeRentalsLogo'
import useFirebase from '~app/lib/firebase/client'
import UIactions from '~app/store/actions/ui'
// import Google from '~app/components/ui/icons/Google'
// import Facebook from '~app/components/ui/icons/Facebook'
import {
  ErrorMessage,
  LogoImg,
  OtherOptions,
  Separator,
} from './styles'

const LoginForm = ({ handleSwitch }) => {
  const { doLoginWithPass } = useFirebase()
  const dispatch = useDispatch()
  const [showLoading, setShowLoading] = useState(false)
  const [fieldsData, setFieldsData] = useState({
    email: { valid: false },
    password: { valid: false },
  })
  const [isValidForm, setIsValidForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onfieldChange = (name, value, valid) => {
    const newFieldsData = {
      ...fieldsData,
      [name]: { value, valid },
    }

    setFieldsData(newFieldsData)
    setIsValidForm(!some(newFieldsData, ['valid', false]))
    setErrorMessage('')
    setShowLoading(false)
  }

  const doUserPassLogin = async () => {
    if (isValidForm) {
      setShowLoading(true)
      setErrorMessage('')

      const email = fieldsData.email.value
      const pass = fieldsData.password.value
      const result = await doLoginWithPass(email, pass)

      setShowLoading(false)
      if (result && result.error) {
        setErrorMessage(result.errorMessage)
      } else {
        dispatch(UIactions.setShowAuth({ showAuth: false }))
      }
    }
  }

  // const doLoginWitSocial = async (provider) => {
  //   setShowLoading(true)
  //   setErrorMessage('')

  //   let result
  //   if (provider && provider === 'google') {
  //     result = await doLoginWithGoogle()
  //   } else if (provider && provider === 'facebook') {
  //     result = await doLoginWithFacebook()
  //   }

  //   setShowLoading(false)

  //   if (result && result.error) {
  //     setErrorMessage(result.errorMessage)
  //   } else {
  //     dispatch(UIactions.setShowAuth({ showAuth: false }))
  //   }
  // }

  return (
    <>
      <LogoImg>
        <BikeRentalsLogo /> Bike Rentals.co
      </LogoImg>
      <Title
        marginBottom="1rem"
        color={theme.colors.primary.endeavour}
        min={2.2}
        max={2.5}
      >
        Sign In
      </Title>
      <FormField
        type="text"
        name="email"
        label="Email"
        placeholder="Email"
        onfieldChange={onfieldChange}
        pattern={patterns.email}
        value={fieldsData.email.value}
        showHint={fieldsData.email.value && !fieldsData.email.valid}
        hint="Enter a valid email"
        onEnterKeyCallback={doUserPassLogin}
        required
      />
      <FormField
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        onfieldChange={onfieldChange}
        value={fieldsData.password.value}
        showHint={fieldsData.password.value && !fieldsData.password.valid}
        onEnterKeyCallback={doUserPassLogin}
        showPasswordButton
        required
      />
      <Button
        callback={doUserPassLogin}
        disabled={!isValidForm || showLoading || !!errorMessage}
        showLoader={showLoading}
        customClass={css`margin-top: 2rem;`}
      >
        Sign In
      </Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {/* <Separator>or use your Social Media</Separator>
      <SocialContainer>
        <Button
          callback={() => doLoginWitSocial('google')}
          ariaLabel="Google Login"
          icon
        >
          <Google />
        </Button>
        <Button
          callback={() => doLoginWitSocial('facebook')}
          ariaLabel="Facebook Login"
          icon
        >
          <Facebook />
        </Button>
      </SocialContainer> */}
      <OtherOptions>
        <Separator color={theme.colors.primary.endeavour}>
          {'¿Don\'t have an Account?'}
        </Separator>
        <Button
          callback={() => handleSwitch('CreateAccount')}
          stroked
        >
          Create Account
        </Button>
      </OtherOptions>
    </>
  )
}

LoginForm.propTypes = {
  handleSwitch: PropTypes.func,
}

LoginForm.defaultProps = {
  handleSwitch: noop,
}

export default LoginForm
