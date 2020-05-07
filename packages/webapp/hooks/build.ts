import { provide } from '@vue/composition-api';

import constData from '~/config/const';

import { settingsKeys, storeKey } from './keys';
import useStore from './store';

const build = () => {
  provide(settingsKeys.title, constData.title);
  provide(settingsKeys.url, constData.url);

  const store = useStore();
  provide(storeKey, store);

  return {
    settings: {
      title: constData.title,
      url: constData.url,
    },
    store,
  };
};

export default build;
