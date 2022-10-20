import React from 'react'
import axios from 'axios'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import { PageWrapper } from '~app/styles/Layout'
import PageHead from '~app/components/PageHead'
import Navbar from '~app/components/ui/Navbar'
import BikesPage from '~app/components/BikesPage'
import { bikesDataProps } from '~app/utils/props'
import { getProtocol } from '~app/utils/utils'

const Home = ({ bikesData, meta }) => (
  <PageWrapper>
    <PageHead title="Bike Rentals.co - Home Page" />
    <Navbar />
    <BikesPage bikesData={bikesData} meta={meta} />
  </PageWrapper>
)

Home.propTypes = {
  bikesData: bikesDataProps.isRequired,
  meta: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default Home

export async function getServerSideProps(props) {
  const { req: { headers } } = props
  const host = getProtocol(headers.host)

  const result = await axios.get(`${host || 'http://localhost:3000'}/api/get-bikes`)
  const bikesData = get(result, 'data.bikes', [])

  const metaResult = await axios.get(`${host || 'http://localhost:3000'}/api/get-meta`)
  const meta = get(metaResult, 'data.meta', [])

  return {
    props: {
      bikesData,
      meta,
    },
  }
}
