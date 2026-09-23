export default async function handler(req, res) {

  if (req.method !== 'POST') {

    return res.status(405).json({
      ok: false,
      message: 'Faqat POST so‘rov qabul qilinadi'
    })

  }

  try {

    const skin = req.body

    if (!skin?.name) {

      return res.status(400).json({
        ok: false,
        message: 'Skin nomi kerak'
      })

    }

    if (!skin?.price) {

      return res.status(400).json({
        ok: false,
        message: 'Skin narxi kerak'
      })

    }

    console.log(
      'YANGI CS2 SKIN:',
      skin
    )

    return res.status(200).json({

      ok: true,

      message: 'Skin qabul qilindi',

      skin: {

        id: Date.now(),

        name: skin.name,

        wear: skin.wear || '',

        float: skin.float || '',

        price: Number(skin.price),

        info: skin.info || '',

        image: skin.image || ''

      }

    })

  } catch (error) {

    console.error(
      'SKINS API ERROR:',
      error
    )

    return res.status(500).json({

      ok: false,

      message: 'Server xatosi'

    })

  }

}