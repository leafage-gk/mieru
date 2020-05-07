<template>
  <v-toolbar dense flat>
    <v-spacer />
    <v-btn-toggle dense v-model="selectedIndex">
      <v-btn small v-for="(icon, index) in toolIcons" :key="index">
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
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@vue/composition-api';

import { DashboardToolValue, toolIcons } from '~/hooks/dashboard-tools';

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<DashboardToolValue>,
      required: true,
    },
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  setup(props, ctx) {
    const palette = ref(false);
    const selectedIndex = computed({
      get: () => props.value.selectedIndex,
      set: (selectedIndex: number | undefined) => {
        ctx.emit('change', { ...props.value, selectedIndex });
      },
    });
    const color = computed({
      get: () => props.value.color,
      set: (color: string) => {
        ctx.emit('change', { ...props.value, color });
      },
    });
    return {
      toolIcons,
      palette,
      selectedIndex,
      color,
    };
  },
});
</script>
