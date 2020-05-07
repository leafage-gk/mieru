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
        <v-toolbar dense flat>
          <v-spacer />
          <v-btn-toggle dense :value="tool" @change="selectTool">
            <v-btn small v-for="(icon, index) in tools" :key="index">
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-menu v-model="palette" offset-y>
            <template v-slot:activator="{ on }">
              <v-chip class="ma-2" small :color="color" v-on="on" />
            </template>
            <v-color-picker v-model="color"></v-color-picker>
          </v-menu>
        </v-toolbar>
      </v-row>
      <v-row justify="center" align="stretch" no-gutters style="flex: 1;">
        <v-col>
          <grid-tree :item="root" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';

import { injectWithE, storeKey } from '~/hooks';

export default defineComponent({
  components: {
    GridTree: () => import('~/components/organisms/GridTree.vue'),
  },
  setup() {
    const state = reactive({
      palette: false,
    });
    const {
      dashboard: { root },
      tools: { tool, tools, selectTool, color },
    } = injectWithE(storeKey);
    return {
      root,
      tool,
      tools,
      selectTool,
      color,
      ...toRefs(state),
    };
  },
});
</script>
