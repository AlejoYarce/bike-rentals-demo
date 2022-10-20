import React from 'react'

import {
  Description,
  RatingSummary,
  Separator,
} from './styles'
import { bikeProps } from '~app/utils/props'
import Title from '~app/components/ui/Title'
import Rating from './Rating'
import Chart from './Chart'

const Reviews = ({ bikeData }) => {
  const { reviews } = bikeData

  return (
    <>
      <Title
        marginBottom="2rem"
        min={1.6}
        max={1.6}
      >
        Reviews
      </Title>
      <Description>
        Reviews are very important for us at Bike Rentals.co.
        Take your time and tell us about your expierence.
      </Description>
      <Separator />
      <RatingSummary>
        <Rating
          value={reviews?.avg || 0}
          reviews={reviews?.qty || 0}
        />
      </RatingSummary>
      <Chart reviewsRates={reviews} />
    </>
  )
}

Reviews.propTypes = {
  bikeData: bikeProps.isRequired,
}

export default Reviews
