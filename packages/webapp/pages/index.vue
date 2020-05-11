<template>
  <v-content>
    <v-container fluid class="fill-height flex-column align-stretch">
      <v-row
        justify="end"
        align="center"
        no-gutters
        class="px-3"
        style="flex: 0;"
      >
        <toolbar-dock v-model="toolVal" />
      </v-row>
      <v-row justify="center" align="stretch" no-gutters style="flex: 1;">
        <v-col>
          <dock-container :target="rootKey" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import { injectWithE, storeKey } from '~/hooks';

export default defineComponent({
  components: {
    ToolbarDock: () => import('~/components/molecules/ToolbarDock.vue'),
    DockContainer: () => import('~/components/organisms/Dock/Container.vue'),
  },
  setup() {
    const store = injectWithE(storeKey);

    return {
      rootKey: store.dock.repo.rootKey,
      toolVal: store.dock.tools.toolVal,
    };
  },
});
</script>
