export interface SocketIO {
  on(event: string, listener: (...args: any[]) => void): this;

  emit(event: string, ...args: any[]): this;

  close(): void;
}