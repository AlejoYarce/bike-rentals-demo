import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Rating from '~app/components/Reviews/Rating'
import Title from '~app/components/ui/Title'
import ResponsiveImage from '~app/components/ui/ResponsiveImage'

import { theme } from '~app/styles/theme'
import { bikeProps } from '~app/utils/props'
import {
  CardContainer,
  ContentContainer,
  ButtonAction,
  Color,
  ExtraInfo,
  ImageContainer,
  NotActiveContainer,
} from './styles'
import { ROUTES } from '~app/utils/constants'

const BikeCard = (props) => {
  const {
    id,
    model,
    color,
    images,
    location,
    reviews,
    status,
  } = props

  const [imageToshow, setImageToshow] = useState(0)
  const router = useRouter()

  const goToDetails = () => router.push(`${ROUTES.BIKE}/${id}`)

  return (
    <CardContainer className="box-shadow">
      {!status && <NotActiveContainer><span>Not Available</span></NotActiveContainer>}
      <div>
        <ImageContainer
          onMouseEnter={() => (images.length > 1 ? setImageToshow(1) : setImageToshow(0))}
          onMouseLeave={() => setImageToshow(0)}
          isOnlyOne
        >
          <ResponsiveImage publicId={images ? images[imageToshow] : undefined} maxWidth={880} />
        </ImageContainer>

        <ContentContainer>
          <Title
            capitalize
            min={1.6}
            max={2}
            marginBottom="0.5rem"
            textAlign="left"
          >
            {model}
          </Title>

          <ExtraInfo>
            <Color style={{ backgroundColor: color }} />
            <span>{location}</span>
          </ExtraInfo>

          {reviews && (
            <Rating
              value={reviews.avg}
              reviews={reviews ? reviews.qty : 0}
              fontColor={theme.colors.primary.black}
              activeColor={theme.colors.primary.endeavour}
              emptyColor={theme.colors.primary.silver}
              showAvg
            />
          )}
        </ContentContainer>
      </div>
      {status && <ButtonAction onClick={goToDetails}>Book Now</ButtonAction>}
    </CardContainer>
  )
}

BikeCard.propTypes = bikeProps.isRequired

export default BikeCard
