import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useRouter } from 'next/router'
import { get } from 'lodash'
import { toast } from 'react-toastify'

import Title from '~app/components/ui/Title'
import { useResize } from '~app/components/hooks/useResize'
import {
  ActionsContainer,
  ChildContainer,
  ColorPreview,
  DashboardPagesContainer,
  DataContainer,
  ImageContainer,
  ManageContainer,
} from './styles'
import Loader from '~app/components/ui/Loader'
import ResponsiveImage from '~app/components/ui/ResponsiveImage'
import { capitalize } from '~app/utils/utils'
import Button from '~app/components/ui/Button'
import X from '~app/components/ui/icons/X'
import {
  deleteDocument, getAgendaByBike, getDocuments,
} from '~app/lib/firebase/api'
import { COLLECTIONS, ROUTES } from '~app/utils/constants'
import Confirmation from '~app/components/ui/Modal/Confirmation'
import { theme } from '~app/styles/theme'
import { PageContainer } from '~app/styles/Layout'
import CheckedCircle from '../ui/icons/CheckedCircle'
import Edit from '../ui/icons/Edit'
import BikeCreator from './BikeCreator'
import UserIcon from '../ui/icons/UserIcon'
import UsersAndBikes from './UsersAndBikes'

const AdminBikes = () => {
  const { isMobile } = useResize()
  const router = useRouter()
  const [showLoading, setShowLoading] = useState(true)
  const [bikes, setBikes] = useState([])
  const [bikeSelected, setBikeSelected] = useState()
  const [showButtonLoading, setShowButtonLoading] = useState(false)
  const [showDeleteBike, setShowDeleteBike] = useState(false)
  const [showBikeCreator, setShowBikeCreator] = useState(false)
  const [showUsersAndBikes, setShowUsersAndBikes] = useState(false)

  const setInitState = () => {
    setBikeSelected()
    setShowButtonLoading(false)
    setShowDeleteBike(false)
    setShowBikeCreator(false)
    setShowUsersAndBikes(false)
  }

  const loadBikes = async () => {
    setShowLoading(true)

    const result = await getDocuments(COLLECTIONS.BIKES)

    setBikes(result)
    setShowLoading(false)
  }

  useEffect(() => {
    loadBikes()
  }, [])

  const openUsersAndBikes = (row) => {
    setBikeSelected(row)
    setShowUsersAndBikes(true)
  }

  const openBikeCreator = (row) => {
    setBikeSelected(row)
    setShowBikeCreator(true)
  }

  const openDeleteBike = (row) => {
    setBikeSelected(row)
    setShowDeleteBike(true)
  }

  const deleteBike = async () => {
    setShowButtonLoading(true)

    await deleteDocument(COLLECTIONS.BIKES, bikeSelected.id)

    const actualBikes = [...bikes].filter((item) => item.id !== bikeSelected.id)
    setBikes(actualBikes)

    setInitState()
    toast.success('Bike Deleted!', {
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
      selector: (row) => row.images,
      width: '15rem',
      hide: 550,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => (
        <ImageContainer onClick={() => router.push(`${ROUTES.BIKE}/${row.id}`)}>
          <ResponsiveImage publicId={get(row, 'images[0]', undefined)} maxWidth={200} />
        </ImageContainer>
      ),
    },
    {
      name: 'Model',
      selector: (row) => row.model,
      width: isMobile ? '15rem' : '22rem',
      sortable: true,
      cell: (row) => capitalize(row.model),
    },
    {
      name: 'Color',
      selector: (row) => row.color,
      width: isMobile ? '5.5rem' : '12rem',
      sortable: true,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => <ColorPreview color={row.color} />,
    },
    {
      name: 'Rate',
      selector: (row) => (row.reviews ? row.reviews.avg : ''),
      width: isMobile ? '4.9rem' : '12rem',
      sortable: true,
      cell: (row) => row?.reviews?.avg?.toFixed(1),
    },
    {
      name: 'Active',
      selector: (row) => row.status,
      width: isMobile ? '4.9rem' : '12rem',
      hide: 768,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => row.status && <CheckedCircle />,
    },
    {
      name: 'Actions',
      width: isMobile ? '10rem' : '12rem',
      center: true,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => (
        <ActionsContainer>
          <Button callback={() => openUsersAndBikes(row)} icon>
            <UserIcon />
          </Button>
          <Button callback={() => openBikeCreator(row)} icon>
            <Edit />
          </Button>
          <Button callback={() => openDeleteBike(row)} className="delete" icon>
            <X />
          </Button>
        </ActionsContainer>
      ),
    },
  ]

  const onGoBack = (newData) => {
    setShowBikeCreator(false)
    setShowUsersAndBikes(false)

    if (newData) {
      const {
        id, model, color, images, location, status,
      } = newData
      if (bikeSelected && bikeSelected.id) {
        const actualBikes = [...bikes].map((item) => {
          if (item.id === bikeSelected.id) {
            return {
              ...item,
              model,
              color,
              images,
              location,
              status,
            }
          }

          return item
        })
        setBikes(actualBikes)
      } else {
        const actualBikes = [...bikes]
        actualBikes.unshift({
          id,
          model,
          color,
          images,
          location,
          status,
        })
        setBikes(actualBikes)
      }
    }
  }

  return (
    <PageContainer>
      <DashboardPagesContainer>
        <DataContainer>
          <ManageContainer>
            <Title min={2.8} max={3.2}>Manage Bikes</Title>
            <Button
              callback={showBikeCreator || showUsersAndBikes ? onGoBack : openBikeCreator}
              strokedColor={theme.colors.primary.endeavour}
              customWidth="5rem"
              stroked={!showBikeCreator && !showUsersAndBikes}
              icon={showBikeCreator || showUsersAndBikes}
            >
              <X className={showBikeCreator || showUsersAndBikes ? 'x-sign' : 'plus-sign'} />
            </Button>
          </ManageContainer>
          {
            showLoading
              ? <Loader />
              : (
                <ChildContainer className="box-shadow">
                  {showBikeCreator && (
                    <BikeCreator goBack={onGoBack} bikeSelected={bikeSelected} />
                  )}
                  {showUsersAndBikes && (
                    <UsersAndBikes
                      id={bikeSelected?.id}
                      queryCallback={getAgendaByBike}
                      title="Users by this Bike"
                    />
                  )}
                  {!showBikeCreator && !showUsersAndBikes && (
                    <DataTable
                      columns={columns}
                      data={bikes}
                      highlightOnHover
                      noHeader
                      striped
                    />
                  )}
                </ChildContainer>
              )
          }
          {
            showDeleteBike && (
              <Confirmation
                type="danger"
                showConfirmation={showDeleteBike}
                noLabel="No"
                yesLabel="Confirm"
                yesColor={theme.colors.primary.carnation}
                showLoader={showButtonLoading}
                onClose={setInitState}
                onYes={deleteBike}
                overrideIcon={<X />}
                buttonsMarginTop="2rem"
              >
                <Title
                  marginBottom="1.2rem"
                  textAlign="center"
                  min={2}
                  max={2}
                >
                  Want to delete this bike?
                </Title>
              </Confirmation>
            )
          }
        </DataContainer>
      </DashboardPagesContainer>
      <script async src="https://widget.cloudinary.com/v2.0/global/all.js" />
    </PageContainer>
  )
}

export default AdminBikes
