import { getDocuments } from '~app/lib/firebase/api'
import { COLLECTIONS } from '~app/utils/constants'

const handler = async (req, res) => {
  try {
    const meta = await getDocuments(COLLECTIONS.META)

    return res.status(200).json({ meta, status: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message, status: false })
  }
}

export default handler
