import './style.css'

const products = [
  { id: 1, name: 'Stars 50', price: 12000, emoji: '⭐' },
  { id: 2, name: 'Stars 100', price: 24000, emoji: '⭐' },
  { id: 3, name: 'Stars 300', price: 71000, emoji: '⭐' },
  { id: 4, name: 'Stars 400', price: 95000, emoji: '⭐' },
  { id: 5, name: 'Stars 500', price: 118000, emoji: '⭐' },
  { id: 6, name: 'Stars 1000', price: 237000, emoji: '⭐' },
  { id: 7, name: 'Stars 2000', price: 474000, emoji: '⭐' },
  { id: 8, name: 'Stars 5000', price: 1184000, emoji: '⭐' },
  { id: 9, name: 'Stars 10000', price: 2368000, emoji: '⭐' }
]

const tg = window.Telegram?.WebApp

if (tg) {
  tg.ready()
  tg.expand()
}

let cart = []

function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0)
}

function getCartTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
}

function showAlert(message) {
  if (tg) {
    tg.showAlert(message)
  } else {
    alert(message)
  }
}

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
          ${item.price.toLocaleString()} so‘m
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

function renderHome() {
  document.querySelector('#app').innerHTML = `

    <div class="home">

      <h1 class="home-title">🛍️ DO‘KON</h1>

      <div class="home-menu">

        <button
          class="big-menu-button stars-menu"
          onclick="openStars()"
        >
          <span class="big-menu-icon">⭐</span>
          <span class="big-menu-text">STARS</span>
        </button>

        <button
          class="big-menu-button gift-menu"
          onclick="openGift()"
        >
          <span class="big-menu-icon">🎁</span>
          <span class="big-menu-text">GIFT</span>
        </button>

        <button
          class="big-menu-button producer-menu"
          onclick="openProducer()"
        >
          <span class="big-menu-icon">🏭</span>
          <span class="big-menu-text">ISHLAB CHIQARUVCHI</span>
        </button>

      </div>

    </div>

  `
}

function renderStars() {
  document.querySelector('#app').innerHTML = `

    <div class="shop">

      <div class="shop-header">

        <button
          class="back-button"
          onclick="goHome()"
        >
          ←
        </button>

        <h1>⭐ Telegram Stars</h1>

        <div class="cart-icon">
          🛒 <span>${getCartCount()}</span>
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
                ${product.price.toLocaleString()} so‘m
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

        <h2>🛒 Savatcha</h2>

        <div>
          ${renderCart()}
        </div>

        <div class="cart-total">

          <span>Jami:</span>

          <strong>
            ${getCartTotal().toLocaleString()} so‘m
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

function renderGift() {
  document.querySelector('#app').innerHTML = `

    <div class="shop">

      <div class="shop-header">

        <button
          class="back-button"
          onclick="goHome()"
        >
          ←
        </button>

        <h1>🎁 Gift</h1>

      </div>

      <div class="gift-grid" id="gift-grid">

        <div class="gift-loading">
          <div class="gift-loading-icon">🎁</div>
          <p>Giftlar yuklanmoqda...</p>
        </div>

      </div>

    </div>

  `

  loadGifts()
}


async function loadGifts() {

  const giftGrid = document.querySelector('#gift-grid')

  try {

    const response = await fetch('/api/gifts')

    if (!response.ok) {
      throw new Error('Giftlarni olishda xato')
    }

    const gifts = await response.json()

    if (!gifts.length) {
      giftGrid.innerHTML = `
        <div class="gift-loading">
          <div class="gift-loading-icon">🎁</div>
          <p>Hozircha Gift mavjud emas</p>
        </div>
      `
      return
    }

    giftGrid.innerHTML = gifts
      .slice(0, 20)
      .map((gift) => `

        <div class="gift-card">

          <div class="gift-image-box">

            <img
              class="gift-image"
              src="${gift.image}"
              alt="${gift.name}"
            >

          </div>

          <div class="gift-info">

            <h3>${gift.name}</h3>

            <div class="gift-price">
              ${Number(gift.price).toLocaleString('uz-UZ')} so‘m
            </div>

            <button
              class="gift-buy-button"
              onclick="buyGift(${gift.id})"
            >
              Sotib olish
            </button>

          </div>

        </div>

      `)
      .join('')

  } catch (error) {

    console.error(error)

    giftGrid.innerHTML = `

      <div class="gift-loading">

        <div class="gift-loading-icon">⚠️</div>

        <h3>Giftlarni yuklab bo‘lmadi</h3>

        <p>Keyinroq qayta urinib ko‘ring</p>

      </div>

    `
  }
}


window.buyGift = function(id) {

  const tg = window.Telegram?.WebApp

  if (tg) {
    tg.showAlert(
      'Gift sotib olish funksiyasi tez orada ulanadi.'
    )
  } else {
    alert(
      'Gift sotib olish funksiyasi tez orada ulanadi.'
    )
  }

}

function renderProducer() {
  document.querySelector('#app').innerHTML = `

    <div class="shop">

      <div class="shop-header">

        <button
          class="back-button"
          onclick="goHome()"
        >
          ←
        </button>

        <h1>🏭 Ishlab chiqaruvchi</h1>

      </div>

      <div class="contact-section">

        <div class="contact-icon">
          🏭
        </div>

        <h2>SHERALIYEV MUHAMMADJON</h2>

        <p class="contact-description">
          Biz bilan bog‘laning
        </p>

        <a
          class="contact-button"
          href="https://t.me/MU4AMMADJON"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>✈️</span>
          Telegram
        </a>

        <a
          class="contact-button"
          href="https://www.instagram.com/RON_CBR/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>📸</span>
          Instagram
        </a>

        <a
          class="contact-button"
          href="tel:+998959334333"
        >
          <span>📞</span>
          +998 95 933 43 33
        </a>

      </div>

    </div>

  `
}

window.saveProducerInfo = function () {

  const firstName = document.querySelector('#MUHAMMADJON').value.trim()
  const lastName = document.querySelector('#SHERALIYEV').value.trim()
  const phone = document.querySelector('#+998959334333').value.trim()

  if (!firstName || !lastName || !phone) {
    showAlert('Iltimos, barcha maydonlarni to‘ldiring!')
    return
  }

  localStorage.setItem(
    'producerInfo',
    JSON.stringify({
      firstName,
      lastName,
      phone
    })
  )

  showAlert('Ma’lumotlar saqlandi ✅')
}

window.openStars = function () {
  renderStars()
}

window.openGift = function () {
  renderGift()
}

window.openProducer = function () {
  renderProducer()
}

window.goHome = function () {
  renderHome()
}

window.addToCart = function (id) {

  const product = products.find(
    product => product.id === id
  )

  if (!product) return

  const existingProduct = cart.find(
    item => item.id === id
  )

  if (existingProduct) {
    existingProduct.quantity++
  } else {
    cart.push({
      ...product,
      quantity: 1
    })
  }

  renderStars()
}

window.increaseQuantity = function (id) {

  const item = cart.find(
    item => item.id === id
  )

  if (item) {
    item.quantity++
  }

  renderStars()
}

window.decreaseQuantity = function (id) {

  const item = cart.find(
    item => item.id === id
  )

  if (!item) return

  if (item.quantity > 1) {
    item.quantity--
  } else {
    cart = cart.filter(
      product => product.id !== id
    )
  }

  renderStars()
}

window.removeFromCart = function (id) {

  cart = cart.filter(
    item => item.id !== id
  )

  renderStars()
}

window.orderCart = function () {

  if (cart.length === 0) {
    showAlert('Savatcha bo‘sh!')
    return
  }

  const total = getCartTotal().toLocaleString()

  showAlert(
    `Buyurtma summasi: ${total} so‘m`
  )
}

function startApp() {

  document.querySelector('#app').innerHTML = `

    <div class="loading">

      <div class="loading-icon">
        ⭐
      </div>

      <h1>Do‘kon yuklanmoqda...</h1>

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