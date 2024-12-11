import type { Migration } from '$types/migration'

export default {
  id: '2020-02-16-1201-add-created-at-to-projects',
  execute: (state: any) => {
    Object.values(state.projects).forEach((project: any) => {
      project.createdAt = new Date().toISOString()
    })

    return state
  },
} satisfies Migration
