// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const API_KEY = process.env.BUTTONDOWN_API_KEY
    const buttondownRoute = `${process.env.BUTTONDOWN_API_URL}subscribers`

    const response = await fetch(buttondownRoute, {
      body: JSON.stringify(email),
      headers: {
        Authorization: `Token ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const respData = await response.json()
    if (response.status >= 400) {
      var errorMessage = 'There was an error subscribing to the list.'
      if (Array.isArray(respData) && respData.length >= 1) {
        if (respData[0].includes('is already subscribed')) {
          errorMessage = 'Email is already subscribed'
        }
      }
      return res.json({ error: errorMessage })
    }

    return res.status(201).json({ error: '' })
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() })
  }
}
