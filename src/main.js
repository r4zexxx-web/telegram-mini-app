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

    <div class="shop">

      <div class="shop-header">
        <h1>🛍️ Do‘kon</h1>

        <div class="cart-icon">
          🛒 <span>${getCartCount()}</span>
        </div>
      </div>

      <div class="menu">

        <button
          class="menu-button"
          onclick="openStars()"
        >
          <span class="menu-icon">⭐</span>
          <span>Stars</span>
        </button>

        <button
          class="menu-button"
          onclick="openGift()"
        >
          <span class="menu-icon">🎁</span>
          <span>Gift</span>
        </button>

        <button
          class="menu-button"
          onclick="openProducer()"
        >
          <span class="menu-icon">🏭</span>
          <span>Ishlab chiqaruvchi</span>
        </button>

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

      <div class="empty-section">

        <div class="big-icon">
          🎁
        </div>

        <h2>Gift</h2>

        <p>
          Bu bo‘lim tez orada ishga tushadi.
        </p>

      </div>

    </div>
  `
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

      <div class="empty-section">

        <div class="big-icon">
          🏭
        </div>

        <h2>Ishlab chiqaruvchi</h2>

        <p>
          Bu bo‘lim tez orada ishga tushadi.
        </p>

      </div>

    </div>
  `
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