import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    watch: {
      ignored: [
        '**/AppData/Roaming/Telegram Desktop/**'
      ]
    }
  }
})