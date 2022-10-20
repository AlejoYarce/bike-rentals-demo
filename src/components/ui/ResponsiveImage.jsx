import React from 'react'
import Img from 'react-cloudinary-lazy-image'
import PropTypes from 'prop-types'
import Image from 'next/image'

const ResponsiveImage = ({ publicId, maxWidth, urlParams }) => {
  if (publicId.indexOf('http') > -1) {
    return (
      <Image
        src={publicId}
        alt={publicId?.replace('/', '')}
        loading="lazy"
      />
    )
  }

  return (
    <Img
      cloudName="alejo-training"
      imageName={publicId}
      urlParams={urlParams}
      alt={publicId?.replace('/', '')}
      fluid={{
        maxWidth,
      }}
    />
  )
}

ResponsiveImage.propTypes = {
  publicId: PropTypes.string,
  urlParams: PropTypes.string,
  maxWidth: PropTypes.number,
}

ResponsiveImage.defaultProps = {
  publicId: 'common/DefaultBikeImage',
  urlParams: 'g_face,c_lfill',
  maxWidth: 500,
}

export default ResponsiveImage
