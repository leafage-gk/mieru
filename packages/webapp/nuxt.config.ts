import { Configuration } from '@nuxt/types';

import env from './config/env';
import head from './config/head';
import dayjs from './config/modules/dayjs';
import vuetify from './config/modules/vuetify';

const configuration: Configuration = {
  mode: 'spa',
  head,
  env,
  loading: { color: 'white' },
  // css: ['~/assets/styles/app.scss'],
  plugins: ['~/plugins/composition-api'],
  modules: ['nuxt-dayjs-module'],
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build',
  ],
  build: {
    devtools: true,
  },
  dayjs,
  vuetify,
};

export default configuration;
