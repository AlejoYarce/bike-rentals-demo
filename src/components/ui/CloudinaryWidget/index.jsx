import React, { useState, useEffect } from 'react'
import { noop } from 'lodash'
import PropTypes from 'prop-types'

import useCloudinary from '~app/components/hooks/useCloudinary'
import {
  CloudinaryWidgetContainer, ImagePreview, ImageRowContainer, TitleRow,
} from './styles'
import ResponsiveImage from '../ResponsiveImage'
import Button from '../Button'
import X from '../icons/X'

const CloudinaryWidget = ({
  uploadPreset,
  images,
  limit,
  updateImagesList,
  maxWidth,
  id,
  isSquare,
}) => {
  const [uploadWidget, latestPublicId] = useCloudinary(uploadPreset)
  const [showUploadButton, setShowUploadButton] = useState(true)

  useEffect(() => {
    setShowUploadButton(images.length < limit)
  }, [images])

  useEffect(() => {
    if (latestPublicId) {
      const newImages = [...images]
      newImages.push(latestPublicId)
      updateImagesList(newImages)
    }
  }, [latestPublicId])

  const deleteImage = (publicId) => {
    const newImages = [...images].filter((imageId) => imageId !== publicId)
    updateImagesList(newImages)
  }

  return (
    <CloudinaryWidgetContainer>
      <TitleRow>
        Images
        {showUploadButton && (
          <Button callback={uploadWidget?.open || noop} icon>
            <X className="plus-sign" />
          </Button>
        )}
      </TitleRow>
      <ImageRowContainer>
        {
          images.map((publicId, idx) => (
            <ImagePreview
              key={idx}
              id={id}
              isSquare={isSquare}
            >
              <ResponsiveImage
                publicId={publicId}
                maxWidth={maxWidth}
              />
              <Button
                callback={() => deleteImage(publicId)}
                ariaLabel="delete image"
                icon
              >
                <X />
              </Button>
            </ImagePreview>
          ))
        }
      </ImageRowContainer>
    </CloudinaryWidgetContainer>
  )
}

CloudinaryWidget.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  limit: PropTypes.number,
  updateImagesList: PropTypes.func,
  maxWidth: PropTypes.number,
  id: PropTypes.string,
  uploadPreset: PropTypes.string,
  isSquare: PropTypes.bool,
}

CloudinaryWidget.defaultProps = {
  images: [],
  limit: 10,
  updateImagesList: noop,
  maxWidth: 300,
  id: null,
  uploadPreset: '',
  isSquare: false,
}

export default CloudinaryWidget
