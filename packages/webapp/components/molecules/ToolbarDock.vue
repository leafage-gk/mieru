<template>
  <v-toolbar dense flat>
    <v-spacer />
    <v-col cols="2" class="py-0">
      <v-slider
        v-model="space"
        min="0"
        max="10"
        label="Space"
        dense
        hide-details
        thumb-label
        thumb-size="18"
      />
    </v-col>
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

import { DockToolValue, toolIcons } from '~/hooks/dock/tools';

export default defineComponent({
  props: {
    value: {
      type: Object as PropType<DockToolValue>,
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
    const space = computed({
      get: () => props.value.space,
      set: (space: number) => {
        ctx.emit('change', { ...props.value, space });
      },
    });
    return {
      toolIcons,
      palette,
      selectedIndex,
      color,
      space,
    };
  },
});
</script>
