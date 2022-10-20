import '~app/lib/firebase/admin'
import { getAuth } from 'firebase-admin/auth'

const handler = async (req, res) => {
  const { body: { uid } } = req
  if (!uid) {
    return res.status(500).json({ error: 'uid required', status: false })
  }

  try {
    getAuth().deleteUser(uid)

    return res.status(200).json({ status: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message, status: false })
  }
}

export default handler
