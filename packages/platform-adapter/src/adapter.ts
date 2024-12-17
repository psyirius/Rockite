import { WebSocket } from './websocket'
import { SocketIO } from './socket-io'

/*
* Ideas
* - WebSockets
* - Socket.IO
* - MQTT
* - gRPC
* - WebHooks (Http Tunneling)
* - WebTransport
* - WebRTC
* - ServerSentEvents
* - SignalR
* - HTTP, HTTPS, HTTP2, HTTP3
* - Raw: TCP, UDP, DNS, etc.
* - OpenAPI
* - GraphQL
* - REST
* - SOAP
* - JSON-RPC
* - XML-RPC
* - Thrift (Apache)
*
* Features
* - Vault for Secrets Management (Keytar, Keychain, etc.)
* - Console for Logging
* - Scripting using Wasm
*   - JavaScript (QuickJS.wasm)
*   - Python (Pyodide.wasm)
* */

interface HttpClient {
  request(method: string, url: string, data: any): Promise<any>;
}

interface HttpServer {
  listen(port: number, callback: () => void): void;

  close(): void;
}

interface Http {
  client: HttpClient;

  server: HttpServer;
}

interface ServerSentEvents {
}

interface MQTT {
}

interface SignalR {
}

interface WebRTC {
}

interface gRPC {

}

interface Net {
  // Http
  http: Http;

  // WebSocket
  webSocket: WebSocket;

  // Socket.IO
  socketIO: SocketIO;

  // SignalR
  signalR: SignalR;

  // MQTT
  mqtt: MQTT;

  // gRPC
  gRPC: gRPC;

  // WebRTC
  webRTC: WebRTC;

  // ServerSentEvents
  sse: ServerSentEvents;

  // WebTransport
  webTransport: WebTransport;
}

interface Filesystem {
  readFile(path: string): Promise<string>;

  readFileSync(path: string): string;

  writeFile(path: string, data: string): Promise<void>;

  writeFileSync(path: string, data: string): void;

  appendFile(path: string, data: string): Promise<void>;

  appendFileSync(path: string, data: string): void;

  exists(path: string): Promise<boolean>;

  existsSync(path: string): boolean;

  mkdir(path: string): Promise<void>;

  mkdirSync(path: string): void;

  readdir(path: string): Promise<string[]>;

  readdirSync(path: string): string[];

  stat(path: string): Promise<any>;

  statSync(path: string): any;
}

interface Scripting {

}

interface Vault {

}

export interface PlatformAdapter {
  // Net
  net: Net;

  // Filesystem
  fs: Filesystem;

  // Scripting
  scripting: Scripting;

  // Vault
  vault: Vault;
}