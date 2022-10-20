import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import useOnclickOutside from 'react-cool-onclickoutside'

import BikeRentalsLogo from '~app/components/ui/icons/BikeRentalsLogo'
import {
  NavBarContainer,
  NavBarContent,
  NavBarLogin,
  NavBarLogo,
} from './styles'
import { ROUTES } from '~app/utils/constants'
import UserIcon from '~app/components/ui/icons/UserIcon'
import Modal from '~app/components/ui/Modal'
import { useResize } from '~app/components/hooks/useResize'
import Auth from '~app/components/Auth'
import UIactions from '~app/store/actions/ui'
import { uiSelector } from '~app/store/selectors/ui'
import useFirebase from '~app/lib/firebase/client'
import CharIcon from '~app/components/ui/CharIcon'
import Button from '../Button'
import FloatingMenu from './FloatingMenu'

const Navbar = () => {
  const { user, doSignOut } = useFirebase()
  const router = useRouter()
  const { isMobile } = useResize()
  const dispatch = useDispatch()
  const uiState = useSelector(uiSelector)
  const [openMenu, setOpenMenu] = useState(false)

  const openAuth = () => dispatch(UIactions.setShowAuth({ showAuth: true }))
  const closeAuth = () => dispatch(UIactions.setShowAuth({ showAuth: false }))

  const isUserUndefined = typeof user === 'undefined'

  const getMenu = () => {
    const menu = [
      {
        name: 'Home',
        link: ROUTES.HOME,
      },
      {
        name: 'My Reservations',
        link: ROUTES.MY_RESERVATIONS,
      },
    ]

    if (user && user.isAdmin) {
      menu.push({
        name: 'Admin Users',
        link: ROUTES.ADMIN_USERS,
      })
      menu.push({
        name: 'Admin Bikes',
        link: ROUTES.ADMIN_BIKES,
      })
    }

    menu.push({
      name: 'Sign Out',
      callback: doSignOut,
      link: ROUTES.HOME,
    })

    return menu
  }

  const ref = useOnclickOutside(() => setOpenMenu(false))

  return (
    <>
      <NavBarContainer>
        <NavBarContent>
          <NavBarLogo onClick={() => router.push(ROUTES.HOME)}>
            <BikeRentalsLogo />
            Bike Rentals.co
          </NavBarLogo>
          {isUserUndefined && null}
          {
            !isUserUndefined && (
              user && user.id
                ? (
                  <Button
                    callback={() => setOpenMenu(true)}
                    icon
                  >
                    <CharIcon
                      char={user.email.charAt(0)}
                      height="3.4rem"
                      width="3.4rem"
                    />
                  </Button>
                )
                : (
                  <NavBarLogin onClick={openAuth}>
                    <UserIcon />
                  </NavBarLogin>
                )
            )
          }
          {openMenu && <FloatingMenu onClickRef={ref} menu={getMenu()} />}
        </NavBarContent>
      </NavBarContainer>
      <Modal
        showModal={uiState.showAuth}
        onClose={closeAuth}
        height={isMobile ? '30rem' : '50rem'}
        width={isMobile ? '30rem' : '50rem'}
      >
        <Auth />
      </Modal>
    </>
  )
}

export default Navbar
