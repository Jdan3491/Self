interface ImportMetaEnv {
  VITE_SUPABASE_URL: string;
  VITE_ANON_KEY: string;
  BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
