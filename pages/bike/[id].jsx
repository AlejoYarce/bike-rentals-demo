import React from 'react'
import axios from 'axios'
import { get } from 'lodash'

import { PageWrapper } from '~app/styles/Layout'
import PageHead from '~app/components/PageHead'
import Navbar from '~app/components/ui/Navbar'
import { bikeProps } from '~app/utils/props'
import BikePage from '~app/components/BikePage'
import { getProtocol } from '~app/utils/utils'
import { ROUTES } from '~app/utils/constants'

const Bike = ({ bikeData }) => (
  <PageWrapper>
    <PageHead title="Bike Rentals.co - Bike Page" />
    <Navbar />
    <BikePage bikeData={bikeData} />
  </PageWrapper>
)

Bike.propTypes = {
  bikeData: bikeProps.isRequired,
}

export default Bike

export async function getServerSideProps(ctx) {
  const { params: { id }, req: { headers } } = ctx
  const host = getProtocol(headers.host)

  if (id) {
    const result = await axios.get(`${host || 'http://localhost:3000'}/api/get-bike?id=${id}`)
    const bikeData = get(result, 'data.bike', {})

    if (bikeData.status) {
      return {
        props: {
          bikeData,
        },
      }
    }

    ctx.res.writeHead(302, { Location: ROUTES.HOME })
    ctx.res.end()

    return {
      props: {},
    }
  }

  return {
    props: {},
  }
}
