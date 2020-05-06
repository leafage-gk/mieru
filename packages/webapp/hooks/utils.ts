import { inject, InjectionKey } from '@vue/composition-api';

export const injectWithE = <T>(key: InjectionKey<T>) => {
  const injected = inject(key);
  if (injected === undefined) {
    throw new Error(`inject key: ${key.toString()} is not injected.`);
  }
  return injected;
};
