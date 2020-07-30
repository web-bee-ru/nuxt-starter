import path from 'path';
import process from 'process';
import { NuxtConfig } from '@nuxt/types';

const NUXT_MODE = process.env.NUXT_MODE || 'universal';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

const APP_BASE_URL = process.env.APP_ROUTER_BASE_URL || '/';

const config: NuxtConfig = {
  buildModules: ['@nuxt/typescript-build', 'nuxt-composition-api', '@nuxtjs/axios'],

  mode: parseNuxtMode(NUXT_MODE),

  srcDir: getNuxtConfigDir(),

  // @NOTE: Details: ~/server/README.md
  serverMiddleware: [],

  server: {
    host: HOST,
    port: PORT,
  },

  router: {
    base: APP_BASE_URL,
  },

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
        src: 'src/views/error.html',
        dst: 'views/error.html',
      },
    ],
  },
};

export default config;

// === //

function parseNuxtMode(raw: string | undefined): NuxtConfig['mode'] {
  if (raw === 'spa' || raw === 'universal' || raw === undefined) return raw;
  throw new Error(`Unexpected NUXT_MODE value: ${JSON.stringify(raw)}. Expected 'spa', 'universal' or undefined.`);
}

// @DOC: Return relative directory from root to the Nuxt config directory.
//       Necessary due to our build goals (TS in dev, JS in build & start).
function getNuxtConfigDir(): 'src' | 'build' {
  const raw = path.relative(process.cwd(), __dirname);
  if (raw === 'src' || raw === 'build') return raw;
  throw new Error(`Unexpected Nuxt config dir: ${JSON.stringify(raw)}. Expected 'src' or 'build'.`);
}
