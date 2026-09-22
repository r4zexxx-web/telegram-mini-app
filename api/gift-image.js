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

    // Telegramdan fayl ma'lumotini olish
    const fileInfoResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getFile?file_id=${encodeURIComponent(fileId)}`
    )

    const fileInfo = await fileInfoResponse.json()

    if (!fileInfo.ok) {
      console.error('getFile error:', fileInfo)

      return res.status(500).send(
        `Telegram getFile xatosi: ${fileInfo.description || 'Nomaʼlum xato'}`
      )
    }

    const filePath = fileInfo.result?.file_path

    if (!filePath) {
      return res.status(500).send(
        'Telegram file_path qaytarmadi'
      )
    }

    // Faylni Telegram serveridan olish
    const telegramFileUrl =
      `https://api.telegram.org/file/bot${botToken}/${filePath}`

    const imageResponse = await fetch(telegramFileUrl)

    if (!imageResponse.ok) {
      return res.status(500).send(
        'Telegramdan rasmni yuklab bo‘lmadi'
      )
    }

    const buffer = Buffer.from(
      await imageResponse.arrayBuffer()
    )

    // Telegram baʼzan MIME type bermaydi.
    // Shuning uchun file_path extension orqali aniqlaymiz.
    const lowerPath = filePath.toLowerCase()

    let contentType = 'application/octet-stream'

    if (lowerPath.endsWith('.webp')) {
      contentType = 'image/webp'
    } else if (lowerPath.endsWith('.jpg') || lowerPath.endsWith('.jpeg')) {
      contentType = 'image/jpeg'
    } else if (lowerPath.endsWith('.png')) {
      contentType = 'image/png'
    } else if (lowerPath.endsWith('.gif')) {
      contentType = 'image/gif'
    } else if (lowerPath.endsWith('.webm')) {
      contentType = 'video/webm'
    } else if (lowerPath.endsWith('.tgs')) {
      contentType = 'application/x-tgsticker'
    }

    // Agar Telegramning o'zi MIME bergan bo'lsa,
    // lekin u generic bo'lmasa, undan foydalanamiz.
    const telegramContentType =
      imageResponse.headers.get('content-type')

    if (
      telegramContentType &&
      telegramContentType !== 'application/octet-stream'
    ) {
      contentType = telegramContentType
    }

    res.setHeader(
      'Content-Type',
      contentType
    )

    res.setHeader(
      'Cache-Control',
      'public, max-age=86400, s-maxage=86400'
    )

    return res.status(200).send(buffer)

  } catch (error) {

    console.error('Gift image error:', error)

    return res.status(500).send(
      `Server xatosi: ${error.message}`
    )
  }
}