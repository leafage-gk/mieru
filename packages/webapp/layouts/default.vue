<template>
  <v-app>
    <header-bar v-model="drawer" />
    <v-navigation-drawer
      v-model="drawer"
      app
      stateless
      clipped
      fixed
      mini-variant
      dark
      color="secondary"
    >
      <side-navigation />
    </v-navigation-drawer>
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api';

import { build } from '~/hooks';

export default defineComponent({
  components: {
    HeaderBar: () => import('~/components/organisms/HeaderBar.vue'),
    SideNavigation: () => import('~/components/organisms/SideNavigation.vue'),
  },
  setup() {
    build();
    const state = reactive({
      drawer: false,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
