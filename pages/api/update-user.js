import '~app/lib/firebase/admin'
import { getAuth } from 'firebase-admin/auth'

const handler = async (req, res) => {
  const { body: { uid, email } } = req
  if (!uid || !email) {
    return res.status(500).json({ error: 'uid and email required', status: false })
  }

  try {
    const record = await getAuth().updateUser(uid, { email })

    return res.status(200).json({ status: true, uid: record.uid })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message, status: false })
  }
}

export default handler
