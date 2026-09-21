import './style.css'

const products = [
  {
    id: 1,
    name: 'Mahsulot 1',
    price: 15000,
    emoji: '🛍️'
  },
  {
    id: 2,
    name: 'Mahsulot 2',
    price: 25000,
    emoji: '🎁'
  },
  {
    id: 3,
    name: 'Mahsulot 3',
    price: 35000,
    emoji: '⭐'
  }
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

function renderApp() {
  document.querySelector('#app').innerHTML = `
    <div class="shop">

      <div class="shop-header">
        <h1>🛍️ Do‘kon</h1>

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
              <h2>${product.name}</h2>
              <p>${product.price.toLocaleString()} so‘m</p>
            </div>

            <button onclick="addToCart(${product.id})">
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

        <button class="order-button" onclick="orderCart()">
          Buyurtma berish
        </button>

      </div>

    </div>
  `
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

window.addToCart = function (id) {
  const product = products.find(product => product.id === id)

  const existingProduct = cart.find(item => item.id === id)

  if (existingProduct) {
    existingProduct.quantity++
  } else {
    cart.push({
      ...product,
      quantity: 1
    })
  }

  renderApp()
}

window.increaseQuantity = function (id) {
  const item = cart.find(item => item.id === id)

  if (item) {
    item.quantity++
  }

  renderApp()
}

window.decreaseQuantity = function (id) {
  const item = cart.find(item => item.id === id)

  if (!item) return

  if (item.quantity > 1) {
    item.quantity--
  } else {
    cart = cart.filter(product => product.id !== id)
  }

  renderApp()
}

window.removeFromCart = function (id) {
  cart = cart.filter(item => item.id !== id)

  renderApp()
}

window.orderCart = function () {
  if (cart.length === 0) {
    if (tg) {
      tg.showAlert('Savatcha bo‘sh!')
    } else {
      alert('Savatcha bo‘sh!')
    }

    return
  }

  const message =
    `Buyurtma summasi: ${getCartTotal().toLocaleString()} so‘m`

  if (tg) {
    tg.showAlert(message)
  } else {
    alert(message)
  }
}

renderApp()