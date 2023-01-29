import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    VitePWA({
      // registerType: "autoUpdate",
      workbox: { globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,avif}"] },
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Swaminarayan Pad Chinha Meditation App",
        short_name: "Pad Chinha",
        description:
          "This app is a meditation tool for devotees of Lord Swaminarayan. It helps devotees focus on the sixteen divine symbols present in pious feet of Lord Swaminarayan.",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
    }),
  ],
  appType: "spa",
  build: {
    assetsInlineLimit: 0,
  },
});
