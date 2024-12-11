import type { Migration } from '$types/migration'

export default {
  id: '2020-10-21-2355-add-order-to-connections',
  execute: (state: any) => {
    const orderCounts: any = {}

    Object.values(state.connections).forEach((connection: any) => {
      orderCounts[connection.projectId] = orderCounts[connection.projectId] ? orderCounts[connection.projectId] + 1 : 1

      connection.order = orderCounts[connection.projectId]
      connection.maximized = connection.maximizedOrder !== null
      connection.minimizedOrder = undefined
      connection.maximizedOrder = undefined
    })

    return state
  },
} satisfies Migration
