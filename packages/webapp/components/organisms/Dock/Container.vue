<template>
  <v-container
    fluid
    ref="containerRef"
    class="fill-height align-stretch flex-column pa-0"
  >
    <dock-row
      v-for="row in item.rows"
      :key="row"
      :target="row"
      :hooks="dockOperatorHooks"
    />
  </v-container>
</template>

<script lang="ts">
import { MDockContainerKey } from '@mieru/dock';
import { defineComponent } from '@vue/composition-api';

import { injectWithE, storeKey } from '~/hooks';
import { useDockOperator } from '~/hooks/dock/operator';

import DockRow from './Row.vue';

export default defineComponent({
  name: 'dock-container',
  props: {
    target: {
      type: String,
      required: true,
    },
  },
  components: {
    DockRow,
  },
  setup(props) {
    const { containerRef, dockOperatorHooks } = useDockOperator();

    const store = injectWithE(storeKey);
    const item = store.dock.repo.getContainer(
      props.target as MDockContainerKey,
    );

    return {
      containerRef,
      dockOperatorHooks,
      item,
    };
  },
});
</script>
