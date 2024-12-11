import { EventPayloadType, EventType } from '$models/event'
import type { Migration } from '$types/migration'

export default {
  id: '2024-12-01-1638-add-payload-type-to-event',
  execute: (state: any) => {
    Object.values(state.events).forEach((event: any) => {
      if (event.type === EventType.Sent || event.type === EventType.Received) {
        event.payloadType ??= EventPayloadType.Text
      }
    })

    return state
  },
} satisfies Migration
