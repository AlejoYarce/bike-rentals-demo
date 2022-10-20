import { some } from 'lodash'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

import { addDocument, createAdminUser, updateAdminUser } from '~app/lib/firebase/api'
import { COLLECTIONS } from '~app/utils/constants'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import FormField from '../ui/FormField'
import {
  CreatorContainer,
  FormContainer,
  FormContainerRow,
} from './styles'
import { userProps } from '~app/utils/props'
import Title from '../ui/Title'
import { useResize } from '~app/components/hooks/useResize'

const UserCreator = ({ goBack, userSelected = {} }) => {
  const { isMobile } = useResize()
  const [fieldsData, setFieldsData] = useState({
    email: { value: userSelected.email || '', valid: userSelected.email || false },
    password: { value: userSelected.password || '', valid: userSelected.password || true },
    isAdmin: { value: userSelected.isAdmin || undefined, valid: userSelected.isAdmin || true },
    status: { value: userSelected.status || null, valid: userSelected.status || true },
  })
  const [isValidForm, setIsValidForm] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
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

  const onAddEditUser = async () => {
    if (isValidForm) {
      setShowLoading(true)
      setErrorMessage('')

      const email = fieldsData.email.value
      const password = fieldsData.password.value
      const isAdmin = fieldsData.isAdmin.value || false
      const status = fieldsData.status.value || false

      const userData = {
        email,
        isAdmin,
        status,
        createdAt: new Date(),
      }
      let userId = userSelected ? userSelected.id : undefined
      let result
      if (userId) {
        result = await updateAdminUser(userId, email)
      } else {
        result = await createAdminUser({
          email,
          password,
          providerId: 'password',
        })
        userId = result.uid || userId
      }
      userId = await addDocument(COLLECTIONS.USERS, userData, userId)

      setShowLoading(false)
      toast.success(userId ? 'User Edited!' : 'User Created', {
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })

      goBack({
        id: userId,
        email,
        isAdmin,
        status,
      })
    }
  }

  return (
    <CreatorContainer>
      <Title min={2} max={2.4} marginTop="2rem">
        {userSelected && userSelected.id ? 'Edit User' : 'Create User'}
      </Title>
      <FormContainer>
        <FormContainerRow marginBottom="3rem">
          <FormField
            type="text"
            name="email"
            label="Email"
            placeholder="Email"
            onfieldChange={onfieldChange}
            value={fieldsData.email.value}
            showHint={!!fieldsData.email.value && !fieldsData.email.valid}
            hint="Enter a valid text"
            customWidth={isMobile || userSelected.id ? '100%' : '48%'}
            required
          />
          {!userSelected.id && (
            <FormField
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              onfieldChange={onfieldChange}
              value={fieldsData.password.value}
              showHint={!!fieldsData.password.value && !fieldsData.password.valid}
              customWidth={isMobile ? '100%' : '48%'}
              showPasswordButton
              required
            />
          )}
        </FormContainerRow>
        <FormContainerRow marginBottom="3rem">
          <Checkbox
            name="isAdmin"
            label="Admin"
            fontSize="1.6rem"
            fontWeight="700"
            onChange={onfieldChange}
            value={fieldsData.isAdmin.value}
            customWidth={isMobile ? '100%' : '48%'}
          />
          <Checkbox
            name="status"
            label="Active"
            fontSize="1.6rem"
            fontWeight="700"
            onChange={onfieldChange}
            value={fieldsData.status.value}
            customWidth={isMobile ? '100%' : '48%'}
          />
        </FormContainerRow>
        <Button
          callback={onAddEditUser}
          disabled={!isValidForm || showLoading || !!errorMessage}
          showLoader={showLoading}
        >
          {userSelected && userSelected.id ? 'Edit' : 'Create'}
        </Button>
      </FormContainer>
    </CreatorContainer>
  )
}

UserCreator.propTypes = {
  goBack: PropTypes.func.isRequired,
  userSelected: userProps,
}

UserCreator.defaultProps = {
  userSelected: {},
}

export default UserCreator
