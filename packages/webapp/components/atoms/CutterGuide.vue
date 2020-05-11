<template>
  <div ref="guideRef" class="cutter-guide">
    <div
      v-for="(p, i) in rows"
      :key="`row${i}`"
      class="divide-wrap divide-row"
      :style="{ top: `${p.size * 100}%`, zIndex: rowZ }"
    >
      <div
        class="divide-hover"
        :style="{ top: `${height / -2}px`, height: `${height + 1}px` }"
        @mouseover="onRowMouseOver"
        @click="onClickRow(p.ratio)"
      >
        <div class="divide-caption">{{ p.caption }}</div>
        <div class="divide-line" :style="{ margin: `${height / 2}px 0` }" />
      </div>
    </div>
    <div
      v-for="(p, i) in cols"
      :key="`col${i}`"
      class="divide-wrap divide-col"
      :style="{ left: `${p.size * 100}%`, zIndex: colZ }"
    >
      <div
        class="divide-hover"
        :style="{ left: `${width / -2}px`, width: `${width + 1}px` }"
        @mouseover="onColMouseOver"
        @click="onClickCol(p.ratio)"
      >
        <div class="divide-caption">{{ p.caption }}</div>
        <div class="divide-line" :style="{ margin: `0 ${width / 2}px` }" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
  toRefs,
} from '@vue/composition-api';

const gridBase = 32;

const grids = [
  { type: 'pixel', position: 'start', size: gridBase, min: gridBase * 10 },
  { type: 'ratio', size: 1 / 5, caption: '1/5', min: gridBase * 20 },
  { type: 'ratio', size: 1 / 4, caption: '1/4', min: gridBase * 4 },
  { type: 'ratio', size: 1 / 3, caption: '1/3', min: gridBase * 12 },
  { type: 'ratio', size: 2 / 5, caption: '2/5', min: gridBase * 20 },
  { type: 'ratio', size: 1 / 2, caption: '1/2', min: gridBase * 2 },
  { type: 'ratio', size: 3 / 5, caption: '3/5', min: gridBase * 20 },
  { type: 'ratio', size: 2 / 3, caption: '2/3', min: gridBase * 12 },
  { type: 'ratio', size: 3 / 4, caption: '3/4', min: gridBase * 4 },
  { type: 'ratio', size: 4 / 5, caption: '4/5', min: gridBase * 20 },
  { type: 'pixel', position: 'end', size: gridBase, min: gridBase * 10 },
] as const;

const getGrids = (boxSize: number, space: number) => {
  const exBoxSize = boxSize + space * 2;
  return grids
    .filter((grid) => grid.min <= exBoxSize)
    .map((grid) => {
      console.log(grid);
      if (grid.type === 'pixel') {
        if (grid.position === 'start') {
          return {
            size: (grid.size - space) / boxSize,
            ratio: grid.size / exBoxSize,
            caption: grid.size + 'px',
          };
        } else {
          return {
            size: (boxSize - grid.size + space) / boxSize,
            ratio: (exBoxSize - grid.size) / exBoxSize,
            caption: grid.size + 'px',
          };
        }
      } else {
        return {
          size: (grid.size * exBoxSize - space) / boxSize,
          ratio: grid.size,
          caption: grid.caption,
        };
      }
    });
};

export default defineComponent({
  props: {
    space: {
      type: Number,
      required: true,
    },
  },
  setup(props, ctx) {
    const guideRef = ref(null) as Ref<Element | undefined>;
    const width = gridBase / 2;
    const height = gridBase / 2;
    const state = reactive({
      rows: [] as { size: number; ratio: number; caption: string }[],
      cols: [] as { size: number; ratio: number; caption: string }[],
      rowZ: 0,
      colZ: 0,
    });
    onMounted(() => {
      ctx.root.$nextTick(() => {
        if (guideRef.value) {
          state.cols = getGrids(guideRef.value.clientWidth, props.space);
          state.rows = getGrids(guideRef.value.clientHeight, props.space);
        }
      });
    });
    const onRowMouseOver = () => {
      state.rowZ = 1;
      state.colZ = 0;
    };
    const onColMouseOver = () => {
      state.rowZ = 0;
      state.colZ = 1;
    };
    const onClickRow = (size: number) => {
      ctx.emit('cut-row', size);
    };
    const onClickCol = (size: number) => {
      ctx.emit('cut-col', size);
    };
    return {
      guideRef,
      width,
      height,
      ...toRefs(state),
      onRowMouseOver,
      onColMouseOver,
      onClickRow,
      onClickCol,
    };
  },
});
</script>

<style lang="scss" scoped>
.cutter-guide {
  position: relative;
  width: 100%;
  height: 100%;
}

.divide-wrap {
  position: absolute;
  .divide-hover {
    position: absolute;
    cursor: url('~@mdi/svg/svg/box-cutter.svg') 0 24, auto;
    .divide-line {
      position: absolute;
      background-color: map-get($light-blue, base);
      opacity: 0;
      transition: opacity 0.4s;
      animation: loadingFade 1s 1 linear none;
    }
    .divide-caption {
      position: absolute;
      color: map-get($light-blue, base);
      opacity: 0;
      transition: opacity 0.4s;
    }
    &:hover {
      .divide-line {
        opacity: 1;
      }
      .divide-caption {
        opacity: 1;
      }
    }
  }
  &.divide-row {
    left: 0;
    width: 100%;
    .divide-hover {
      width: 100%;
      .divide-line {
        width: 100%;
        height: 1px;
      }
      .divide-caption {
        top: -16px;
        left: 0;
      }
    }
  }
  &.divide-col {
    top: 0;
    height: 100%;
    .divide-hover {
      height: 100%;
      .divide-line {
        width: 1px;
        height: 100%;
      }
      .divide-caption {
        top: -24px;
        left: 0;
      }
    }
  }
}

@keyframes loadingFade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
  }
}
</style>
