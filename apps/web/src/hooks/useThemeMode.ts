import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ThemeMode = 'system' | 'light' | 'dark'
export type Theme = Exclude<ThemeMode, 'system'>

type State = {
  mode: ThemeMode
  theme: Theme
  setMode: (mode: ThemeMode) => void
  /** @internal */
  _setup: () => void
}

const storage = createJSONStorage<State>(() => localStorage, {
  reviver: (_key: string, value: any) => {
    if (value && value.type === 'date') {
      return new Date(value)
    }
    return value
  },
  replacer: (_key, value) => {
    if (value instanceof Date) {
      return { type: 'date', value: value.toISOString() }
    }
    return value
  },
})

export const useThemeMode = create(
  persist<State>(
    (set, get) => {
      const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

      const changeTheme = (theme: ThemeMode, system: Theme) => {
        document.body.classList.remove('light')
        document.body.classList.remove('dark')

        let _theme: Theme;

        if (theme === 'system') { // follow system theme
          _theme = system
        } else {
          _theme = theme
        }

        if (_theme === 'dark') {
          document.body.classList.add('dark')
        } else {
          document.body.classList.add('light')
        }
      }

      const onThemeChange = (system: Theme) => {
        const state: State = get() || {}

        const { mode } = state

        if (mode === 'system') {
          changeTheme(mode, system)

          set({ theme: system })
        }
      }

      const getSystemTheme = () => darkModeMediaQuery.matches ? 'dark' : 'light'

      darkModeMediaQuery.addEventListener('change', (e) => onThemeChange(e.matches ? 'dark' : 'light'))

      return ({
        mode: 'system',
        theme: getSystemTheme(),
        setMode: (mode) => {
          const systemTheme = getSystemTheme()

          changeTheme(mode, systemTheme)

          const theme = mode === 'system' ? systemTheme : mode

          set({ mode, theme })
        },
        _setup: () => {
          const state: State = get()

          const systemTheme = getSystemTheme()

          state.mode ??= 'system'
          state.theme ??= state.mode === 'system' ? systemTheme : state.mode

          changeTheme(state.mode, state.theme)

          set(state)
        }
      })
    },
    {
      name: 'theme-mode',
      storage,
      onRehydrateStorage: (state) => {
        return () => state._setup()
      },
    },
  ),
)