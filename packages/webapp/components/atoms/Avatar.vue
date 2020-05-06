<template>
  <v-icon>{{ mdiAccountCircleOutline }}</v-icon>
</template>
<script lang="ts">
import { mdiAccountCircleOutline } from '@mdi/js';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {
    return {
      mdiAccountCircleOutline,
    };
  },
});
</script>
