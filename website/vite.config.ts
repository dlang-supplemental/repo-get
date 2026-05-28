import path from "path"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [solid()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    }
  }
})
