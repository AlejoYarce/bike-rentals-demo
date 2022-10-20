import React from 'react'

import { DetailsInfoContainer } from './styles'
import { bikeProps } from '~app/utils/props'
import Header from './Header'
import SchedulerContainer from '~app/components/SchedulerContainer'

const BikeInfo = ({ bikeData }) => (
  <DetailsInfoContainer>
    <Header bikeData={bikeData} />
    <SchedulerContainer bikeData={bikeData} />
  </DetailsInfoContainer>
)

BikeInfo.propTypes = {
  bikeData: bikeProps.isRequired,
}

export default BikeInfo
