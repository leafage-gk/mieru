<template>
  <div>
    {{ console.log(index) }}
    {{ value.now }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, InjectionKey } from '@vue/composition-api';

import { injectWithE } from '../hooks';

export const stateKey: InjectionKey<{ items: { now: string }[] }> = Symbol(
  'state',
);

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const state = injectWithE(stateKey);
    return {
      console,
      value: computed(() => state.items[props.index]),
    };
  },
});
</script>
