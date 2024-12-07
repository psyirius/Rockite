<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="/assets/images/rockite-dark.svg">
    <img alt="Rockite - Modern WebSockets Client" src="/assets/images/rockite-light.svg" width="256px">
  </picture>
</div>

###

<div align="center">

[![License](https://img.shields.io/npm/l/nx.svg?style=flat-square)]()

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
- Payloads
- Connection History
- Light & Dark Mode
- Incoming Text & Binary Messages
- Outgoing Text Messages (Binary coming soon)
- Custom WebSocket Protocols
- Auto Reconnect

## Roadmap

- Collections
- Import/Export
- Binary data support
- Custom HTTP headers
- Connection Timeout
- Optional Cloud Sync
- Hex and Syntax Highlighted Editor & Viewer
- Low-level logging in Desktop builds
- Other Real-time protocols support like MQTT, Socket.io, etc.

## Limitations

- No access to localhost servers in web version (available in Desktop and Chrome Extension)

## Development

1. Clone the project repo
2. `pnpm copy-env`
3. `pnpm dev`

## Production

### `pnpm build:chrome`

Builds the app for production (Chrome Extension) to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `pnpm build:web`

Builds the app for production (web) to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `pnpm build:electron`

BETA. Builds the app for production (Electron) to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@tomlerendu](https://www.github.com/tomlerendu)

