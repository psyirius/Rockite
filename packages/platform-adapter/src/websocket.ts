export enum WebSocketFeature {
  CLIENT,
  CLIENT_CUSTOM_HEADERS,
}

interface WebSocketClient {
  connect(url: string, protocols?: string | string[]): Promise<void>;

  close(): void;

  send(data: string | ArrayBuffer | Blob | ArrayBufferView): void;

  on(event: "open", listener: () => void): void;

  on(event: "close", listener: (event: CloseEvent) => void): void;

  on(event: "message", listener: (event: MessageEvent) => void): void;

  on(event: "error", listener: (event: Event) => void): void;

  on(event: string, listener: (...args: any[]) => void): void;

  off(event: "open", listener: () => void): void;

  off(event: "close", listener: (event: CloseEvent) => void): void;

  off(event: "message", listener: (event: MessageEvent) => void): void;

  off(event: "error", listener: (event: Event) => void): void;
}

interface WebSocketServer {
  listen(port: number, callback: () => void): void;

  close(): void;

  on(event: "connection", listener: (client: WebSocketClient) => void): void;

  on(event: "error", listener: (error: Error) => void): void;

  on(event: string, listener: (...args: any[]) => void): void;

  off(event: "connection", listener: (client: WebSocketClient) => void): void;

  off(event: "error", listener: (error: Error) => void): void;
}

export interface WebSocket {
  isSupported(feature: WebSocketFeature): boolean;

  client: WebSocketClient;

  server: WebSocketServer;
}