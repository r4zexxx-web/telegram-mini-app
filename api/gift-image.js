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

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getFile?file_id=${encodeURIComponent(fileId)}`
    )

    const telegramData = await telegramResponse.json()

    if (!telegramData.ok) {
      return res.status(500).send('Telegram faylni topmadi')
    }

    const filePath = telegramData.result.file_path

    const fileResponse = await fetch(
      `https://api.telegram.org/file/bot${botToken}/${filePath}`
    )

    if (!fileResponse.ok) {
      return res.status(500).send('Rasmni yuklab bo‘lmadi')
    }

    const contentType =
      fileResponse.headers.get('content-type') || 'image/webp'

    const buffer = Buffer.from(await fileResponse.arrayBuffer())

    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, max-age=3600')

    return res.status(200).send(buffer)

  } catch (error) {
    console.error(error)
    return res.status(500).send('Server xatosi')
  }
}