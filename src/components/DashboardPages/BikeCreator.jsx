import { some } from 'lodash'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

import { addDocument } from '~app/lib/firebase/api'
import { COLLECTIONS } from '~app/utils/constants'
import Button from '../ui/Button'
import Checkbox from '../ui/Checkbox'
import FormField from '../ui/FormField'
import {
  CreatorContainer,
  FormContainer,
  FormContainerRow,
  ImagesContainer,
} from './styles'
import { bikeProps } from '~app/utils/props'
import Title from '../ui/Title'
import CloudinaryWidget from '../ui/CloudinaryWidget'
import ColorPicker from '../ui/ColorPicker'
import { useResize } from '~app/components/hooks/useResize'
import { getQuerableString } from '~app/utils/utils'

const BikeCreator = ({ goBack, bikeSelected = {} }) => {
  const { isMobile } = useResize()
  const [fieldsData, setFieldsData] = useState({
    model: { value: bikeSelected.model || '', valid: bikeSelected.model || false },
    color: { value: bikeSelected.color || undefined, valid: bikeSelected.color || false },
    images: { value: bikeSelected.images || [], valid: bikeSelected.images || true },
    location: { value: bikeSelected.location || '', valid: bikeSelected.location || false },
    status: { value: bikeSelected.status || null, valid: bikeSelected.status || true },
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

  const onAddEditBike = async () => {
    if (isValidForm) {
      setShowLoading(true)
      setErrorMessage('')

      const model = fieldsData.model.value
      const color = fieldsData.color.value
      const images = fieldsData.images.value
      const location = fieldsData?.location?.value?.toLowerCase() || ''
      const status = fieldsData.status.value

      const bikeData = {
        model,
        queryModel: getQuerableString(model),
        color,
        images,
        location,
        status,
        createdAt: new Date(),
      }
      const id = bikeSelected ? bikeSelected.id : undefined
      const newId = await addDocument(COLLECTIONS.BIKES, bikeData, id)

      await addDocument(COLLECTIONS.META, { [location]: true }, 'locations')
      await addDocument(COLLECTIONS.META, { [color]: true }, 'colors')

      setShowLoading(false)
      toast.success(id ? 'Bike Edited!' : 'Bike Created', {
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })

      goBack({
        id: newId,
        model,
        color,
        images,
        location,
        status,
      })
    }
  }

  return (
    <CreatorContainer>
      <Title min={2} max={2.4} marginTop="2rem">
        {bikeSelected && bikeSelected.id ? 'Edit Bike' : 'Create Bike'}
      </Title>
      <FormContainer>
        <FormContainerRow>
          <FormField
            type="text"
            name="model"
            label="Model"
            placeholder="Model"
            onfieldChange={onfieldChange}
            value={fieldsData.model.value}
            showHint={!!fieldsData.model.value && !fieldsData.model.valid}
            hint="Enter a valid text"
            customWidth={isMobile ? '100%' : '48%'}
            required
          />
          <FormField
            type="text"
            name="location"
            label="Location"
            placeholder="Location"
            onfieldChange={onfieldChange}
            value={fieldsData.location.value}
            showHint={!!fieldsData.location.value && !fieldsData.location.valid}
            hint="Enter a valid text"
            customWidth={isMobile ? '100%' : '48%'}
            required
          />
        </FormContainerRow>
        <FormContainerRow>
          <ColorPicker
            color={fieldsData.color.value}
            onColorChanged={(value) => onfieldChange('color', value, true)}
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
        <ImagesContainer>
          <CloudinaryWidget
            id="images"
            images={fieldsData?.images?.value || []}
            limit={10}
            updateImagesList={(newImages) => onfieldChange('images', newImages, true)}
            maxWidth={300}
          />
        </ImagesContainer>
        <Button
          callback={onAddEditBike}
          disabled={!isValidForm || showLoading || !!errorMessage}
          showLoader={showLoading}
        >
          {bikeSelected && bikeSelected.id ? 'Edit' : 'Create'}
        </Button>
      </FormContainer>
    </CreatorContainer>
  )
}

BikeCreator.propTypes = {
  goBack: PropTypes.func.isRequired,
  bikeSelected: bikeProps,
}

BikeCreator.defaultProps = {
  bikeSelected: {},
}

export default BikeCreator
