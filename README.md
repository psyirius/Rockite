<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/assets/images/rockite-dark.svg">
    <img alt="Rockite - Modern WebSockets Client" src="/assets/images/rockite-light.svg" width="256px">
  </picture>
</div>

###

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/ajlfbfcpbnkjhmbpbdagjfnlmgcikmgg.svg?style=flat-square)](https://chrome.google.com/webstore/detail/ajlfbfcpbnkjhmbpbdagjfnlmgcikmgg)

</div>

<h1 align="center">Rockite</h1>

Rockite is a tool designed to assist in developing and debugging WebSocket connections.

#### Rockite is a fork of the original project: [WebSocket King](https://github.com/tomlerendu/Websocket-King)

## Screenshots

![Rockite - First Look](/assets/images/screenshot-0.png)
![Rockite - Dual Pane](/assets/images/screenshot-1.png)

## Features

- No Account Required (Data stored locally)
- Projects
  - Connections
    - History
  - Payloads
- Light & Dark Modes
- Receive Text & Binary Messages
- Send Text Messages (Binary is WIP 🚧)
- Custom WebSocket Protocols
- Auto Reconnect

## Roadmap

- Collections
- Import/Export
- Connection Timeout
- Custom HTTP headers (in supported builds)
- Binary data support & Hex Editor
- Inspect WebSocket Frames
- Low-level logging in Desktop builds
- Optional BYOC (Bring Your Own Cloud) Sync
- Actions
- Other Real-time protocols support like MQTT, Socket.io, etc.
- Runners (like Postman)
- Scripting support
- VSCode Extension
- npx (npm) executable

## Limitations

- No access to localhost `ws://` servers in web version (available in Desktop and Chrome Extension)

## Chrome Extension

- Get it from the [Chrome Web Store](https://chrome.google.com/webstore/detail/ajlfbfcpbnkjhmbpbdagjfnlmgcikmgg)
- Alternatively, you can download the extension from the [Releases](https://github.com/psyirius/Rockite/releases) page and install it manually
  - Download the `*-chrome.signed.crx` file
  - Open the Chrome Extensions page (`chrome://extensions`)
  - Drag and drop the downloaded file onto the Extensions page
  - Click "Add Extension" when prompted
  - Done!

## Firefox Extension

Coming Soon...

## Desktop Clients

Checkout [Releases](https://github.com/psyirius/Rockite/releases)

## Development

1. Clone the project repo
2. Run `pnpm install`
3. Run `pnpm copy-env` with `.dev.env` file
4. Run `pnpm dev` to start the development server

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@tomlerendu](https://www.github.com/tomlerendu)

