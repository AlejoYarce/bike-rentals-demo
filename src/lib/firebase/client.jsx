import React, {
  createContext, useContext, useEffect, useState,
} from 'react'
import { getApps, initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { get, noop } from 'lodash'
import nookies from 'nookies'

import { childrenProps } from '~app/utils/props'
import { BIKE_RENTALS_COOKIE, COLLECTIONS } from '~app/utils/constants'
import { addDocument, getDocument } from './api'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}

// Initialize Firebase
if (!getApps.length) {
  initializeApp(firebaseConfig)
}

export const initFirebase = () => {
  if (!getApps.length) {
    initializeApp(firebaseConfig)
  }
}

const errorMessages = {
  'auth/user-not-found': 'Please check your email or password',
  'auth/wrong-password': 'Please check your email or password',
  'auth/too-many-requests': 'Failed too many times',
  'auth/popup-closed-by-user': 'Sign In window closed',
  'auth/email-already-in-use': 'Email already in use',
  'auth/account-exists-with-different-credential': 'Email already in use',
}

const useFirebaseProvider = () => {
  const auth = getAuth()

  const [user, setUser] = useState()

  const handleAuthChange = async (firebaseUser) => {
    const uid = get(firebaseUser, 'uid', '')

    if (uid) {
      const userData = await getDocument(COLLECTIONS.USERS, uid)
      setUser(userData)
      nookies.set(undefined, BIKE_RENTALS_COOKIE, uid, { path: '/' })
    } else {
      setUser({})
      nookies.set(undefined, BIKE_RENTALS_COOKIE, '', { path: '/' })
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange)
    return () => unsubscribe()
  }, [])

  const doCreateUserWithPass = async (email, pass, userData) => {
    const createResult = await createUserWithEmailAndPassword(auth, email, pass)
      .catch((error) => {
        const errorCode = error.code

        return {
          error: true,
          errorCode,
          errorMessage: errorMessages[errorCode],
        }
      })

    const uid = get(createResult, 'user.uid', '')
    if (uid) {
      await addDocument(COLLECTIONS.USERS, userData, uid)
    }

    return createResult
  }

  const doLoginWithPass = async (email, pass) => {
    const createResult = await signInWithEmailAndPassword(auth, email, pass)
      .catch((error) => {
        const errorCode = error.code

        return {
          error: true,
          errorCode,
          errorMessage: errorMessages[errorCode],
        }
      })

    return createResult
  }

  const doSignOut = async () => {
    nookies.set(undefined, BIKE_RENTALS_COOKIE, '', { path: '/' })
    await signOut(auth)
  }

  return {
    doCreateUserWithPass,
    doLoginWithPass,
    doSignOut,
    user,
  }
}

const FirebaseContext = createContext({
  doCreateUserWithPass: noop,
  doLoginWithPass: noop,
  doLogOut: noop,
  user: null,
})

export const FirebaseProvider = ({ children }) => {
  const firebase = useFirebaseProvider()
  return <FirebaseContext.Provider value={firebase}>{children}</FirebaseContext.Provider>
}

FirebaseProvider.propTypes = {
  children: childrenProps.isRequired,
}

const useFirebase = () => useContext(FirebaseContext)

export default useFirebase
