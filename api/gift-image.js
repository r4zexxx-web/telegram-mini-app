export default async function handler(req, res) {
  try {
    const botToken = process.env.BOT_TOKEN
    const fileId = req.query.file_id

    if (!botToken) {
      return res.status(500).send('BOT_TOKEN topilmadi')
    }

    if (!fileId) {
      return res.status(400).send('file_id kerak')
    }

    const telegramUrl =
      `https://api.telegram.org/bot${botToken}/getFile?file_id=${encodeURIComponent(fileId)}`

    const fileInfoResponse = await fetch(telegramUrl)
    const fileInfo = await fileInfoResponse.json()

    console.log('FILE INFO:', fileInfo)

    if (!fileInfo.ok) {
      return res.status(500).send(
        JSON.stringify(fileInfo)
      )
    }

    const filePath = fileInfo.result.file_path

    const imageResponse = await fetch(
      `https://api.telegram.org/file/bot${botToken}/${filePath}`
    )

    if (!imageResponse.ok) {
      return res.status(500).send(
        'Telegramdan faylni yuklab bo‘lmadi'
      )
    }

    const contentType =
      imageResponse.headers.get('content-type') ||
      'application/octet-stream'

    const buffer = Buffer.from(
      await imageResponse.arrayBuffer()
    )

    res.setHeader('Content-Type', contentType)
    res.setHeader(
      'Cache-Control',
      'public, max-age=86400'
    )

    return res.status(200).send(buffer)

  } catch (error) {
    console.error('GIFT IMAGE ERROR:', error)

    return res.status(500).send(
      error.message
    )
  }
}