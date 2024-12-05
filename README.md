<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/psyirius/rockite/master/images/rockite-dark.svg">
    <img alt="Rockite - Modern WebSockets Client" src="https://raw.githubusercontent.com/psyirius/rockite/master/images/rockite-light.svg" width="256px">
  </picture>
</div>

###

<div align="center">

[![License](https://img.shields.io/npm/l/nx.svg?style=flat-square)]()

</div>

<hr>

# Rockite

Rockite is a tool designed to assist in developing and debugging WebSocket connections.

#### Rockite is a fork of the original project: [WebSocket King](https://github.com/tomlerendu/Websocket-King)

## Screenshots

![Rockite - First Look](/images/screenshot-0.png)
![Rockite - Dual Pane](/images/screenshot-1.png)

## Features

- Projects
- Connections
- Payloads
- Incoming Text & Binary Messages
- Outgoing Text Messages (Binary coming soon)
- Custom WebSocket Protocols
- Auto Reconnect

## Roadmap

- Collection
- Import/Export
- Binary data support
- Light and dark mode
- Hotkeys support
- Custom HTTP headers
- Hex and Syntax Highlighted Editor & Viewer
- Low-level logging in Electron/Tauri build
- Other Real-time protocols support like MQTT, Socket.io, etc.

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

