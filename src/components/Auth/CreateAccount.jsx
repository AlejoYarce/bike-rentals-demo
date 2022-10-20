import React, { useState } from 'react'
import { some, noop } from 'lodash'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { css } from '@emotion/react'

import Title from '~app/components/ui/Title'
import { theme } from '~app/styles/theme'
import Button from '~app/components/ui/Button'
import FormField from '~app/components/ui/FormField'
import { patterns } from '~app/utils/utils'
import Checkbox from '~app/components/ui/Checkbox'
import useFirebase from '~app/lib/firebase/client'
import UIactions from '~app/store/actions/ui'
import BikeRentalsLogo from '~app/components/ui/icons/BikeRentalsLogo'
// import Google from '~app/components/ui/icons/Google'
// import Facebook from '~app/components/ui/icons/Facebook'
import {
  ErrorMessage,
  OtherOptions,
  Separator,
  LogoImg,
} from './styles'

const CreateAccount = ({ handleSwitch }) => {
  const { doCreateUserWithPass } = useFirebase()
  const dispatch = useDispatch()
  const [showLoading, setShowLoading] = useState(false)
  const [isValidForm, setIsValidForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldsData, setFieldsData] = useState({
    email: { valid: false },
    password: { valid: false },
    isAdmin: { value: false, valid: true },
  })

  const onfieldChange = (name, value, valid) => {
    const newFieldsData = {
      ...fieldsData,
      [name]: { value, valid },
    }

    if (name === 'email') {
      newFieldsData[name].value = value ? value.toLowerCase() : ''
    }

    setFieldsData(newFieldsData)
    setIsValidForm(!some(newFieldsData, ['valid', false]))
    setErrorMessage('')
  }

  const doCreateUser = async () => {
    if (isValidForm) {
      setShowLoading(true)
      setErrorMessage('')

      const email = fieldsData.email.value
      const pass = fieldsData.password.value
      const isAdmin = fieldsData.isAdmin.value
      const userData = {
        email,
        isAdmin,
        createdAt: new Date(),
        status: true,
      }
      const result = await doCreateUserWithPass(email, pass, userData)

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
        Create Account
      </Title>
      {/* <Separator
        color={theme.colors.primary.black}
        marginbottom="0"
      >
        Use your Social Media
      </Separator>
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
      <FormField
        type="text"
        name="email"
        label="Email"
        placeholder="Email"
        onfieldChange={onfieldChange}
        pattern={patterns.email}
        value={fieldsData.email.value}
        showHint={!!fieldsData.email.value && !fieldsData.email.valid}
        hint="Enter a valid email"
        required
      />
      <FormField
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        onfieldChange={onfieldChange}
        pattern={patterns.password}
        value={fieldsData.password.value}
        showHint={!!fieldsData.password.value && !fieldsData.password.valid}
        hint="at least 8 characters with uppercase letters and numbers"
        showPasswordButton
        required
      />
      <Checkbox
        name="isAdmin"
        label="Admin"
        fontSize="1.6rem"
        fontWeight="700"
        onChange={onfieldChange}
        value={fieldsData.isAdmin.value}
      />
      <Button
        callback={doCreateUser}
        customClass={css`margin-top: 2rem;`}
        disabled={!isValidForm || showLoading || !!errorMessage}
        showLoader={showLoading}
      >
        Create
      </Button>
      {errorMessage && <ErrorMessage marginBottom={0}>{errorMessage}</ErrorMessage>}
      <OtherOptions>
        <Separator>¿Have an Acccount?</Separator>
        <Button
          callback={() => handleSwitch()}
          stroked
        >
          Sign In
        </Button>
      </OtherOptions>
    </>
  )
}

CreateAccount.propTypes = {
  handleSwitch: PropTypes.func,
}

CreateAccount.defaultProps = {
  handleSwitch: noop,
}

export default CreateAccount
