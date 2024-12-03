/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly WSK_ENABLE_REDUX_DEV_TOOLS: string
    readonly WSK_PLATFORM: string
    readonly WSK_PERSISTENCE_DRIVER: string
    readonly WSK_GOOGLE_ANALYTICS_ID: string
    readonly WSK_SENTRY_DSN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
