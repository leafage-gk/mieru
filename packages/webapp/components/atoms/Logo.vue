<template>
  <v-toolbar-title>
    <nuxt-link to="/" class="web-title white--text">
      {{ title }}
    </nuxt-link>
  </v-toolbar-title>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.web-title {
  text-decoration: none;
  outline: 0;
}
</style>
