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

        const stars = gift.star_count

        // 15 Stars = 4 000 so'm
        // Har bir Star uchun taxminan 267 so'm
        const price = Math.ceil(
          (stars * 4000) / 15 / 1000
        ) * 1000

        return {
          id: index + 1,

          telegramGiftId: gift.id,

          name:
            gift.sticker?.emoji ||
            `🎁 Gift ${index + 1}`,

          stars: stars,

          price: price,

          fileId:
            gift.sticker?.thumbnail?.file_id ||
            gift.sticker?.file_id ||
            ''
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