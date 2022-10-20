import { useState, useEffect } from 'react'

const configuration = {
  cloudName: 'alejo-training',
  uploadPreset: 'rental_bikes_preset',
  multiple: false,
  cropping: true,
  clientAllowedFormats: ['png', 'jpeg'],
  maxImageFileSize: 10000000,
}

let localPublicId = ''

const useCloudinary = (uploadPreset) => {
  const [uploadWidget, setUploadWidget] = useState()
  const [latestPublicId, setLatestPublicId] = useState('')

  const uploadedImageHandler = (error, result) => {
    const publicId = result?.info?.public_id || ''

    if (result) {
      if (!error && result.event === 'success' && !!publicId) {
        localPublicId = publicId
      } else if (!error && result.event === 'close' && localPublicId) {
        setLatestPublicId(localPublicId)
        localPublicId = ''
      }
    }
  }

  const instanceWidget = () => {
    const widget = window.cloudinary.createUploadWidget({
      ...configuration,
      uploadPreset: uploadPreset || configuration.uploadPreset,
    }, uploadedImageHandler)

    setTimeout(() => {
      setUploadWidget(widget)
    }, 300)
  }

  useEffect(() => {
    if (window && window.cloudinary) {
      instanceWidget()
    }
  }, [])

  return [uploadWidget, latestPublicId]
}

export default useCloudinary
