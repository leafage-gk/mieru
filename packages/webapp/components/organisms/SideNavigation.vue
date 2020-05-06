<template>
  <v-list dense nav color="secondary">
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      :to="item.to"
      router
      exact
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { mdiHome, mdiPackageVariantClosed } from '@mdi/js';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {
    return {
      items: [
        {
          to: '/',
          icon: mdiHome,
          title: 'Home',
        },
        {
          to: '/service',
          icon: mdiPackageVariantClosed,
          title: 'Service',
        },
      ],
    };
  },
});
</script>
