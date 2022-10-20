import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { increment } from 'firebase/firestore'
import StarRating from 'react-svg-star-rating'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { userProps } from '~app/utils/props'
import Title from '~app/components/ui/Title'
import { useResize } from '~app/components/hooks/useResize'
import {
  ActionsContainer,
  DashboardPagesContainer,
  ImageContainer,
  DataContainer,
} from './styles'
import Loader from '~app/components/ui/Loader'
import ResponsiveImage from '~app/components/ui/ResponsiveImage'
import { calculateRating, capitalize, formatDate } from '~app/utils/utils'
import Button from '~app/components/ui/Button'
import X from '~app/components/ui/icons/X'
import {
  deleteDocument, getAgendaByUser, getDocument, updateDocument,
} from '~app/lib/firebase/api'
import Star from '~app/components/ui/icons/Star'
import { COLLECTIONS, ROUTES } from '~app/utils/constants'
import Confirmation from '~app/components/ui/Modal/Confirmation'
import { theme } from '~app/styles/theme'
import { PageContainer } from '~app/styles/Layout'

const MyReservations = ({ user }) => {
  const { isMobile } = useResize()
  const router = useRouter()
  const [showLoading, setShowLoading] = useState(true)
  const [agendas, setAgendas] = useState([])
  const [agendaSelected, setAgendaSelected] = useState()
  const [showAddReview, setShowAddReview] = useState(false)
  const [showButtonLoading, setShowButtonLoading] = useState(false)
  const [rateValue, setRateValue] = useState()
  const [showCancelAgenda, setShowCancelAgenda] = useState(false)

  const setInitState = () => {
    setAgendaSelected()
    setShowAddReview(false)
    setShowButtonLoading(false)
    setRateValue()
    setShowCancelAgenda(false)
  }

  const loadUserAgend = async () => {
    setShowLoading(true)

    const result = await getAgendaByUser(user.id)

    setAgendas(result)
    setShowLoading(false)
  }

  useEffect(() => {
    if (user.id) {
      loadUserAgend()
    }
  }, [user.id])

  const rateBike = async () => {
    setShowButtonLoading(true)

    const bikeId = agendaSelected.bike.id
    let { reviews } = await getDocument(COLLECTIONS.BIKES, bikeId)
    if (reviews && reviews.qty) {
      reviews[rateValue] = reviews[rateValue] ? reviews[rateValue] + 1 : 1
    } else {
      reviews = { [rateValue]: 1, qty: 1 }
    }

    await updateDocument(
      COLLECTIONS.BIKES,
      {
        reviews: {
          avg: calculateRating(reviews),
          qty: increment(1),
          [rateValue]: increment(1),
        },
      },
      bikeId,
    )

    setInitState()

    toast.success('Bike Rated!', {
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  const openRateBike = (row) => {
    setAgendaSelected(row)
    setShowAddReview(true)
  }

  const openCancelAgenda = (row) => {
    setAgendaSelected(row)
    setShowCancelAgenda(true)
  }

  const cancelAgenda = async () => {
    setShowButtonLoading(true)

    await deleteDocument(COLLECTIONS.AGENDA, agendaSelected.id)

    const actualAgendas = [...agendas].filter((item) => item.id !== agendaSelected.id)
    setAgendas(actualAgendas)

    setInitState()

    toast.success('Event Cancelled!', {
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  const columns = [
    {
      name: '',
      selector: (row) => row.bike.images,
      width: '15rem',
      hide: 550,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => (
        <ImageContainer onClick={() => router.push(`${ROUTES.BIKE}/${row.bike.id}`)}>
          <ResponsiveImage publicId={row.bike.images[0]} maxWidth={200} />
        </ImageContainer>
      ),
    },
    {
      name: 'Model',
      selector: (row) => row.bike.model,
      width: isMobile ? '14rem' : '22rem',
      sortable: true,
      center: !isMobile,
      cell: (row) => capitalize(row.bike.model),
    },
    {
      name: 'Reservation',
      selector: (row) => row.start,
      width: isMobile ? '12.5rem' : '25rem',
      center: !isMobile,
      cell: (row) => {
        const start = formatDate(row.start.toDate(), isMobile ? 'MM/DD/YY' : 'MM/DD/YYYY')
        const end = formatDate(row.end.toDate(), isMobile ? 'MM/DD/YY' : 'MM/DD/YYYY')
        return `${start} to ${end}`
      },
    },
    {
      name: 'Actions',
      width: '9.5rem',
      center: true,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => (
        <ActionsContainer>
          <Button
            callback={() => openRateBike(row)}
            className="star"
            icon
          >
            <Star />
          </Button>
          <Button
            callback={() => openCancelAgenda(row)}
            className="delete"
            icon
          >
            <X />
          </Button>
        </ActionsContainer>
      ),
    },
  ]

  return (
    <PageContainer>
      <DashboardPagesContainer>
        <DataContainer>
          <Title
            marginTop="0"
            marginBottom="2rem"
            min={2.8}
            max={3.2}
          >
            My Reservations
          </Title>
          {
            showLoading
              ? <Loader />
              : (
                <div className="box-shadow">
                  <DataTable
                    columns={columns}
                    data={agendas}
                    highlightOnHover
                    noHeader
                    striped
                  />
                </div>
              )
          }
          {
            showAddReview && (
              <Confirmation
                type="blank"
                showConfirmation={showAddReview}
                noLabel="Cancel"
                yesLabel="Rate"
                yesColor={theme.colors.primary.endeavour}
                showLoader={showButtonLoading}
                disableYesButton={!rateValue}
                onClose={setInitState}
                onYes={rateBike}
                overrideIcon={<Star />}
                buttonsMarginTop="2rem"
              >
                <Title
                  marginBottom="1.2rem"
                  textAlign="center"
                  min={2}
                  max={2}
                >
                  Rate this Bike
                </Title>
                <StarRating
                  size={42}
                  initialRating={0}
                  innerRadius={14}
                  outerRadius={35}
                  handleOnClick={setRateValue}
                  hoverColor={theme.colors.primary.goldenTainoi}
                  activeColor={theme.colors.primary.endeavour}
                />
              </Confirmation>
            )
          }
          {
            showCancelAgenda && (
              <Confirmation
                type="danger"
                showConfirmation={showCancelAgenda}
                noLabel="No"
                yesLabel="Confirm"
                yesColor={theme.colors.primary.carnation}
                showLoader={showButtonLoading}
                onClose={setInitState}
                onYes={cancelAgenda}
                overrideIcon={<X />}
                buttonsMarginTop="2rem"
              >
                <Title
                  marginBottom="1.2rem"
                  textAlign="center"
                  min={2}
                  max={2}
                >
                  Want to cancel this event?
                </Title>
              </Confirmation>
            )
          }
        </DataContainer>
      </DashboardPagesContainer>
    </PageContainer>
  )
}

MyReservations.propTypes = {
  user: userProps.isRequired,
}

export default MyReservations
