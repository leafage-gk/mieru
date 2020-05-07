<template>
  <v-content>
    <dock-adjust />
  </v-content>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    DockAdjust: () => import('~/components/atoms/DockAdjust.vue'),
  },
});
</script>
