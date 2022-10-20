import React from 'react'
import nookies from 'nookies'

import { PageWrapper } from '~app/styles/Layout'
import PageHead from '~app/components/PageHead'
import Navbar from '~app/components/ui/Navbar'
import { BIKE_RENTALS_COOKIE, COLLECTIONS, ROUTES } from '~app/utils/constants'
import { getDocument } from '~app/lib/firebase/api'
import AdminUsers from '~app/components/DashboardPages/AdminUsers'

const UsersDashboard = () => (
  <PageWrapper>
    <PageHead />
    <Navbar />
    <AdminUsers />
  </PageWrapper>
)

export default UsersDashboard

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)
  const uid = cookies[BIKE_RENTALS_COOKIE]
  if (!uid) {
    ctx.res.writeHead(302, { Location: ROUTES.HOME })
    ctx.res.end()

    return {
      props: {},
    }
  }

  const data = await getDocument(COLLECTIONS.USERS, uid)
  const user = {
    ...data,
    createdAt: data.createdAt ? data.createdAt.toDate().toString() : null,
  }

  if (!user || !user.isAdmin) {
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
