import firebaseAdmin from 'firebase-admin'

import serviceAccount from './serviceAccount.json'

// Initialize Firebase
if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://bike-rentals-dev.firebaseio.com',
  })
}
