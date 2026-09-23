export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({
        ok: false,
        message: 'Faqat POST ishlaydi'
      })
    }

    const botToken = process.env.BOT_TOKEN
    const buyerChatId = process.env.BUYER_CHAT_ID

    if (!botToken) {
      return res.status(500).json({
        ok: false,
        message: 'BOT_TOKEN topilmadi'
      })
    }

    if (!buyerChatId) {
      return res.status(500).json({
        ok: false,
        message: 'BUYER_CHAT_ID topilmadi'
      })
    }

    const order = req.body

    if (!order) {
      return res.status(400).json({
        ok: false,
        message: 'Buyurtma maʼlumoti kelmadi'
      })
    }

    let message = ''

    if (order.type === 'stars') {
      const itemsText = Array.isArray(order.items)
        ? order.items.map(item =>
            `⭐ ${item.name} × ${item.quantity} — ${Number(
              item.price * item.quantity
            ).toLocaleString('uz-UZ')} so‘m`
          ).join('\n')
        : 'Mahsulot maʼlumoti yo‘q'

      message =
        `🛍️ YANGI BUYURTMA\n\n` +
        `${itemsText}\n\n` +
        `💰 JAMI: ${Number(order.total || 0).toLocaleString('uz-UZ')} so‘m\n\n` +
        `👤 Ism: ${order.firstName || '-'}\n` +
        `🔗 Username: ${order.username ? '@' + order.username : '-'}\n` +
        `🆔 User ID: ${order.userId || '-'}`
    }

    else if (order.type === 'gift') {
      message =
        `🎁 YANGI GIFT BUYURTMA\n\n` +
        `🎁 Gift: ${order.giftName || '-'}\n` +
        `⭐ Stars: ${order.stars || '-'}\n` +
        `💰 Narx: ${Number(order.price || 0).toLocaleString('uz-UZ')} so‘m\n\n` +
        `👤 Ism: ${order.firstName || '-'}\n` +
        `🔗 Username: ${order.username ? '@' + order.username : '-'}\n` +
        `🆔 User ID: ${order.userId || '-'}`
    }

    else {
      return res.status(400).json({
        ok: false,
        message: 'Buyurtma turi noto‘g‘ri'
      })
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: buyerChatId,
          text: message
        })
      }
    )

    const telegramResult = await telegramResponse.json()

    if (!telegramResult.ok) {

  console.error('Telegram xatosi:', telegramResult)

  return res.status(500).json({
    ok: false,
    message: telegramResult.description || 'Telegramga xabar yuborilmadi',
    telegramError: telegramResult
  })

}

    return res.status(200).json({
      ok: true,
      message: 'Buyurtma Telegramga yuborildi'
    })

  } catch (error) {
    console.error('Order API xatosi:', error)

    return res.status(500).json({
      ok: false,
      message: error.message || 'Server xatosi'
    })
  }
}