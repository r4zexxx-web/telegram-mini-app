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
      .map((gift, index) => {

        const price = Math.max(
          50000,
          Math.round(gift.star_count * 240)
        )

        return {
          id: index + 1,
          telegramGiftId: gift.id,
          name: gift.sticker?.emoji || '🎁 Gift',
          stars: gift.star_count,
          price: price,
          image: gift.sticker?.thumbnail?.file_id || ''
        }
      })

    return res.status(200).json(gifts)

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      error: 'Server xatosi'
    })
  }
}