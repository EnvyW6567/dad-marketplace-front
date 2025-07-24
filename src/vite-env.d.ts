interface ImportMetaEnv {
    readonly DEV: string
    readonly VITE_API_BASE_URL: string
    readonly VITE_API_DARKER_DB_URL: string
    readonly VITE_API_DARKER_DB_URL_ICON: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}