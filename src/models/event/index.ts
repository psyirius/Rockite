import Model from '$services/orm/model';

export enum EventType {
  Meta,
  Sent,
  Received,
}

export enum EventFormat {
  Unknown,
  Json,
}

export type EventPayload = string;

export enum EventPayloadType {
  Text = 1,
  Binary = 2,
}

export default interface Event extends Model {
  connectionId: string,
  type: EventType,
  format: EventFormat,
  timestamp: string,
  payload: EventPayload,
  payloadType?: EventPayloadType,
}
