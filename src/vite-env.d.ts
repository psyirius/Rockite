/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly ROCKITE_ENABLE_REDUX_DEV_TOOLS: string
    readonly ROCKITE_PLATFORM: string
    readonly ROCKITE_PERSISTENCE_DRIVER: string
    readonly ROCKITE_GOOGLE_ANALYTICS_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
