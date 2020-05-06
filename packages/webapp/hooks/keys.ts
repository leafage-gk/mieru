import { InjectionKey } from '@vue/composition-api';

import { Store } from './store';

export const settingsKeys = {
  title: Symbol('TitleSetting') as InjectionKey<string>,
  url: Symbol('UrlSetting') as InjectionKey<string>,
};

export const storeKey: InjectionKey<Store> = Symbol('Store');
