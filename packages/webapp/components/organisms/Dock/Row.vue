<template>
  <v-row
    justify="center"
    align="stretch"
    no-gutters
    :style="{ flex: item.size, position: 'relative' }"
  >
    <dock-col
      v-for="col in item.cols"
      :key="col"
      :target="col"
      :hooks="hooks"
    />
  </v-row>
</template>

<script lang="ts">
import { MDockRowKey } from '@mieru/dock';
import { defineComponent, PropType } from '@vue/composition-api';

import { injectWithE, storeKey } from '~/hooks';
import { DockOperatorHooks } from '~/hooks/dock/operator';

import DockCol from './Col.vue';

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
    DockCol,
  },
  setup(props) {
    const store = injectWithE(storeKey);
    const item = store.dock.repo.getRow(props.target as MDockRowKey);

    return {
      item,
    };
  },
});
</script>
