import React from 'react'
import PropTypes from 'prop-types'

import {
  ChartContainer,
  ChartRow,
  Percentage,
  QtyLabel,
  StartLabel,
} from './styles'
import Star from '~app/components/ui/icons/Star'

const Chart = ({ reviewsRates }) => {
  const data = {
    reviewsQty: reviewsRates.qty,
    rating: [
      { star: 5, qty: reviewsRates[5] || 0 },
      { star: 4, qty: reviewsRates[4] || 0 },
      { star: 3, qty: reviewsRates[3] || 0 },
      { star: 2, qty: reviewsRates[2] || 0 },
      { star: 1, qty: reviewsRates[1] || 0 },
    ],
  }

  return (
    <ChartContainer>
      {
        data.rating.map((rate, idx) => (
          <ChartRow key={idx}>
            <StartLabel>{rate.star}</StartLabel>
            <Star />
            <Percentage percentage={rate.qty > 0 ? (rate.qty * 100) / data.reviewsQty : 0}>
              <div />
            </Percentage>
            <QtyLabel>{rate.qty}</QtyLabel>
          </ChartRow>
        ))
      }
    </ChartContainer>
  )
}

Chart.propTypes = {
  reviewsRates: PropTypes.shape(),
}

Chart.defaultProps = {
  reviewsRates: {},
}

export default Chart
