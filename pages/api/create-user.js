import '~app/lib/firebase/admin'
import { getAuth } from 'firebase-admin/auth'

const handler = async (req, res) => {
  const { body: { userData } } = req
  if (!userData) {
    return res.status(500).json({ error: 'userData required', status: false })
  }

  try {
    const record = await getAuth().createUser(userData)

    return res.status(200).json({ status: true, uid: record.uid })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message, status: false })
  }
}

export default handler
