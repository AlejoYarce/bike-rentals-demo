import React from 'react'
import StarRating from 'react-svg-star-rating'
import PropTypes from 'prop-types'
import { RatingContainer, ReviewsContainer, StarsContainer } from './styles'
import { theme } from '~app/styles/theme'

const calculateRate = (rate) => {
  if (rate === 0) {
    return 1
  }

  const floor = Math.floor(rate)
  const diff = rate - floor

  if (diff === 0) {
    return rate
  }

  return floor
}

const Rating = (props) => {
  const {
    value,
    reviews,
    noPaddingTop,
    center,
    fontColor,
    activeColor,
    emptyColor,
    showAvg,
  } = props

  return (
    <RatingContainer noPaddingTop={noPaddingTop} center={center}>
      {
        reviews > 0 && (
          <StarsContainer>
            <StarRating
              initialRating={calculateRate(value)}
              innerRadius={17}
              outerRadius={35}
              activeColor={activeColor || theme.colors.primary.endeavour}
              emptyColor={emptyColor || theme.colors.primary.silver}
              isHalfRating
              isReadOnly
            />
          </StarsContainer>
        )
      }
      <ReviewsContainer fontColor={fontColor} showAvg>
        {
          showAvg
            ? <span>{value.toFixed(1)}</span>
            : (
              <>
                <span>{reviews.toLocaleString('en-US')}</span>
                <span>Reviews</span>
              </>
            )
        }
      </ReviewsContainer>
    </RatingContainer>
  )
}

Rating.propTypes = {
  value: PropTypes.number,
  reviews: PropTypes.number,
  noPaddingTop: PropTypes.bool,
  center: PropTypes.bool,
  fontColor: PropTypes.string,
  activeColor: PropTypes.string,
  emptyColor: PropTypes.string,
  showAvg: PropTypes.bool,
}

Rating.defaultProps = {
  value: 0,
  reviews: 0,
  noPaddingTop: false,
  center: false,
  fontColor: '',
  activeColor: '',
  emptyColor: '',
  showAvg: false,
}

export default Rating
