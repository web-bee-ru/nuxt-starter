import { NuxtConfig } from '@nuxt/types';
import path from 'path';
import process from 'process';

const NUXT_SSR = process.env.NUXT_SSR || 'false';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

const APP_BASE_URL = process.env.APP_BASE_URL || '/';

const environmentConfig = {
  // @NOTE: Start-time environment variables, can be read from `$config`
  publicRuntimeConfig: {
    // Example: `SERVICE_URL: process.env.SERVICE_URL || 'http://localhost:4000',`
    axios: {
      baseURL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
      browserBaseURL: process.env.API_BROWSER_BASE_URL,
    },
    env: (process.env.NODE_ENV || 'development') as 'production' | 'development',
  },

  // @DOC: доступен только во время SSR, расширяет (+ оверрайдит) publicRuntimeConfig
  privateRuntimeConfig: {},

  // @DOC: будет "зашито" при сборке, будет доступно только через process.env
  env: {},
};

type Config = typeof environmentConfig.publicRuntimeConfig & Partial<typeof environmentConfig.privateRuntimeConfig>;
declare module '@nuxt/types' {
  // @NOTE: nuxtContext.app.$config inside asyncData, plugins, middleware
  export interface NuxtAppOptions {
    $config: Config;
  }
}
declare module '@nuxt/types/config/runtime' {
  // @NOTE: this.$config inside Vue components
  export interface NuxtRuntimeConfig extends Config {}
}

const config: NuxtConfig = {
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api', '@nuxtjs/axios', 'cookie-universal-nuxt'],

  ssr: NUXT_SSR === 'true',

  srcDir: getNuxtConfigDir(),

  // @NOTE: Details: ~/server/README.md
  serverMiddleware: [],

  server: {
    host: HOST,
    port: PORT,
  },

  router: {
    base: APP_BASE_URL,
    middleware: ['example'],
  },

  plugins: [
    { src: '~/plugins/taxios', mode: 'all' },
    { src: '~/plugins/vue-toasted', mode: 'all' },
    { src: '~/plugins/prevent-dev-errors', mode: 'client' },
  ],

  ...(environmentConfig as any),

  css: ['~/assets/main.scss'],
};

export default config;

// @DOC: Return relative directory from root to the Nuxt config directory.
//       Necessary due to our build goals (TS in dev, JS in build & start).
function getNuxtConfigDir(): 'src' | 'build' {
  const raw = path.relative(process.cwd(), __dirname);
  if (raw === 'src' || raw === 'build') return raw;
  throw new Error(`Unexpected Nuxt config dir: ${JSON.stringify(raw)}. Expected 'src' or 'build'.`);
}
