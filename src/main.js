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

.shop-header h1 {
  font-size: 20px;
  margin: 0;
  flex: 1;
}

.back-button {
  width: 43px;
  height: 43px;
  border: none;
  border-radius: 13px;
  background: white;
  font-size: 25px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.cart-icon {
  font-size: 18px;
  font-weight: 700;
}


/* STARS */

.products {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product {
  background: white;
  border-radius: 17px;
  padding: 13px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 9px rgba(0,0,0,0.07);
}

.product-icon {
  width: 55px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff8d9;
  border-radius: 15px;
  font-size: 30px;
}

.product-info {
  flex: 1;
}

.product-info h2 {
  font-size: 16px;
  margin: 0 0 5px;
}

.product-info p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.product button {
  border: none;
  border-radius: 11px;
  padding: 10px 12px;
  background: #2481cc;
  color: white;
  font-weight: 700;
}


/* CART */

.cart {
  background: white;
  border-radius: 18px;
  padding: 15px;
  margin-top: 15px;
}

.cart h2 {
  margin: 0 0 12px;
  font-size: 19px;
}

.empty-cart {
  text-align: center;
  color: #888;
  padding: 15px 0;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 0;
  border-bottom: 1px solid #eee;
}

.cart-item-icon {
  font-size: 25px;
}

.cart-item-info {
  flex: 1;
}

.cart-item-info strong {
  display: block;
  font-size: 15px;
}

.cart-item-info span {
  display: block;
  font-size: 13px;
  color: #777;
  margin-top: 3px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 7px;
}

.quantity-button {
  width: 29px;
  height: 29px;
  border: none;
  border-radius: 8px;
  background: #eeeeee;
  font-size: 18px;
}

.remove-button {
  border: none;
  background: transparent;
  font-size: 17px;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 17px;
}

.order-button {
  width: 100%;
  border: none;
  border-radius: 13px;
  background: #20a464;
  color: white;
  padding: 13px;
  margin-top: 14px;
  font-size: 16px;
  font-weight: 700;
}


/* GIFTS */

.gift-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.gift-card {
  background: white;
  border-radius: 18px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  overflow: hidden;
}

.gift-image-box {
  height: 170px;
  border-radius: 15px;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.gift-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.gift-fallback {
  font-size: 65px;
}

.gift-info {
  text-align: center;
}

.gift-info h3 {
  margin: 10px 0 5px;
  font-size: 17px;
}

.gift-stars {
  color: #777;
  font-size: 13px;
}

.gift-price {
  margin-top: 5px;
  font-size: 15px;
  font-weight: 800;
}

.gift-buy-button {
  width: 100%;
  border: none;
  border-radius: 11px;
  background: #2481cc;
  color: white;
  padding: 11px 5px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
}


/* MODAL */

.modal-background {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 99999;
}

.modal {
  width: 100%;
  max-width: 370px;
  background: white;
  border-radius: 22px;
  padding: 20px;
}

.modal h2 {
  text-align: center;
  margin: 0 0 8px;
}

.modal-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 18px;
}

.card-box {
  background: #f1f3f5;
  border-radius: 15px;
  padding: 18px;
  text-align: center;
}

.card-label {
  font-size: 13px;
  color: #777;
  margin-bottom: 8px;
}

.card-number {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1px;
}

.modal-button {
  width: 100%;
  border: none;
  border-radius: 13px;
  padding: 13px;
  margin-top: 12px;
  font-size: 16px;
  font-weight: 700;
}

.paid-button {
  background: #20a464;
  color: white;
}

.close-button {
  background: #eeeeee;
  color: #333;
}


/* PRODUCER */

.contact-section {
  background: white;
  border-radius: 20px;
  padding: 25px 18px;
  text-align: center;
}

.contact-icon {
  font-size: 65px;
  margin-bottom: 10px;
}

.contact-section h2 {
  font-size: 20px;
  margin: 10px 0;
}

.contact-description {
  color: #777;
  margin-bottom: 20px;
}

.contact-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  border-radius: 13px;
  background: #2481cc;
  color: white;
  text-decoration: none;
  font-weight: 700;
}


/* LOADING */

.loading {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.loading-icon {
  font-size: 55px;
  margin-bottom: 10px;
}

.loading h1 {
  font-size: 22px;
}

.loading p {
  color: #777;
}


/* MOBILE */

@media (max-width: 400px) {

  .gift-grid {
    gap: 8px;
  }

  .gift-image-box {
    height: 150px;
  }

  .gift-image {
    width: 135px;
    height: 135px;
  }

  .gift-info h3 {
    font-size: 15px;
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

          <span class="big-menu-icon">
            ⭐
          </span>

          <span class="big-menu-text">
            STARS
          </span>

        </button>


        <button
          class="big-menu-button gift-menu"
          onclick="openGift()"
        >

          <span class="big-menu-icon">
            🎁
          </span>

          <span class="big-menu-text">
            GIFT
          </span>

        </button>


        <button
          class="big-menu-button producer-menu"
          onclick="openProducer()"
        >

          <span class="big-menu-icon">
            🏭
          </span>

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
          ⭐ Telegram Stars
        </h1>

        <div class="cart-icon">
          🛒 ${getCartCount()}
        </div>

      </div>


      <div class="products">

        ${products.map(product => `

          <div class="product">

            <div class="product-icon">
              ${product.emoji}
            </div>

            <div class="product-info">

              <h2>
                ${product.name}
              </h2>

              <p>
                ${formatPrice(product.price)}
              </p>

            </div>

            <button
              onclick="addToCart(${product.id})"
            >
              Sotib olish
            </button>

          </div>

        `).join('')}

      </div>


      <div class="cart">

        <h2>
          🛒 Savatcha
        </h2>

        ${renderCart()}

        <div class="cart-total">

          <span>
            Jami:
          </span>

          <strong>
            ${formatPrice(getCartTotal())}
          </strong>

        </div>


        <button
          class="order-button"
          onclick="orderCart()"
        >
          Buyurtma berish
        </button>

      </div>

    </div>

  `
}


/* =====================================================
   CART HTML
===================================================== */

function renderCart() {

  if (cart.length === 0) {

    return `
      <p class="empty-cart">
        Savatcha hozircha bo‘sh 🛒
      </p>
    `

  }


  return cart.map(item => `

    <div class="cart-item">

      <div class="cart-item-icon">
        ${item.emoji}
      </div>


      <div class="cart-item-info">

        <strong>
          ${item.name}
        </strong>

        <span>
          ${formatPrice(item.price)}
        </span>


        <div class="quantity">

          <button
            class="quantity-button"
            onclick="decreaseQuantity(${item.id})"
          >
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            class="quantity-button"
            onclick="increaseQuantity(${item.id})"
          >
            +
          </button>

        </div>

      </div>


      <button
        class="remove-button"
        onclick="removeFromCart(${item.id})"
      >
        ❌
      </button>

    </div>

  `).join('')
}


/* =====================================================
   GIFT
===================================================== */

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
          🎁 Telegram Gifts
        </h1>

      </div>


      <div class="gift-grid">

        ${gifts.map(gift => `

          <div class="gift-card">

            <div class="gift-image-box">

              <img
                class="gift-image"
                src="${gift.image}"
                alt="${gift.name}"
                onerror="
                  this.style.display='none';
                  this.parentElement.innerHTML='<div class=\\'gift-fallback\\'>🎁</div>';
                "
              >

            </div>


            <div class="gift-info">

              <h3>
                ${gift.name}
              </h3>

              <div class="gift-stars">
                ⭐ ${gift.stars} Stars
              </div>

              <div class="gift-price">
                ${formatPrice(gift.price)}
              </div>


              <button
                class="gift-buy-button"
                onclick="buyGift(${gift.id})"
              >
                Sotib olish
              </button>

            </div>

          </div>

        `).join('')}

      </div>

    </div>

  `
}


/* =====================================================
   GIFT BUY
===================================================== */

window.buyGift = function(id) {

  const gift = gifts.find(
    item => item.id === id
  )

  if (!gift) return


  const cardNumber = '5614 6821 1064 4707'


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
   CLOSE GIFT MODAL
===================================================== */

window.closeGiftModal = function() {

  const modal =
    document.querySelector('#gift-modal')

  if (modal) {
    modal.remove()
  }

}


/* =====================================================
   PAYMENT DONE
===================================================== */

window.paymentDone = function(id) {

  const gift = gifts.find(
    item => item.id === id
  )

  if (!gift) return


  const user =
    tg?.initDataUnsafe?.user


  const order = {

    type: 'gift',

    giftId: gift.id,

    giftName: gift.name,

    stars: gift.stars,

    price: gift.price,

    userId: user?.id || '',

    username: user?.username || '',

    firstName: user?.first_name || ''

  }


  console.log(
    'BUYURTMA:',
    order
  )


  closeGiftModal()


  showAlert(

    `Buyurtma qabul qilindi ✅\n\n` +

    `🎁 ${gift.name}\n` +

    `⭐ ${gift.stars} Stars\n` +

    `💰 ${formatPrice(gift.price)}\n\n` +

    `To‘lov tekshiriladi.`

  )

}


/* =====================================================
   PRODUCER
===================================================== */

function renderProducer() {

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
          🏭 Ishlab chiqaruvchi
        </h1>

      </div>


      <div class="contact-section">

        <div class="contact-icon">
          🏭
        </div>


        <h2>
          SHERALIYEV MUHAMMADJON
        </h2>


        <p class="contact-description">
          Biz bilan bog‘laning
        </p>


        <a
          class="contact-button"
          href="https://t.me/MU4AMMADJON"
          target="_blank"
          rel="noopener noreferrer"
        >
          ✈️ Telegram
        </a>


        <a
          class="contact-button"
          href="https://www.instagram.com/RON_CBR/"
          target="_blank"
          rel="noopener noreferrer"
        >
          📸 Instagram
        </a>


        <a
          class="contact-button"
          href="tel:+998959334333"
        >
          📞 +998 95 933 43 33
        </a>

      </div>

    </div>

  `
}


/* =====================================================
   NAVIGATION
===================================================== */

window.openStars = function() {
  renderStars()
}


window.openGift = function() {
  renderGift()
}


window.openProducer = function() {
  renderProducer()
}


window.goHome = function() {
  renderHome()
}


/* =====================================================
   ADD TO CART
===================================================== */

window.addToCart = function(id) {

  const product =
    products.find(
      item => item.id === id
    )

  if (!product) return


  const existing =
    cart.find(
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


  renderStars()
}


/* =====================================================
   INCREASE
===================================================== */

window.increaseQuantity = function(id) {

  const item =
    cart.find(
      item => item.id === id
    )

  if (item) {
    item.quantity++
  }

  renderStars()
}


/* =====================================================
   DECREASE
===================================================== */

window.decreaseQuantity = function(id) {

  const item =
    cart.find(
      item => item.id === id
    )

  if (!item) return


  if (item.quantity > 1) {

    item.quantity--

  } else {

    cart =
      cart.filter(
        item => item.id !== id
      )

  }


  renderStars()
}


/* =====================================================
   REMOVE
===================================================== */

window.removeFromCart = function(id) {

  cart =
    cart.filter(
      item => item.id !== id
    )

  renderStars()
}


/* =====================================================
   ORDER
===================================================== */

window.orderCart = function() {

  if (cart.length === 0) {

    showAlert(
      'Savatcha bo‘sh 🛒'
    )

    return

  }


  const total =
    getCartTotal()


  const user =
    tg?.initDataUnsafe?.user


  const order = {

    type: 'stars',

    items: cart,

    total: total,

    userId: user?.id || '',

    username: user?.username || '',

    firstName: user?.first_name || ''

  }


  console.log(
    'STARS BUYURTMA:',
    order
  )


  showAlert(

    `Buyurtma qabul qilindi ✅\n\n` +

    `⭐ Stars: ${getCartCount()}\n` +

    `💰 Jami: ${formatPrice(total)}`

  )

}


/* =====================================================
   START
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

  }, 500)

}


startApp()