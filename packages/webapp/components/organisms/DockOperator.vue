<template>
  <div
    class="dock-operator"
    :style="{ padding: childType === 'dock' ? '4px' : undefined }"
  >
    <div v-if="adjust.rowAvailable" class="adjust-row">
      <dock-adjust @movey="adjust.handleRowMoveY" />
    </div>
    <div v-if="adjust.colAvailable" class="adjust-col">
      <dock-adjust vertical @movex="adjust.handleColMoveX" />
    </div>
    <div
      :class="{
        'dock-wrapper': true,
        border: childType === 'dock',
        [selectedTool || 'no-tool']: childType === 'dock',
      }"
      @click="onTouch"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  reactive,
} from '@vue/composition-api';

import { injectWithE, storeKey } from '~/hooks';
import { DockOperatorHooks, useOnTouch } from '~/hooks/dock-operator';
import { ContainerItem } from '~/hooks/store/dashboard';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<ContainerItem>,
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
    col: {
      type: Number,
      required: true,
    },
    hooks: {
      type: Object as PropType<DockOperatorHooks>,
      required: true,
    },
  },
  components: {
    DockAdjust: () => import('~/components/atoms/DockAdjust.vue'),
  },
  setup(props) {
    const {
      tools: { color, selectedTool },
    } = injectWithE(storeKey);
    const state = reactive({
      rowIndex: computed(() => props.row),
      colIndex: computed(() => props.col),
      parent: computed(() => props.item),
      child: computed(() => props.item.rows[props.row].cols[props.col]),
    });
    const { onTouch } = useOnTouch(state);
    const adjust = reactive(props.hooks.useAdjust(state));
    const childType = computed(() => state.child.type);
    return {
      color,
      selectedTool,
      childType,
      adjust,
      onTouch,
    };
  },
});
</script>

<style lang="scss" scoped>
.dock-operator {
  position: relative;
  width: 100%;
  height: 100%;
}

.dock-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  &.border {
    border: thin dashed map-get($grey, base);
  }
  &:hover::after {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    width: 100%;
    height: 100%;
    content: '';
    background-color: rgba(black, 0.1);
  }
  &.fill-color {
    cursor: url('~@mdi/svg/svg/format-color-fill.svg') 12 12, auto;
    &:hover::after {
      display: block;
    }
  }
  &.eraser {
    cursor: url('~@mdi/svg/svg/eraser.svg') 12 12, auto;
    &:hover::after {
      display: block;
    }
  }
}

.adjust-row {
  position: absolute;
  bottom: -4px;
  left: 0;
  z-index: 1;
  width: 100%;
}

.adjust-col {
  position: absolute;
  top: 0;
  right: -4px;
  z-index: 1;
  height: 100%;
}
</style>
