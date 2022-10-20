import { getBikes } from '~app/lib/firebase/api'

const handler = async (req, res) => {
  try {
    const bikes = await getBikes()

    return res.status(200).json({ bikes, status: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: e.message, status: false })
  }
}

export default handler
