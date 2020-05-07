<template>
  <v-container
    fluid
    ref="container"
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
        <div
          class="panel"
          :style="{ padding: col.type === 'panel' ? '4px' : undefined }"
          @click="() => touchPanel(col, ri, ci)"
        >
          <grid-group :item="col" />
          <div
            v-if="item.type === 'container' && ri < item.rows.length - 1"
            class="dock-adjust-row"
          >
            <dock-adjust @movey="dockAdjustRow" />
          </div>
          <div v-if="ci < row.cols.length - 1" class="dock-adjust-col">
            <dock-adjust vertical @movex="dockAdjustCol" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <div v-else class="divider" :style="{ background: item.background }">
    <div
      v-if="toolType === 'cutter'"
      :class="{ 'divide-row': true, appear: divideRowAppear }"
      @click="divideRow"
      @mouseover="divideRowShow"
      @mouseout="divideRowHide"
    />
    <div
      v-if="toolType === 'cutter'"
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
  ref,
  toRefs,
} from '@vue/composition-api';

import { injectWithE, storeKey } from '~/hooks';
import { ColItem } from '~/hooks/store/dashboard';

export default defineComponent({
  name: 'grid-group',
  props: {
    item: {
      type: Object as PropType<ColItem>,
      required: true,
    },
  },
  components: {
    DockAdjust: () => import('~/components/atoms/DockAdjust.vue'),
  },
  setup(props) {
    const container = ref(null as Element | null);
    const state = reactive({
      divideRowAppear: false,
      divideColAppear: false,
    });
    const { dashboard, tools } = injectWithE(storeKey);
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
    const dockAdjustRow = (moveY: number) => {
      if (container.value) {
        const flex = (12 * moveY) / container.value.clientHeight;
        if (flex !== 0) {
          dashboard.rowSlider(props.item.uuid, flex);
        }
      }
    };
    const dockAdjustCol = (moveX: number) => {
      if (container.value) {
        const flex = (12 * moveX) / container.value.clientWidth;
        if (flex !== 0) {
          dashboard.colSlider(props.item.uuid, flex);
        }
      }
    };
    const touchPanel = (item: ColItem, ri: number, ci: number) => {
      if (item.type === 'container') {
        return;
      }
      if (tools.type.value === 'fill-color') {
        const panel = {
          ...item,
          background: tools.color.value,
        };
        dashboard.setPanel(item.uuid, panel);
      }
      if (tools.type.value === 'eraser') {
        setTimeout(() => {
          dashboard.removePanel(props.item.uuid, ri, ci);
        }, 0);
      }
    };
    return {
      container,
      divideRow,
      divideCol,
      divideRowShow,
      divideRowHide,
      divideColShow,
      divideColHide,
      dockAdjustRow,
      dockAdjustCol,
      toolType: tools.type,
      color: tools.color,
      touchPanel,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.panel {
  position: relative;
  width: 100%;
  height: 100%;
}
.divider {
  position: relative;
  width: 100%;
  height: 100%;
  border: thin dashed map-get($grey, base);
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
.dock-adjust-row {
  position: absolute;
  bottom: -4px;
  left: 0;
  z-index: 1;
  width: 100%;
}
.dock-adjust-col {
  position: absolute;
  top: 0;
  right: -4px;
  z-index: 1;
  height: 100%;
}
</style>
