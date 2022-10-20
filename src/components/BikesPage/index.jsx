import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { BikesDataContainer, BikesPageContainer } from './styles'
import { PageContainer } from '~app/styles/Layout'
import SideFilters from '~app/components/SideFilters'
import BikeCard from '~app/components/ui/BikeCard'
import { bikesDataProps } from '~app/utils/props'
import { getBikesByParams } from '~app/lib/firebase/api'
import Loader from '../ui/Loader'

const BikesPage = ({ bikesData, meta }) => {
  const [bikes, setBikes] = useState(bikesData)
  const [showLoading, setShowLoading] = useState(false)

  const filterBikes = async (data) => {
    setShowLoading(true)

    const result = await getBikesByParams(data)

    setShowLoading(false)
    setBikes(result)
  }

  const resetBikesList = () => setBikes(bikesData)

  return (
    <PageContainer>
      <BikesPageContainer>
        <SideFilters meta={meta} filterBikes={filterBikes} resetBikesList={resetBikesList} />
        {
          showLoading
            ? <Loader />
            : (
              <BikesDataContainer>
                {bikes.map((bike, idx) => (
                  <BikeCard key={idx} {...bike} />
                ))}
              </BikesDataContainer>
            )
        }
      </BikesPageContainer>
    </PageContainer>
  )
}

BikesPage.propTypes = {
  bikesData: bikesDataProps.isRequired,
  meta: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default BikesPage
