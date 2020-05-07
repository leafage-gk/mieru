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
        <toolbar-dashboard v-model="toolVal" />
      </v-row>
      <v-row justify="center" align="stretch" no-gutters style="flex: 1;">
        <v-col>
          <dock-panel :item="root" />
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
    ToolbarDashboard: () =>
      import('~/components/molecules/ToolbarDashboard.vue'),
    DockPanel: () => import('~/components/organisms/DockPanel.vue'),
  },
  setup() {
    const {
      dashboard: { root },
      tools: { toolVal },
    } = injectWithE(storeKey);

    return {
      root,
      toolVal,
    };
  },
});
</script>
