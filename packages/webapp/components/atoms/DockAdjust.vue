<template>
  <div
    :class="{ 'dock-adjust': true, vertical, horizontal: !vertical }"
    ref="elref"
    @dragstart.prevent="() => false"
  >
    <div
      :class="{
        icon: true,
        [`${vertical ? 'top' : 'left'}-icon`]: true,
        appear,
      }"
    />
    <div
      :class="{
        icon: true,
        [`${vertical ? 'bottom' : 'right'}-icon`]: true,
        appear,
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api';
import { useEvent } from 'vue-composable';

export default defineComponent({
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, ctx) {
    const elref = ref(null) as Ref<Element | undefined>;
    const appear = ref(false);
    useEvent(elref, 'mouseover', () => {
      appear.value = true;
    });
    useEvent(elref, 'mouseout', () => {
      appear.value = false;
    });
    useEvent(elref, 'mousedown', (e) => {
      let x = e.clientX;
      let y = e.clientY;
      const onMouseMove = (e: MouseEvent) => {
        const diffX = e.clientX - x;
        const diffY = e.clientY - y;
        x = e.clientX;
        y = e.clientY;
        ctx.emit('movex', diffX);
        ctx.emit('movey', diffY);
      };
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
    return {
      elref,
      appear,
    };
  },
});
</script>

<style lang="scss" scoped>
.dock-adjust {
  position: relative;
}

.horizontal {
  width: 100%;
  height: 10px;
  cursor: url('~@mdi/svg/svg/arrow-collapse-vertical.svg') 12 12, auto;
}

.vertical {
  width: 10px;
  height: 100%;
  cursor: url('~@mdi/svg/svg/arrow-collapse-horizontal.svg') 12 12, auto;
}

.icon {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: white;
  border: thin solid map-get($grey, base);
  border-radius: 6px;
  opacity: 0;

  &.appear {
    opacity: 1;
  }
}

.left-icon {
  top: 0;
  left: 0;
}
.right-icon {
  top: 0;
  right: 0;
}
.top-icon {
  top: 0;
  left: 0;
}
.bottom-icon {
  bottom: 0;
  left: 0;
}
</style>
