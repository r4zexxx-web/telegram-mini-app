export default async function handler(req, res) {
  try {
    const botToken = process.env.BOT_TOKEN

    if (!botToken) {
      return res.status(500).json({
        error: 'BOT_TOKEN topilmadi'
      })
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getAvailableGifts`
    )

    const data = await telegramResponse.json()

    if (!data.ok) {
      console.error('Telegram error:', data)

      return res.status(500).json({
        error: 'Telegram Giftlarni qaytarmadi',
        telegramError: data.description
      })
    }

    const gifts = data.result.gifts
      .slice()
      .sort((a, b) => a.star_count - b.star_count)
      .slice(0, 20)
      .map((gift, index) => {

        const stars = Number(gift.star_count || 0)

        // 15 Stars = 4 000 so'm
        const price =
          Math.ceil((stars * 4000 / 15) / 1000) * 1000

        const sticker = gift.sticker || {}

        // Eng yaxshi variant — Telegram bergan thumbnail
        const imageFileId =
          sticker.thumbnail?.file_id ||
          sticker.file_id ||
          ''

        return {
          id: index + 1,

          telegramGiftId: gift.id,

          name:
            sticker.emoji ||
            `Gift ${index + 1}`,

          stars,

          price,

          imageFileId,

          stickerType: {
            animated: Boolean(sticker.is_animated),
            video: Boolean(sticker.is_video)
          }
        }
      })

    return res.status(200).json(gifts)

  } catch (error) {

    console.error('Gifts error:', error)

    return res.status(500).json({
      error: 'Server xatosi',
      message: error.message
    })
  }
}