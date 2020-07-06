import { NuxtConfig } from '@nuxt/types';

const NUXT_MODE = process.env.NUXT_MODE || 'universal';
const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;

function getNuxtMode(): NuxtConfig['mode'] {
  const raw = NUXT_MODE;
  if (raw === 'spa') return 'spa';
  if (raw === 'universal') return 'universal';
  if (raw === undefined) return undefined;
  throw new Error(`Unexpected NUXT_MODE value: ${JSON.stringify(raw)}. Expected 'spa', 'universal' or undefined.`);
}

const config: NuxtConfig = {
  mode: getNuxtMode(),

  server: {
    host: HOST,
    port: PORT,
  },

  buildModules: ['@nuxt/typescript-build', 'nuxt-composition-api'],

  // @NOTE: Start-time environment variables, can be read from `$config`
  publicRuntimeConfig: {
    // Example: `SERVICE_URL: process.env.SERVICE_URL || 'http://localhost:4000',`
  },

  // @NOTE: Build-time environment variables, can be read as `process.env.<NAME>`
  env: {
    // Example: `DEBUG_ENABLED: process.env.DEBUG_ENABLED || 'false'`,
  },
};

export default config;
