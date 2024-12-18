import { defineConfig } from 'wxt';
import { compileCSP } from '@rockite/build-utils'

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
    content_security_policy: {
      extension_pages: compileCSP({
        'default-src': "'self'",
        'script-src': ["'self'", "'wasm-unsafe-eval'"], // wasm-unsafe-eval is required for WebAssembly
        'style-src': ["'self'", "'unsafe-inline'"], // unsafe-inline is required for inline styles
        'font-src': ["'self'", "data:"], // data: is required for inline fonts
        'connect-src': [
          "'self'",
          "ws:",
          "wss:",
        ],
      }),
    }
  },
});
