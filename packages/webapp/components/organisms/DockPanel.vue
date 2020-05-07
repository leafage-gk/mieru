<template>
  <v-container
    fluid
    ref="containerRef"
    v-if="item.type === 'container'"
    class="fill-height align-stretch flex-column pa-0"
  >
    <v-row
      justify="center"
      align="stretch"
      no-gutters
      v-for="(row, ri) in item.rows"
      :key="ri"
      :style="{ flex: row.flex ? row.flex : 1, position: 'relative' }"
    >
      <v-col
        v-for="(col, ci) in row.cols"
        :key="ci"
        :style="{
          flex: col.flex ? `0 0 ${(100 * col.flex) / 12}%` : undefined,
          maxWidth: col.flex ? `${(100 * col.flex) / 12}%` : undefined,
        }"
      >
        <dock-operator
          :item="item"
          :row="ri"
          :col="ci"
          :hooks="dockOperatorHooks"
        >
          <dock-panel :item="col" />
        </dock-operator>
      </v-col>
    </v-row>
  </v-container>
  <div v-else class="divider" :style="{ background: item.background }">
    <div
      v-if="selectedTool === 'cutter'"
      :class="{ 'divide-row': true, appear: divideRowAppear }"
      @click="divideRow"
      @mouseover="divideRowShow"
      @mouseout="divideRowHide"
    />
    <div
      v-if="selectedTool === 'cutter'"
      :class="{ 'divide-col': true, appear: divideColAppear }"
      @click="divideCol"
      @mouseover="divideColShow"
      @mouseout="divideColHide"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  toRefs,
} from '@vue/composition-api';

import { injectWithE, storeKey } from '~/hooks';
import { useDockOperator } from '~/hooks/dock-operator';
import { ColItem } from '~/hooks/store/dashboard';

export default defineComponent({
  name: 'dock-panel',
  props: {
    item: {
      type: Object as PropType<ColItem>,
      required: true,
    },
  },
  components: {
    DockOperator: () => import('~/components/organisms/DockOperator.vue'),
  },
  setup(props) {
    const {
      dashboard,
      tools: { selectedTool },
    } = injectWithE(storeKey);
    const { containerRef, dockOperatorHooks } = useDockOperator();

    const state = reactive({
      divideRowAppear: false,
      divideColAppear: false,
    });

    const divideRow = () => {
      dashboard.divideRow(props.item.uuid);
    };
    const divideCol = () => {
      dashboard.divideCol(props.item.uuid);
    };
    const divideRowShow = () => {
      state.divideRowAppear = true;
    };
    const divideRowHide = () => {
      state.divideRowAppear = false;
    };
    const divideColShow = () => {
      state.divideColAppear = true;
    };
    const divideColHide = () => {
      state.divideColAppear = false;
    };
    return {
      containerRef,
      dockOperatorHooks,
      divideRow,
      divideCol,
      divideRowShow,
      divideRowHide,
      divideColShow,
      divideColHide,
      selectedTool,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.divider {
  position: relative;
  width: 100%;
  height: 100%;
}
.divide-row {
  position: absolute;
  top: calc(50% - 5px);
  left: 0;
  width: 100%;
  height: 10px;
  cursor: pointer;
  &.appear {
    background: #aaa;
  }
}
.divide-col {
  position: absolute;
  top: 0;
  left: calc(50% - 5px);
  width: 10px;
  height: 100%;
  cursor: pointer;
  &.appear {
    background: #aaa;
  }
}
</style>
