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
        <div :class="{ panel: true, 'pa-1': col.type === 'panel' }">
          <grid-group :item="col" />
          <div
            v-if="item.type === 'container' && ri < item.rows.length - 1"
            :class="{ 'slider-row': true, appear: sliderRowAppear }"
            @mouseover="sliderRowShow"
            @mousedown="sliderRowStart"
            @mouseout="sliderRowHide"
            @mousemove="dragSliderRow"
            @mouseup="sliderRowEnd"
          />
          <div
            v-if="ci < row.cols.length - 1"
            :class="{ 'slider-col': true, appear: sliderColAppear }"
            @mouseover="sliderColShow"
            @mousedown="sliderColStart"
            @mouseout="sliderColHide"
            @mousemove="dragSliderCol"
            @mouseup="sliderColEnd"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
  <div v-else class="divider">
    <div
      :class="{ 'divide-row': true, appear: divideRowAppear }"
      @click="divideRow"
      @mouseover="divideRowShow"
      @mouseout="divideRowHide"
    />
    <div
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
  setup(props) {
    const container = ref(null as Element | null);
    const state = reactive({
      divideRowAppear: false,
      divideColAppear: false,
      sliderRowAppear: false,
      sliderRowAvailable: false,
      sliderColAppear: false,
      sliderColAvailable: false,
    });
    const { dashboard } = injectWithE(storeKey);
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
    const sliderRowShow = () => {
      state.sliderRowAppear = true;
    };
    const sliderRowStart = () => {
      state.sliderRowAvailable = true;
    };
    const sliderRowEnd = () => {
      state.sliderRowAvailable = false;
    };
    const sliderRowHide = () => {
      state.sliderRowAppear = false;
      state.sliderRowAvailable = false;
    };
    const sliderColShow = () => {
      state.sliderColAppear = true;
    };
    const sliderColStart = () => {
      state.sliderColAvailable = true;
    };
    const sliderColEnd = () => {
      state.sliderColAvailable = false;
    };
    const sliderColHide = () => {
      state.sliderColAppear = false;
    };
    const dragSliderRow = (e: MouseEvent) => {
      if (container.value && state.sliderRowAvailable) {
        const flex = (12 * e.movementY) / container.value.clientHeight;
        if (flex !== 0) {
          dashboard.rowSlider(props.item.uuid, flex);
        }
      }
    };
    const dragSliderCol = (e: MouseEvent) => {
      if (container.value && state.sliderColAvailable) {
        const flex = (12 * e.movementX) / container.value.clientWidth;
        if (flex !== 0) {
          dashboard.colSlider(props.item.uuid, flex);
        }
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
      sliderRowShow,
      sliderRowEnd,
      sliderRowStart,
      sliderRowHide,
      sliderColShow,
      sliderColStart,
      sliderColEnd,
      sliderColHide,
      dragSliderRow,
      dragSliderCol,
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
.slider-row {
  position: absolute;
  bottom: -19px;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 40px;
  cursor: pointer;
  &.appear {
    &::after {
      position: absolute;
      top: 17px;
      left: 0;
      width: 100%;
      height: 8px;
      content: '';
      background: #aaa;
    }
  }
}
.slider-col {
  position: absolute;
  top: 0;
  right: -19px;
  z-index: 1;
  width: 40px;
  height: 100%;
  cursor: pointer;
  &.appear {
    &::after {
      position: absolute;
      top: 0;
      left: 17px;
      width: 8px;
      height: 100%;
      content: '';
      background: #aaa;
    }
  }
}
</style>
