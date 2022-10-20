import { getDocument } from '~app/lib/firebase/api'
import { COLLECTIONS } from '~app/utils/constants'

const handler = async (req, res) => {
  const { query: { id } } = req

  if (!id) {
    return res.status(500).json({ error: 'id is required', status: false })
  }
  try {
    const bike = await getDocument(COLLECTIONS.BIKES, id)

    return res.status(200).json({ bike, status: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message, status: false })
  }
}

export default handler
