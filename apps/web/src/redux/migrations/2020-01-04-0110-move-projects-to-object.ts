import type { Migration } from '@/types/migration'

export default {
  id: '2020-01-04-0110-move-projects-to-object',
  execute: (state: any) => {
    const projects: any = {}

    state.projects.forEach((project: any) => {
      projects[project.id] = project
    })

    return {
      ...state,
      projects,
    }
  },
} satisfies Migration
