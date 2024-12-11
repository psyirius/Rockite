import type { Migration } from '@/types/migration'

export default {
  id: '2020-01-30-2131-remove-extra-root-keys',
  execute: (state: any) => {
    state.optionsPanelOpen = undefined

    return state
  },
} satisfies Migration
