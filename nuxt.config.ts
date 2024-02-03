// htps://nuxt.com/docs/api/configuration/nuxt-config
import tailwindTypography from '@tailwindcss/typography';
import dayjs from 'dayjs';
import p from './package.json';
export default defineNuxtConfig({
  devtools: { enabled: String(process.env.APP_ENV) !== 'production' },
  nitro: {
    preset: 'vercel',
  },
  sourcemap: true,
  devServer: {
    https: false,
  },
  plugins: ['~/plugins/preline.client.ts'],
  modules: [
    [
      '@nuxtjs/eslint-module',
      {
        formatter: 'stylish',
      },
    ],
    '@pinia/nuxt',
    [
      '@nuxtjs/tailwindcss',
      {
        config: {
          content: [],
          plugins: [tailwindTypography],
        },
      },
    ],
  ],
  runtimeConfig: {
    // const config = useRuntimeConfig();
    startAt: dayjs().format(),
    microCms: {
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
      apiKey: process.env.MICROCMS_API_KEY,
    },
    public: {
      // const { public: config } = useRuntimeConfig();
      app: {
        version: String(p.version) as string,
      },
      env: (() => {
        const env = String(process.env.ENV);
        if (env === 'staging') return env;
        if (env === 'production') return env;
        return 'development';
      })(),
      url: String(process.env.APP_URL) || '',
    },
  },
  css: ['@/assets/scss/main.scss'],
});
