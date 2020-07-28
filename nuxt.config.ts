import { NuxtConfig } from '@nuxt/types';

const NUXT_MODE = process.env.NUXT_MODE || 'universal';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

const APP_BASE_URL = process.env.APP_ROUTER_BASE_URL || '/';

const config: NuxtConfig = {
  buildModules: ['@nuxt/typescript-build', 'nuxt-composition-api'],

  mode: parseNuxtMode(NUXT_MODE),

  server: {
    host: HOST,
    port: PORT,
  },

  router: {
    base: APP_BASE_URL,
  },

  modules: [
    // @REFERENCE: Axios configuration https://axios.nuxtjs.org/options.html#options
    '@nuxtjs/axios',
  ],

  plugins: ['~/plugins/taxios'],

  // @NOTE: Start-time environment variables, can be read from `$config`
  publicRuntimeConfig: {
    // Example: `SERVICE_URL: process.env.SERVICE_URL || 'http://localhost:4000',`
    axios: {
      baseURL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
      browserBaseURL: process.env.API_BROWSER_BASE_URL,
    },
  },

  // @NOTE: Build-time environment variables, can be read as `process.env.<NAME>`
  env: {
    // Example: `DEBUG_ENABLED: process.env.DEBUG_ENABLED || 'false'`,
  },

  build: {
    templates: [
      // @NOTE: This is needed to override Nuxt hard error page
      {
        src: 'views/error.html',
        dst: 'views/error.html',
      },
    ],
  },
};

export default config;

// === //

function parseNuxtMode(raw: string | undefined): NuxtConfig['mode'] {
  if (raw === 'spa') return 'spa';
  if (raw === 'universal') return 'universal';
  if (raw === undefined) return undefined;
  throw new Error(`Unexpected NUXT_MODE value: ${JSON.stringify(raw)}. Expected 'spa', 'universal' or undefined.`);
}
