import React from 'react'

import { bikeProps } from '~app/utils/props'
import { MoreInfoContainer, WhiteCardContainer } from './styles'
import Availability from '~app/components/Availability'
import Reviews from '~app/components/Reviews'

const MoreInfo = ({ bikeData }) => (
  <MoreInfoContainer>
    <WhiteCardContainer className="box-shadow">
      <Availability />
    </WhiteCardContainer>
    <WhiteCardContainer className="box-shadow">
      <Reviews bikeData={bikeData} />
    </WhiteCardContainer>
  </MoreInfoContainer>
)

MoreInfo.propTypes = {
  bikeData: bikeProps.isRequired,
}

export default MoreInfo
