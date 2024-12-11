import type { Migration } from '$types/migration'

export default {
  id: '2020-10-22-1816-add-sidebar-open',
  execute: (state: any) => {
    state.userInterface = { sidebarOpen: true }
    return state
  },
} satisfies Migration
