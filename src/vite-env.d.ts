/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_NODE_ENV: string;
  readonly VITE_APP_BACKEND_PROD: string;
  readonly VITE_APP_BACKEND_DEV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
