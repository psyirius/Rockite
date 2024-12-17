import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifestVersion: 3,
  manifest: {
    name: "Rockite - WebSocket Client",
    short_name: "Rockite",
    permissions: [
      "unlimitedStorage"
    ],
    action: { // Required for browser action
      default_title: 'Rockite',
      default_icon: {
        "19": "images/logo19.png",
        "38": "images/logo38.png"
      }
    },
  },
});
