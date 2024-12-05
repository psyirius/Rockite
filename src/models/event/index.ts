import type Model from '$services/orm/model'

export enum EventType {
  Meta = 0,
  Sent = 1,
  Received = 2,
}

export enum EventFormat {
  Unknown = 0,
  Json = 1,
}

export type EventPayload = string

export enum EventPayloadType {
  Text = 1,
  Binary = 2,
}

export default interface Event extends Model {
  connectionId: string
  type: EventType
  format: EventFormat
  timestamp: string
  payload: EventPayload
  payloadType?: EventPayloadType
}
