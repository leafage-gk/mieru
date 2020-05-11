<template>
  <v-col
    :style="{
      flex: `0 0 ${item.size * 100}%`,
      maxWidth: `${item.size * 100}%`,
    }"
  >
    <dock-operator :target="target" :hooks="hooks">
      <dock-container v-if="item.type === 'container'" :target="item.node" />
      <dock-unit v-else :target="item.node" />
    </dock-operator>
  </v-col>
</template>

<script lang="ts">
import { MDockColKey } from '@mieru/dock';
import { defineComponent, PropType } from '@vue/composition-api';

import { injectWithE, storeKey } from '~/hooks';
import { DockOperatorHooks } from '~/hooks/dock/operator';

import DockOperator from './Operator.vue';
import DockUnit from './Unit.vue';

export default defineComponent({
  props: {
    target: {
      type: String,
      required: true,
    },
    hooks: {
      type: Object as PropType<DockOperatorHooks>,
      required: true,
    },
  },
  components: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DockContainer: () => import('./Container.vue') as any,
    DockOperator,
    DockUnit,
  },
  setup(props) {
    const store = injectWithE(storeKey);
    const item = store.dock.repo.getCol(props.target as MDockColKey);

    return {
      item,
    };
  },
});
</script>
