import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'

import Title from '~app/components/ui/Title'
import { useResize } from '~app/components/hooks/useResize'
import {
  ActionsContainer,
  ChildContainer,
  DashboardPagesContainer,
  DataContainer,
  ManageContainer,
} from './styles'
import Loader from '~app/components/ui/Loader'
import Button from '~app/components/ui/Button'
import X from '~app/components/ui/icons/X'
import {
  deleteAdminUser,
  deleteDocument, getAgendaByUser, getDocuments,
} from '~app/lib/firebase/api'
import { COLLECTIONS } from '~app/utils/constants'
import Confirmation from '~app/components/ui/Modal/Confirmation'
import { theme } from '~app/styles/theme'
import { PageContainer } from '~app/styles/Layout'
import CheckedCircle from '../ui/icons/CheckedCircle'
import Edit from '../ui/icons/Edit'
import BikeRentalsLogo from '../ui/icons/BikeRentalsLogo'
import UsersAndBikes from './UsersAndBikes'
import UserCreator from './UserCreator'

const AdminUsers = () => {
  const { isMobile } = useResize()
  const [showLoading, setShowLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [userSelected, setUserSelected] = useState()
  const [showButtonLoading, setShowButtonLoading] = useState(false)
  const [showDeleteUser, setShowDeleteUser] = useState(false)
  const [showUserCreator, setShowUserCreator] = useState(false)
  const [showUsersAndBikes, setShowUsersAndBikes] = useState(false)

  const setInitState = () => {
    setUserSelected()
    setShowButtonLoading(false)
    setShowDeleteUser(false)
    setShowUserCreator(false)
    setShowUsersAndBikes(false)
  }

  const loadUsers = async () => {
    setShowLoading(true)

    const result = await getDocuments(COLLECTIONS.USERS)

    setUsers(result)
    setShowLoading(false)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const openBikesByUser = (row) => {
    setUserSelected(row)
    setShowUsersAndBikes(true)
  }

  const openUserCreator = (row) => {
    setUserSelected(row)
    setShowUserCreator(true)
  }

  const openDeleteUser = (row) => {
    setUserSelected(row)
    setShowDeleteUser(true)
  }

  const deleteUser = async () => {
    setShowButtonLoading(true)

    await deleteAdminUser(userSelected.id)
    await deleteDocument(COLLECTIONS.USERS, userSelected.id)

    const actualUser = [...users].filter((item) => item.id !== userSelected.id)
    setUsers(actualUser)

    setInitState()
    toast.success('User Deleted!', {
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
      name: 'Email',
      selector: (row) => row.email,
      width: isMobile ? '16rem' : '35rem',
      sortable: true,
      style: { 'white-space': 'unset' },
    },
    {
      name: 'Admin',
      selector: (row) => row.isAdmin,
      width: isMobile ? '4.5rem' : '12rem',
      center: true,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => row.isAdmin && <CheckedCircle />,
    },
    {
      name: 'Active',
      selector: (row) => row.status,
      width: isMobile ? '4.5rem' : '12rem',
      // hide: 767,
      center: true,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => row.status && <CheckedCircle />,
    },
    {
      name: 'Actions',
      width: isMobile ? '10.5rem' : '15rem',
      center: true,
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (row) => (
        <ActionsContainer>
          <Button callback={() => openBikesByUser(row)} icon>
            <BikeRentalsLogo />
          </Button>
          <Button callback={() => openUserCreator(row)} icon>
            <Edit />
          </Button>
          <Button callback={() => openDeleteUser(row)} className="delete" icon>
            <X />
          </Button>
        </ActionsContainer>
      ),
    },
  ]

  const onGoBack = (newData) => {
    setShowUserCreator(false)
    setShowUsersAndBikes(false)

    if (newData) {
      const {
        id, email, isAdmin, status,
      } = newData
      if (userSelected && userSelected.id) {
        const actualUsers = [...users].map((item) => {
          if (item.id === userSelected.id) {
            return {
              ...item,
              email,
              isAdmin,
              status,
            }
          }

          return item
        })
        setUsers(actualUsers)
      } else {
        const actualUsers = [...users]
        actualUsers.unshift({
          id,
          email,
          isAdmin,
          status,
        })
        setUsers(actualUsers)
      }
    }
  }

  return (
    <PageContainer>
      <DashboardPagesContainer>
        <DataContainer>
          <ManageContainer>
            <Title min={2.8} max={3.2}>Manage Users</Title>
            <Button
              callback={showUserCreator || showUsersAndBikes ? onGoBack : openUserCreator}
              strokedColor={theme.colors.primary.endeavour}
              customWidth="5rem"
              stroked={!showUserCreator && !showUsersAndBikes}
              icon={showUserCreator || showUsersAndBikes}
            >
              <X className={showUserCreator || showUsersAndBikes ? 'x-sign' : 'plus-sign'} />
            </Button>
          </ManageContainer>
          {
            showLoading
              ? <Loader />
              : (
                <ChildContainer className="box-shadow">
                  {showUserCreator && (
                    <UserCreator goBack={onGoBack} userSelected={userSelected} />
                  )}
                  {showUsersAndBikes && (
                    <UsersAndBikes
                      id={userSelected?.id}
                      queryCallback={getAgendaByUser}
                      title="Bikes by this User"
                    />
                  )}
                  {!showUserCreator && !showUsersAndBikes && (
                    <DataTable
                      columns={columns}
                      data={users}
                      highlightOnHover
                      noHeader
                      striped
                    />
                  )}
                </ChildContainer>
              )
          }
          {
            showDeleteUser && (
              <Confirmation
                type="danger"
                showConfirmation={showDeleteUser}
                noLabel="No"
                yesLabel="Confirm"
                yesColor={theme.colors.primary.carnation}
                showLoader={showButtonLoading}
                onClose={setInitState}
                onYes={deleteUser}
                overrideIcon={<X />}
                buttonsMarginTop="2rem"
              >
                <Title
                  marginBottom="1.2rem"
                  textAlign="center"
                  min={2}
                  max={2}
                >
                  Want to delete this user?
                </Title>
              </Confirmation>
            )
          }
        </DataContainer>
      </DashboardPagesContainer>
    </PageContainer>
  )
}

export default AdminUsers
