interface ImportMetaEnv {
  VITE_SUPABASE_URL: string;
  VITE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
