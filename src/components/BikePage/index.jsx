import React from 'react'

import { bikeProps } from '~app/utils/props'
import MoreInfo from '~app/components/MoreInfo'
import BikeInfo from '~app/components/BikeInfo'
import {
  BikePageContainer,
  Banner,
  BikePageContent,
} from './styles'

const BikePage = ({ bikeData }) => (
  <>
    <Banner />
    <BikePageContainer>
      <BikePageContent>
        <MoreInfo bikeData={bikeData} />
        <BikeInfo bikeData={bikeData} />
      </BikePageContent>
    </BikePageContainer>
  </>
)

BikePage.propTypes = {
  bikeData: bikeProps.isRequired,
}

export default BikePage
