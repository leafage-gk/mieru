<template>
  <v-content>
    <v-container fluid class="fill-height">
      <v-row justify="end" align="center" class="px-3">
        編集モード
      </v-row>
      <grid-group :item="root" />
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import GridGroup from '~/components/organisms/GridGroup.vue';
import { injectWithE, storeKey } from '~/hooks';

export default defineComponent({
  components: {
    GridGroup,
  },
  setup() {
    const {
      dashboard: { root },
    } = injectWithE(storeKey);
    return {
      root,
    };
  },
});
</script>
