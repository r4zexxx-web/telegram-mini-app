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
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
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
    return '<p class="empty-cart">Savatcha hozircha bo‘sh 🛒</p>'
  }

  return cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">${item.emoji}</div>
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>${item.price.toLocaleString()} so‘m</span>
        <div class="quantity">
          <button class="quantity-button" onclick="decreaseQuantity(${item.id})">−</button>
          <span>${item.quantity}</span>
          <button class="quantity-button" onclick="increaseQuantity(${item.id})">+</button>
        </div>
      </div>
      <button class="remove-button" onclick="removeFromCart(${item.id})">❌</button>
    </div>
  `).join('')
}

function renderHome() {
  const app = document.querySelector('#app')
  if (!app) return
  app.innerHTML = `
    <div class="home">
      <h1 class="home-title">🛍️ DO‘KON</h1>
      <div class="home-menu">
        <button class="big-menu-button stars-menu" onclick="openStars()">
          <span class="big-menu-icon">⭐</span>
          <span class="big-menu-text">STARS</span>
        </button>
        <button class="big-menu-button gift-menu" onclick="openGift()">
          <span class="big-menu-icon">🎁</span>
          <span class="big-menu-text">GIFT</span>
        </button>
        <button class="big-menu-button producer-menu" onclick="openProducer()">
          <span class="big-menu-icon">🏭</span>
          <span class="big-menu-text">ISHLAB CHIQARUVCHI</span>
        </button>
      </div>
    </div>
  `
}

function renderStars() {
  const app = document.querySelector('#app')
  if (!app) return

  const productsHTML = products.map(product => `
    <div class="product">
      <div class="product-icon">${product.emoji}</div>
      <div class="product-info">
        <h2>${product.name}</h2>
        <p>${product.price.toLocaleString()} so‘m</p>
      </div>
      <button onclick="addToCart(${product.id})">Sotib olish</button>
    </div>
  `).join('')

  app.innerHTML = `
    <div class="shop">
      <div class="shop-header">
        <button class="back-button" onclick="goHome()">←</button>
        <h1>⭐ Telegram Stars</h1>
        <div class="cart-icon">🛒 <span>${getCartCount()}</span></div>
      </div>

      <div class="products">
        ${productsHTML}
      </div>

      <div class="cart">
        <h2>🛒 Savatcha</h2>
        <div>${renderCart()}</div>
        <div class="cart-total">
          <span>Jami:</span>
          <strong>${getCartTotal().toLocaleString()} so‘m</strong>
        </div>
        <button class="order-button" onclick="orderCart()">Buyurtma berish</button>
      </div>
    </div>
  `
}

function renderGift() {
  const app = document.querySelector('#app')
  if (!app) return
  app.innerHTML = `
    <div class="shop">
      <div class="shop-header">
        <button class="back-button" onclick="goHome()">←</button>
        <h1>🎁 Telegram Gifts</h1>
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
  if (!giftGrid) return

  try {
    const response = await fetch(
      'https://vercel.app',
      { cache: 'no-store' }
    )

    if (!response.ok) throw new Error('API ishlamadi')
    const gifts = await response.json()

    if (!Array.isArray(gifts) || gifts.length === 0) {
      giftGrid.innerHTML = `
        <div class="gift-loading">
          <div class="gift-loading-icon">🎁</div>
          <p>Hozircha Gift mavjud emas</p>
        </div>
      `
      return
    }

    giftGrid.innerHTML = gifts.map(gift => {
      const imageUrl = gift.imageFileId
        ? 'https://vercel.app' + encodeURIComponent(gift.imageFileId)
        : ''
      const price = Number(gift.price || 0).toLocaleString('uz-UZ')

      return `
        <div class="gift-card">
          <div class="gift-image-box">
            ${imageUrl ? `
              <img class="gift-image" src="imageUrl" alt="{gift.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
              <div class="gift-image-fallback" style="display:none;">🎁</div>
            ` : `<div class="gift-image-fallback">🎁</div>`}
          </div>
          <div class="gift-info">
            <h3>${gift.name}</h3>
            <div class="gift-stars">⭐ ${gift.stars || 0} Stars</div>
            <div class="gift-price">${price} so‘m</div>
            <button class="gift-buy-button" onclick="buyGift('${gift.id}')">Sotib olish</button>
          </div>
        </div>
      `
    }).join('')

  } catch (error) {
    console.error(error)
    giftGrid.innerHTML = `
      <div class="gift-loading">
        <div class="gift-loading-icon">⚠️</div>
        <h3>Yuklab bo‘lmadi</h3>
      </div>
    `
  }
}

function addToCart(id) {
  const product = products.find(p => p.id === id)
  if (!product) return
  const cartItem = cart.find(item => item.id === id)
  if (cartItem) {
    cartItem.quantity++
  } else {
    cart.push({ ...product, quantity: 1 })
  }
  renderStars()
}

function increaseQuantity(id) {
  const cartItem = cart.find(item => item.id === id)
  if (cartItem) {
    cartItem.quantity++
    renderStars()
  }
}

function decreaseQuantity(id) {
  const cartItem = cart.find(item => item.id === id)
  if (cartItem) {
    cartItem.quantity--
    if (cartItem.quantity === 0) cart = cart.filter(item => item.id !== id)
    renderStars()
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id)
  renderStars()
}

function orderCart() {
  if (cart.length === 0) return showAlert('Savatchangiz bo‘sh!')
  showAlert('Buyurtmangiz qabul qilindi! Jami: ' + getCartTotal().toLocaleString() + ' so‘m.')
  cart = []
  renderStars()
}

function buyGift(id) {
  showAlert('Sotib olish funksiyasi ulanmoqda. Gift ID: ' + id)
}

function openProducer() {
  const app = document.querySelector('#app')
  if (!app) return
  app.innerHTML = `
    <div class="shop">
      <div class="shop-header">
        <button class="back-button" onclick="goHome()">←</button>
        <h1>🏭 Ishlab chiqaruvchi</h1>
      </div>
      <div style="padding: 20px; color: #fff; text-align: center;">
        <p>Ushbu bo‘lim hozircha ishlab chiqilmoqda...</p>
      </div>
    </div>
  `
}

window.goHome = renderHome
window.openStars = renderStars
window.openGift = renderGift
window.addToCart = addToCart
window.increaseQuantity = increaseQuantity
window.decreaseQuantity = decreaseQuantity
window.removeFromCart = removeFromCart
window.orderCart = orderCart
window.buyGift = buyGift
window.openProducer = openProducer

renderHome()
