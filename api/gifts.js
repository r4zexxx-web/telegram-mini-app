export default async function handler(req, res) {
  try {
    const botToken = process.env.BOT_TOKEN

    if (!botToken) {
      return res.status(500).json({
        error: 'BOT_TOKEN topilmadi'
      })
    }

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getAvailableGifts`
    )

    const data = await response.json()

    if (!data.ok) {
      return res.status(500).json({
        error: 'Telegram Giftlarni qaytarmadi'
      })
    }

    const gifts = data.result.gifts
      .slice()
      .sort((a, b) => a.star_count - b.star_count)
      .slice(0, 20)
      .map((gift, index) => ({
        id: index + 1,
        telegramGiftId: gift.id,
        name: gift.sticker?.emoji || `🎁 Gift ${index + 1}`,
        stars: gift.star_count,
        price: Math.max(
          50000,
          Math.ceil((gift.star_count * 240) / 1000) * 1000
        ),
        fileId: gift.sticker?.file_id || ''
      }))

    return res.status(200).json(gifts)

  } catch (error) {
    console.error(error)

    return res.status(500).json({
      error: 'Server xatosi'
    })
  }
}