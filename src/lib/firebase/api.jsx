import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import axios from 'axios'

import { COLLECTIONS } from '~app/utils/constants'
import { initFirebase } from '~app/lib/firebase/client'

export const addDocument = async (collectionName, data, id) => {
  const firestore = getFirestore()

  let documentId = id
  if (id) {
    const ref = collection(firestore, collectionName)
    await setDoc(doc(ref, id), data, { merge: true })
  } else {
    const result = await addDoc(collection(firestore, collectionName), data)
    documentId = result.id
  }

  return documentId
}

export const getDocument = async (collectionName, id) => {
  const firestore = getFirestore()

  const ref = doc(firestore, collectionName, id)
  const snapshot = await getDoc(ref)

  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : {}
}

export const getDocuments = async (collectionName) => {
  const result = []

  const firestore = getFirestore()

  const querySnapshot = await getDocs(collection(firestore, collectionName))
  querySnapshot.forEach((item) => {
    result.push({ id: item.id, ...item.data() })
  })

  return result
}

export const updateDocument = async (collectionName, data, id) => {
  const firestore = getFirestore()

  const ref = doc(firestore, collectionName, id)
  await setDoc(ref, data, { merge: true })
}

export const deleteDocument = async (collectionName, id) => {
  const firestore = getFirestore()

  await deleteDoc(doc(firestore, collectionName, id))
}

export const getAgendaByBikeAndMonth = async (bikeId, month) => {
  let result = []

  try {
    const firestore = getFirestore()

    const ref = collection(firestore, COLLECTIONS.AGENDA)
    const q = query(
      ref,
      where('bike.id', '==', bikeId),
      where('month', '==', month),
    )
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((item) => {
      result.push({ id: item.id, ...item.data() })
    })
  } catch (e) {
    console.log(e)
    result = []
  }

  return result
}

export const getBikes = async () => {
  initFirebase()

  const firestore = getFirestore()

  const q = query(collection(firestore, COLLECTIONS.BIKES), orderBy('createdAt', 'desc'))
  const snapshots = await getDocs(q)

  const bikes = []
  snapshots.forEach((snap) => bikes.push({ id: snap.id, ...snap.data() }))

  return bikes
}

export const getAgendaByUser = async (userId) => {
  let result = []

  try {
    const firestore = getFirestore()

    const ref = collection(firestore, COLLECTIONS.AGENDA)
    const q = query(
      ref,
      where('user.id', '==', userId),
    )
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((item) => {
      result.push({ id: item.id, ...item.data() })
    })
  } catch (e) {
    console.log(e)
    result = []
  }

  return result
}

export const getAgendaByBike = async (bikeId) => {
  let result = []

  try {
    const firestore = getFirestore()

    const ref = collection(firestore, COLLECTIONS.AGENDA)
    const q = query(
      ref,
      where('bike.id', '==', bikeId),
    )
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((item) => {
      result.push({ id: item.id, ...item.data() })
    })
  } catch (e) {
    console.log(e)
    result = []
  }

  return result
}

export const createAdminUser = async (userData) => {
  let result = { status: false }

  try {
    const { data } = await axios.post('/api/create-user', { userData })
    result = { status: true, uid: data.uid }
  } catch (e) {
    console.log(e)

    result = { status: false }
  }

  return result
}

export const updateAdminUser = async (uid, email) => {
  let result = { status: false }

  try {
    const { data } = await axios.post('/api/update-user', { uid, email })
    result = { status: true, uid: data.uid }
  } catch (e) {
    console.log(e)

    result = { status: false }
  }

  return result
}

export const deleteAdminUser = async (uid) => {
  let result = { status: false }

  try {
    await axios.post('/api/delete-user', { uid })
  } catch (e) {
    console.log(e)

    result = { status: false }
  }

  return result
}

export const getBikesByParams = async (filter) => {
  let bikesList = []

  try {
    const firestore = getFirestore()

    const ref = collection(firestore, COLLECTIONS.BIKES)
    const conditions = []

    if (filter.model && filter.model.value) {
      conditions.push(where(`queryModel.${filter.model.value.toLowerCase()}`, '==', true))
    }

    if (filter.color && filter.color.value) {
      conditions.push(where('color', '==', filter.color.value))
    }

    if (filter.location && filter.location.value) {
      conditions.push(where('location', '==', filter.location.value))
    }

    if (filter.rating && filter.rating.value) {
      const int = parseInt(filter.rating.value, 10)
      const start = int
      const end = int + 1
      conditions.push(where('reviews.avg', '>=', start))
      conditions.push(where('reviews.avg', '<', end))
    }

    const q = query(ref, ...conditions)
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((item) => {
      bikesList.push({ id: item.id, ...item.data() })
    })
  } catch (e) {
    console.log(e)
    bikesList = []
  }

  return bikesList
}
