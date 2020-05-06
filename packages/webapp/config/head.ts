import { Configuration } from '@nuxt/types';

import pkg from '../package.json';
import constData from './const';

const head: Configuration['head'] = {
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  meta: [
    { charset: 'utf-8' },
    { name: 'robots', content: 'noindex' },
    { name: 'robots', content: 'nofollow' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    // {
    //   hid: 'keywords',
    //   name: 'keywords',
    //   content: config.keywords.join(','),
    // },
    { hid: 'description', name: 'description', content: pkg.description },
    // { hid: 'og:type', property: 'og:type', content: 'website' },
    // { hid: 'og:url', property: 'og:url', content: config.url },
    // {
    //   hid: 'og:title',
    //   property: 'og:title',
    //   content: '',
    //   template: config.titleTemplate,
    // },
    // {
    //   hid: 'og:description',
    //   property: 'og:description',
    //   content: pkg.description,
    // },
    // {
    //   hid: 'og:image',
    //   property: 'og:image',
    //   content: 'https://example.com/ogp.jpg',
    // },
    // {
    //   hid: 'og:site_name',
    //   property: 'og:site_name',
    //   content: '',
    //   template: config.titleTemplate,
    // },
    // { hid: 'twitter:card', name: 'twitter:card', content: pkg.description },
    // {
    //   hid: 'twitter:title',
    //   property: 'twitter:title',
    //   content: '',
    //   template: config.titleTemplate,
    // },
  ],
  titleTemplate: '%s | ' + constData.title,
  title: constData.title,
};

export default head;
