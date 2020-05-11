<template>
  <div
    class="dock-operator"
    :style="{ padding: childType === 'unit' ? space + 'px' : undefined }"
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
        border: childType === 'unit' && selectedTool,
        [selectedTool || 'no-tool']: childType === 'unit',
      }"
      @click="onTouch"
    >
      <slot />
      <div
        v-if="selectedTool === 'cutter' && childType === 'unit'"
        class="cutter-guide-wrapper"
      >
        <cutter-guide
          :key="cutterGuide"
          :space="childType === 'unit' ? space : 0"
          @cut-row="onCutRow"
          @cut-col="onCutCol"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { MDockColKey } from '@mieru/dock';
import {
  computed,
  defineComponent,
  onUnmounted,
  PropType,
  reactive,
  ref,
  watch,
} from '@vue/composition-api';
import { useEvent } from 'vue-composable';

import { injectWithE, storeKey } from '~/hooks';
import {
  DockOperatorHooks,
  useOnCut,
  useOnTouch,
  useOperatorProps,
} from '~/hooks/dock/operator';

const throttle = (fn: Function, wait: number) => {
  let time = Date.now();
  return () => {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
};

export default defineComponent({
  props: {
    target: {
      type: String,
      required: true,
    },
    hooks: {
      type: Object as PropType<DockOperatorHooks>,
      required: true,
    },
  },
  components: {
    DockAdjust: () => import('~/components/atoms/DockAdjust.vue'),
    CutterGuide: () => import('~/components/atoms/CutterGuide.vue'),
  },
  setup(props, ctx) {
    const store = injectWithE(storeKey);
    const state = useOperatorProps(props.target as MDockColKey);
    const { onTouch } = useOnTouch(state);
    const { onCutRow, onCutCol } = useOnCut(state);
    const adjust = reactive(props.hooks.useAdjust(state));
    const childType = computed(() => state.col.type);
    const cutterGuide = ref(1);
    const rowSize = computed(() => state.row.size);
    const colSize = computed(() => state.col.size);
    const updateCutterGuide = throttle(() => {
      cutterGuide.value += 1;
    }, 500);
    watch(rowSize, updateCutterGuide);
    watch(colSize, updateCutterGuide);
    const remove = useEvent(window, 'resize', updateCutterGuide);
    onUnmounted(() => {
      remove();
    });
    return {
      color: store.dock.tools.color,
      selectedTool: store.dock.tools.selectedTool,
      space: store.dock.tools.space,
      childType,
      adjust,
      onTouch,
      onCutRow,
      onCutCol,
      cutterGuide,
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
    background-color: rgba(map-get($grey, base), 0.1);
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

.cutter-guide-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}
</style>
