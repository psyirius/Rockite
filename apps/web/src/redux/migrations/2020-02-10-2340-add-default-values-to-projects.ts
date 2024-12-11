import type { Migration } from '$types/migration'

export default {
  id: '2020-02-10-2340-add-default-values-to-projects',
  execute: (state: any) => {
    Object.values(state.projects).forEach((project: any) => {
      project.defaultSocketUrl = ''
      project.defaultSocketProtocols = []
      project.defaultSocketAutoReconnect = false
      project.formatEventPayloads = true
    })

    return state
  },
} satisfies Migration
