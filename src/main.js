const app = document.querySelector('#app')

const tg = window.Telegram?.WebApp

if (tg) {
  tg.ready()
  tg.expand()
}


/* =====================================================
   MAHSULOTLAR
===================================================== */

const products = [
  {
    id: 1,
    name: 'Stars 50',
    price: 12000,
    emoji: '⭐'
  },
  {
    id: 2,
    name: 'Stars 100',
    price: 24000,
    emoji: '⭐'
  },
  {
    id: 3,
    name: 'Stars 300',
    price: 71000,
    emoji: '⭐'
  },
  {
    id: 4,
    name: 'Stars 400',
    price: 95000,
    emoji: '⭐'
  },
  {
    id: 5,
    name: 'Stars 500',
    price: 118000,
    emoji: '⭐'
  },
  {
    id: 6,
    name: 'Stars 1000',
    price: 237000,
    emoji: '⭐'
  },
  {
    id: 7,
    name: 'Stars 2000',
    price: 474000,
    emoji: '⭐'
  },
  {
    id: 8,
    name: 'Stars 5000',
    price: 1184000,
    emoji: '⭐'
  },
  {
    id: 9,
    name: 'Stars 10000',
    price: 2368000,
    emoji: '⭐'
  }
]


/* =====================================================
   GIFTLAR
===================================================== */

const gifts = [
  {
    id: 1,
    name: 'Ayiqcha',
    stars: 15,
    price: 4000,
    image:
      'https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png'
  },
  {
    id: 2,
    name: 'Yurakcha',
    stars: 15,
    price: 4000,
    image:
      'https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png'
  },
  {
    id: 3,
    name: "Sovg'a",
    stars: 25,
    price: 6500,
    image:
      'https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png'
  },
  {
    id: 4,
    name: 'Atirgul',
    stars: 50,
    price: 12000,
    image:
      'https://cdn.denzyve.shop/assets/png/gift_6012435906336654262.png'
  }
]


/* =====================================================
   SAVATCHA
===================================================== */

let cart = []


function formatPrice(price) {
  return Number(price).toLocaleString('uz-UZ') + " so‘m"
}


function getCartCount() {
  return cart.reduce(
    (total, item) => total + item.quantity,
    0
  )
}


function getCartTotal() {
  return cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )
}


/* =====================================================
   TELEGRAM ALERT
===================================================== */

function showAlert(message) {

  if (tg) {
    tg.showAlert(message)
  } else {
    alert(message)
  }

}


/* =====================================================
   GLOBAL CSS
===================================================== */

const style = document.createElement('style')

style.textContent = `

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: #f4f6f8;
  color: #111;
}

button {
  font-family: inherit;
  cursor: pointer;
}

#app {
  min-height: 100vh;
}


/* HOME */

.home {
  min-height: 100vh;
  padding: 25px 15px;
  background: #f4f6f8;
}

.home-title {
  text-align: center;
  margin: 10px 0 25px;
  font-size: 27px;
  font-weight: 800;
}

.home-menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 500px;
  margin: 0 auto;
}

.big-menu-button {
  width: 100%;
  min-height: 105px;
  border: none;
  border-radius: 22px;
  color: white;
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 20px;
  box-shadow: 0 5px 18px rgba(0,0,0,0.12);
}

.stars-menu {
  background: #f5b700;
}

.gift-menu {
  background: #e94f8a;
}

.producer-menu {
  background: #505866;
}

.big-menu-icon {
  font-size: 45px;
}

.big-menu-text {
  font-size: 20px;
  font-weight: 800;
}


/* SHOP */

.shop {
  min-height: 100vh;
  padding: 15px;
  background: #f4f6f8;
}

.shop-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.shop-header h1 
  font-size: 22px;
  margin: 0;
  font-weight: 800;
}

.back-button {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 14px;
  background: white;
  font-size: 24px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.08);
}


/* PRODUCT CARD */

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.product-card {
  background: white;
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  text-align: center;
}

.product-emoji {
  font-size: 45px;
  margin-bottom: 8px;
}

.product-name {
  font-size: 17px;
  font-weight: 800;
}

.product-price {
  margin: 8px 0 12px;
  font-size: 15px;
  font-weight: 700;
}

.buy-button {
  width: 100%;
  border: none;
  border-radius: 13px;
  padding: 11px;
  background: #2481cc;
  color: white;
  font-size: 15px;
  font-weight: 800;
}


/* CART */

.cart-box {
  position: sticky;
  bottom: 10px;
  margin-top: 18px;
  padding: 16px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 5px 20px rgba(0,0,0,0.12);
}

.cart-info {
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  margin-bottom: 12px;
}

.cart-button {
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 14px;
  background: #22a06b;
  color: white;
  font-size: 16px;
  font-weight: 800;
}


/* GIFT */

.gifts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.gift-card {
  background: white;
  border-radius: 20px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
}

.gift-image-box {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.gift-image {
  max-width: 110px;
  max-height: 110px;
  object-fit: contain;
}

.gift-name {
  font-size: 17px;
  font-weight: 800;
}

.gift-stars {
  margin-top: 6px;
  font-size: 14px;
  color: #777;
}

.gift-price {
  margin: 7px 0 12px;
  font-weight: 800;
}


/* PRODUCER */

.contact-section {
  background: white;
  border-radius: 24px;
  padding: 25px 18px;
  text-align: center;
  box-shadow: 0 5px 18px rgba(0,0,0,0.08);
}

.contact-icon {
  font-size: 65px;
}

.contact-section h2 {
  margin: 15px 0 8px;
  font-size: 21px;
}

.contact-description {
  color: #777;
  margin-bottom: 22px;
}

.contact-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  border-radius: 15px;
  background: #f1f3f5;
  color: #111;
  text-decoration: none;
  font-weight: 800;
}


/* MODAL */

.modal-background {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  z-index: 9999;
}

.modal {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 24px;
  padding: 22px;
  text-align: center;
  box-shadow: 0 10px 35px rgba(0,0,0,0.25);
}

.modal h2 {
  margin-top: 0;
  font-size: 21px;
}

.modal-subtitle {
  line-height: 1.7;
  color: #555;
}

.card-box {
  margin-top: 18px;
  padding: 17px;
  border-radius: 17px;
  background: #f3f5f7;
}

.card-label {
  font-size: 13px;
  color: #777;
  margin-bottom: 8px;
}

.card-number {
  font-size: 21px;
  font-weight: 900;
  letter-spacing: 1px;
}

.modal-button {
  width: 100%;
  border: none;
  border-radius: 15px;
  padding: 14px;
  margin-top: 12px;
  font-size: 16px;
  font-weight: 800;
}

.paid-button {
  background: #22a06b;
  color: white;
}

.close-button {
  background: #e9ecef;
  color: #222;
}


/* PAYMENT TIMER */

.payment-status-box {
  background: #f5f7f9;
  border-radius: 18px;
  padding: 20px;
  text-align: center;
  margin-top: 15px;
}

.payment-status-icon {
  font-size: 42px;
  margin-bottom: 10px;
}

.payment-status-title {
  font-size: 17px;
  font-weight: 800;
}

.payment-timer {
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 2px;
  margin: 18px 0;
}

.payment-status-text {
  font-size: 14px;
  color: #777;
}


/* LOADING */

.loading {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.loading-icon {
  font-size: 70px;
  animation: loading-spin 1.2s infinite ease-in-out;
}

.loading h1 {
  margin-top: 20px;
  font-size: 22px;
}

.loading p {
  opacity: 0.6;
}

@keyframes loading-spin {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

`

document.head.appendChild(style)
/* =====================================================
   HOME
===================================================== */

function renderHome() {

  app.innerHTML = `
    <div class="home">

      <h1 class="home-title">
        🛍️ DO‘KON
      </h1>

      <div class="home-menu">

        <button
          class="big-menu-button stars-menu"
          onclick="openStars()"
        >
          <span class="big-menu-icon">⭐</span>
          <span class="big-menu-text">
            STARS
          </span>
        </button>


        <button
          class="big-menu-button gift-menu"
onclick="openCS2()" 
        >
          <span class="big-menu-icon">🎁</span>
          <span class="big-menu-text">
            🔫 CS2 SKINLAR
          </span>
        </button>


        <button
          class="big-menu-button producer-menu"
          onclick="openProducer()"
        >
          <span class="big-menu-icon">🏭</span>
          <span class="big-menu-text">
            ISHLAB CHIQARUVCHI
          </span>
        </button>

      </div>

    </div>
  `
}


/* =====================================================
   STARS
===================================================== */

window.openStars = function() {

  renderStars()

}


function renderStars() {

  app.innerHTML = `

    <div class="shop">

      <div class="shop-header">

        <button
          class="back-button"
          onclick="goHome()"
        >
          ←
        </button>

        <h1>
          ⭐ Stars
        </h1>

      </div>


      <div class="products">

        ${products.map(product => `

          <div class="product-card">

            <div class="product-emoji">
              ${product.emoji}
            </div>

            <div class="product-name">
              ${product.name}
            </div>

            <div class="product-price">
              ${formatPrice(product.price)}
            </div>

            <button
              class="buy-button"
              onclick="addToCart(${product.id})"
            >
              Savatchaga
            </button>

          </div>

        `).join('')}

      </div>


      <div class="cart-box">

        <div class="cart-info">

          <span>
            🛒 Savatcha
          </span>

          <span>
            ${getCartCount()} ta
          </span>

        </div>


        <div class="cart-info">

          <span>
            Jami:
          </span>

          <span>
            ${formatPrice(getCartTotal())}
          </span>

        </div>


        <button
          class="cart-button"
          onclick="orderCart()"
        >
          💳 Buyurtma berish
        </button>

      </div>

    </div>

  `
}


/* =====================================================
   HOMEGA QAYTISH
===================================================== */

window.goHome = function() {

  renderHome()

}


/* =====================================================
   SAVATCHAGA QO‘SHISH
===================================================== */

window.addToCart = function(id) {

  const product = products.find(
    item => item.id === id
  )

  if (!product) return


  const existing = cart.find(
    item => item.id === id
  )


  if (existing) {

    existing.quantity++

  } else {

    cart.push({
      ...product,
      quantity: 1
    })

  }


  showAlert(
    `${product.name} savatchaga qo‘shildi ✅`
  )


  renderStars()

}
/* =====================================================
   SAVATCHANI KO‘RISH
===================================================== */

window.showCart = function() {

  app.innerHTML = `

    <div class="shop">

      <div class="shop-header">

        <button
          class="back-button"
          onclick="renderStars()"
        >
          ←
        </button>

        <h1>
          🛒 Savatcha
        </h1>

      </div>


      ${
        cart.length === 0

        ? `

          <div
            style="
              background:white;
              padding:30px 20px;
              border-radius:20px;
              text-align:center;
            "
          >

            <div style="font-size:55px;">
              🛒
            </div>

            <h2>
              Savatcha bo‘sh
            </h2>

            <button
              class="buy-button"
              onclick="renderStars()"
            >
              ⭐ Stars ko‘rish
            </button>

          </div>

        `

        : `

          ${cart.map(item => `

            <div
              class="product-card"
              style="
                margin-bottom:12px;
                text-align:left;
              "
            >

              <div
                style="
                  display:flex;
                  align-items:center;
                  justify-content:space-between;
                  gap:10px;
                "
              >

                <div>

                  <div class="product-name">
                    ${item.emoji} ${item.name}
                  </div>

                  <div class="product-price">
                    ${formatPrice(item.price)}
                  </div>

                </div>


                <div
                  style="
                    display:flex;
                    align-items:center;
                    gap:8px;
                  "
                >

                  <button
                    onclick="decreaseCart(${item.id})"
                    style="
                      width:35px;
                      height:35px;
                      border:none;
                      border-radius:10px;
                      background:#eee;
                      font-size:20px;
                    "
                  >
                    −
                  </button>

                  <b>
                    ${item.quantity}
                  </b>

                  <button
                    onclick="increaseCart(${item.id})"
                    style="
                      width:35px;
                      height:35px;
                      border:none;
                      border-radius:10px;
                      background:#2481cc;
                      color:white;
                      font-size:20px;
                    "
                  >
                    +
                  </button>

                </div>

              </div>

            </div>

          `).join('')}


          <div class="cart-box">

            <div class="cart-info">

              <span>
                Mahsulotlar:
              </span>

              <span>
                ${getCartCount()} ta
              </span>

            </div>


            <div class="cart-info">

              <span>
                Jami:
              </span>

              <span>
                ${formatPrice(getCartTotal())}
              </span>

            </div>


            <button
              class="cart-button"
              onclick="orderCart()"
            >
              💳 Buyurtma berish
            </button>

          </div>

        `
      }

    </div>

  `
}


/* =====================================================
   MIQDORNI OSHIRISH
===================================================== */

window.increaseCart = function(id) {

  const item = cart.find(
    product => product.id === id
  )

  if (!item) return

  item.quantity++

  showCart()

}


/* =====================================================
   MIQDORNI KAMAYTIRISH
===================================================== */

window.decreaseCart = function(id) {

  const item = cart.find(
    product => product.id === id
  )

  if (!item) return


  item.quantity--


  if (item.quantity <= 0) {

    cart = cart.filter(
      product => product.id !== id
    )

  }


  showCart()

}


/* =====================================================
   STARS BUYURTMASI
===================================================== */
window.orderCart = async function() {

  if (cart.length === 0) {

    showAlert(
      'Savatcha bo‘sh 🛒'
    )

    return

  }

  const total = getCartTotal()

  const user =
    tg?.initDataUnsafe?.user

  const order = {

    type: 'stars',

    items: cart.map(item => ({

      name: item.name,

      price: item.price,

      quantity: item.quantity

    })),

    total: total,

    userId:
      user?.id || '',

    username:
      user?.username || '',

    firstName:
      user?.first_name || ''

  }

  console.log(
    'STARS BUYURTMA:',
    order
  )

  try {

    const response = await fetch(
      '/api/order',
      {

        method: 'POST',

        headers: {

          'Content-Type':
            'application/json'

        },

        body:
          JSON.stringify(order)

      }
    )

    const result =
      await response.json()

    console.log(
      'ORDER API:',
      result
    )

    if (!response.ok || !result.ok) {

      showAlert(
        `Buyurtmani yuborishda xatolik ❌\n\n${result.message || 'Server xatosi'}`
      )

      return

    }

    showAlert(

      `Buyurtma qabul qilindi ✅\n\n` +

      `⭐ Stars: ${getCartCount()}\n` +

      `💰 Jami: ${formatPrice(total)}`

    )

    cart = []

    renderStars()

  }

  catch (error) {

    console.error(
      'ORDER ERROR:',
      error
    )

    showAlert(
      'Internet yoki server xatosi ❌'
    )

  }

}
/* =====================================================
   GIFT BO‘LIMI
===================================================== */

window.openGift = function() {

  renderGift()

}


function renderGift() {

  app.innerHTML = `

    <div class="shop">

      <div class="shop-header">

        <button
          class="back-button"
          onclick="goHome()"
        >
          ←
        </button>

        <h1>
          🎁 Gift
        </h1>

      </div>


      <div class="gifts">

        ${gifts.map(gift => `

          <div class="gift-card">

            <div class="gift-image-box">

              ${
                gift.image

                ? `
                  <img
                    class="gift-image"
                    src="${gift.image}"
                    alt="${gift.name}"
                  >
                `

                : `
                  <div
                    style="
                      font-size:70px;
                    "
                  >
                    🎁
                  </div>
                `
              }

            </div>


            <div class="gift-name">
              ${gift.name}
            </div>


            <div class="gift-stars">
              ⭐ ${gift.stars} Stars
            </div>


            <div class="gift-price">
              💰 ${formatPrice(gift.price)}
            </div>


            <button
              class="buy-button"
              onclick="buyGift(${gift.id})"
            >
              🛒 Sotib olish
            </button>

          </div>

        `).join('')}

      </div>

    </div>

  `
}


/* =====================================================
   GIFT TO‘LOV OYNASI
===================================================== */

let giftPaymentTimer = null

let giftPaymentSeconds = 600


window.buyGift = function(id) {

  const gift = gifts.find(
    item => item.id === id
  )

  if (!gift) return


  const cardNumber =
    '5614 6821 1064 4707'


  app.insertAdjacentHTML(

    'beforeend',

    `

      <div
        class="modal-background"
        id="gift-modal"
      >

        <div class="modal">

          <h2>
            🎁 ${gift.name}
          </h2>


          <div class="modal-subtitle">

            ⭐ ${gift.stars} Stars

            <br>

            💰 ${formatPrice(gift.price)}

          </div>


          <div class="card-box">

            <div class="card-label">
              To‘lov uchun karta
            </div>

            <div class="card-number">
              ${cardNumber}
            </div>

          </div>


          <button
            class="modal-button paid-button"
            onclick="paymentDone(${gift.id})"
          >
            To‘lov qildim
          </button>


          <button
            class="modal-button close-button"
            onclick="closeGiftModal()"
          >
            Yopish
          </button>

        </div>

      </div>

    `
  )

}


/* =====================================================
   TO‘LOV QILDIM
===================================================== */

window.paymentDone = function(id) {

  startGiftPaymentTimer(id)

}


/* =====================================================
   10 DАQIQA TEKSHIRUV
===================================================== */

window.startGiftPaymentTimer = function(id) {

  const gift = gifts.find(
    item => item.id === id
  )

  if (!gift) return


  const modal =
    document.querySelector('#gift-modal')


  if (!modal) return


  if (giftPaymentTimer) {

    clearInterval(
      giftPaymentTimer
    )

  }


  giftPaymentSeconds = 600


  modal.querySelector(
    '.modal'
  ).innerHTML = `

    <h2>
      ⏳ To‘lov tekshirilmoqda
    </h2>


    <div class="modal-subtitle">

      🎁 ${gift.name}

      <br>

      ⭐ ${gift.stars} Stars

      <br>

      💰 ${formatPrice(gift.price)}

    </div>


    <div class="payment-status-box">

      <div class="payment-status-icon">
        🔍
      </div>


      <div class="payment-status-title">
        To‘lovingiz tekshirilmoqda
      </div>


      <div
        class="payment-timer"
        id="gift-payment-timer"
      >
        10:00
      </div>


      <div class="payment-status-text">
        Iltimos, kuting...
      </div>

    </div>


    <button
      class="modal-button close-button"
      onclick="closeGiftModal()"
    >
      Yopish
    </button>

  `


  giftPaymentTimer = setInterval(() => {

    giftPaymentSeconds--


    const timerElement =
      document.querySelector(
        '#gift-payment-timer'
      )


    if (!timerElement) {

      clearInterval(
        giftPaymentTimer
      )

      giftPaymentTimer = null

      return

    }


    const minutes =
      Math.floor(
        giftPaymentSeconds / 60
      )


    const seconds =
      giftPaymentSeconds % 60


    timerElement.textContent =

      `${String(minutes).padStart(2, '0')}:` +

      `${String(seconds).padStart(2, '0')}`


    if (giftPaymentSeconds <= 0) {

      clearInterval(
        giftPaymentTimer
      )

      giftPaymentTimer = null


      timerElement.textContent =
        '00:00'


      modal.querySelector(
        '.modal'
      ).innerHTML = `

        <h2>
          ⌛ Vaqt tugadi
        </h2>


        <div class="payment-status-box">

          <div class="payment-status-icon">
            ⚠️
          </div>


          <div class="payment-status-title">
            Tekshirish vaqti tugadi
          </div>


          <div class="payment-status-text">
            Buyurtma oynasi yopildi.
          </div>

        </div>


        <button
          class="modal-button close-button"
          onclick="closeGiftModal()"
        >
          Yopish
        </button>

      `

    }

  }, 1000)

}


/* =====================================================
   MODALNI YOPISH
===================================================== */

window.closeGiftModal = function() {

  if (giftPaymentTimer) {

    clearInterval(
      giftPaymentTimer
    )

    giftPaymentTimer = null

  }


  const modal =
    document.querySelector(
      '#gift-modal'
    )


  if (modal) {

    modal.remove()

  }

}


/* =====================================================
   START APP
===================================================== */

function startApp() {

  app.innerHTML = `

    <div class="loading">

      <div class="loading-icon">
        ⭐
      </div>

      <h1>
        Do‘kon yuklanmoqda...
      </h1>

      <p>
        Bir oz kuting
      </p>

    </div>

  `


  setTimeout(() => {

    renderHome()

  }, 1200)

}


startApp()
window.openCS2 = function() {

  app.innerHTML = `
    <div class="page">

      <div class="page-header">
        <button onclick="showHome()">←</button>

        <h2>🔫 CS2 SKINLAR</h2>
      </div>

      <div style="
        text-align:center;
        padding:40px 20px;
        opacity:0.8;
      ">
        <div style="font-size:60px;">🔫</div>

        <h3>CS2 Skinlar</h3>

        <p>
          Hozircha skinlar qo‘shilmagan.
        </p>

        <button
          onclick="openAddSkin()"
          style="
            margin-top:20px;
            padding:14px 22px;
            border:0;
            border-radius:12px;
            font-size:16px;
            cursor:pointer;
          "
        >
          ➕ Skin qo‘shish
        </button>
      </div>

    </div>
  `

}
const ADMIN_ID = '8675884464'

window.openAddSkin = function() {

  const userId =
    tg?.initDataUnsafe?.user?.id?.toString() || ''

  if (userId !== ADMIN_ID) {

    showAlert('Bu bo‘lim faqat admin uchun 🔒')

    return

  }

  app.innerHTML = `

    <div class="page">

      <div class="page-header">

        <button onclick="openCS2()">
          ←
        </button>

        <h2>➕ Skin qo‘shish</h2>

      </div>

      <div style="
        padding:20px;
      ">

        <label style="
          display:block;
          margin-bottom:8px;
          font-weight:bold;
        ">
          🖼 Skin rasmi
        </label>

        <input
          id="skin-image"
          type="file"
          accept="image/*"
          style="
            width:100%;
            padding:12px;
            margin-bottom:16px;
            box-sizing:border-box;
          "
        >

        <div
          id="skin-image-preview"
          style="
            display:none;
            margin-bottom:16px;
            text-align:center;
          "
        >
          <img
            id="skin-preview-img"
            style="
              max-width:100%;
              max-height:250px;
              border-radius:12px;
            "
          >
        </div>

        <input
          id="skin-name"
          type="text"
          placeholder="Skin nomi"
          style="
            width:100%;
            padding:14px;
            margin-bottom:12px;
            border-radius:12px;
            border:1px solid #ddd;
            box-sizing:border-box;
          "
        >

        <input
          id="skin-wear"
          type="text"
          placeholder="Wear (masalan: Factory New)"
          style="
            width:100%;
            padding:14px;
            margin-bottom:12px;
            border-radius:12px;
            border:1px solid #ddd;
            box-sizing:border-box;
          "
        >

        <input
          id="skin-float"
          type="text"
          placeholder="Float (ixtiyoriy)"
          style="
            width:100%;
            padding:14px;
            margin-bottom:12px;
            border-radius:12px;
            border:1px solid #ddd;
            box-sizing:border-box;
          "
        >

        <input
          id="skin-price"
          type="number"
          placeholder="Narxi (so‘m)"
          style="
            width:100%;
            padding:14px;
            margin-bottom:12px;
            border-radius:12px;
            border:1px solid #ddd;
            box-sizing:border-box;
          "
        >

        <textarea
          id="skin-info"
          placeholder="Qo‘shimcha ma'lumot"
          style="
            width:100%;
            min-height:100px;
            padding:14px;
            margin-bottom:12px;
            border-radius:12px;
            border:1px solid #ddd;
            box-sizing:border-box;
          "
        ></textarea>

        <button
          onclick="saveSkin()"
          style="
            width:100%;
            padding:15px;
            border:0;
            border-radius:12px;
            font-size:16px;
            font-weight:bold;
            cursor:pointer;
          "
        >
          ✅ Skinni saqlash
        </button>

      </div>

    </div>

  `

  const imageInput =
    document.querySelector('#skin-image')

  imageInput?.addEventListener(
    'change',
    function() {

      const file =
        this.files?.[0]

      if (!file) return

      if (!file.type.startsWith('image/')) {

        showAlert(
          'Faqat rasm faylini tanlang ❌'
        )

        this.value = ''

        return

      }

      const reader =
        new FileReader()

      reader.onload = function(event) {

        const preview =
          document.querySelector('#skin-preview-img')

        const box =
          document.querySelector('#skin-image-preview')

        if (preview && box) {

          preview.src =
            event.target.result

          box.style.display =
            'block'

        }

      }

      reader.readAsDataURL(file)

    }
  )

}
window.saveSkin = function() {

  const name =
    document.querySelector('#skin-name')?.value.trim()

  const wear =
    document.querySelector('#skin-wear')?.value.trim()

  const float =
    document.querySelector('#skin-float')?.value.trim()

  const price =
    document.querySelector('#skin-price')?.value

  const info =
    document.querySelector('#skin-info')?.value.trim()

  if (!name) {

    showAlert('Skin nomini kiriting ❌')

    return

  }

  if (!wear) {

    showAlert('Wear ni kiriting ❌')

    return

  }

  if (!price) {

    showAlert('Narxni kiriting ❌')

    return

  }

  const skin = {

    id: Date.now(),

    name: name,

    wear: wear,

    float: float,

    price: Number(price),

    info: info

  }

  console.log(
    'YANGI CS2 SKIN:',
    skin
  )

  showAlert(
    'Skin maʼlumotlari tayyor ✅'
  )

}