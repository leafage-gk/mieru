<template>
  <div class="dock" :style="{ background: item.background }"></div>
</template>

<script lang="ts">
import { MDockUnitKey } from '@mieru/dock';
import { defineComponent } from '@vue/composition-api';

import { injectWithE, storeKey } from '~/hooks';

export default defineComponent({
  props: {
    target: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = injectWithE(storeKey);
    const item = store.dock.repo.getUnit(props.target as MDockUnitKey);
    return {
      item,
    };
  },
});
</script>

<style lang="scss" scoped>
.dock {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
