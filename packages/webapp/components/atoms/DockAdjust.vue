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

const throttle = function (fn: Function, interval: number) {
  let lastTime = Date.now() - interval;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    if (lastTime + interval < Date.now()) {
      lastTime = Date.now();
      fn(...args);
    }
  };
};

export default defineComponent({
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const elref = ref(null) as Ref<Element | undefined>;
    const appear = ref(false);
    const adjust = ref(false);
    useEvent(elref, 'mouseover', () => {
      appear.value = true;
    });
    useEvent(elref, 'mouseout', () => {
      if (!adjust.value) {
        appear.value = false;
      }
    });
    useEvent(elref, 'mousedown', (e) => {
      let x = e.clientX;
      let y = e.clientY;
      const onMouseMove = throttle((e: MouseEvent) => {
        const diffX = e.clientX - x;
        const diffY = e.clientY - y;
        x = e.clientX;
        y = e.clientY;
        ctx.emit('movex', diffX);
        ctx.emit('movey', diffY);
      }, 20);
      adjust.value = true;
      appear.value = true;
      const pointerClass = `adjust-pointer__${
        props.vertical ? 'vertical' : 'horizontal'
      }`;
      document.body.classList.add(pointerClass);
      const onMouseUp = () => {
        adjust.value = false;
        appear.value = false;
        document.body.classList.remove(pointerClass);
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

<style lang="scss">
.adjust-pointer__horizontal {
  cursor: url('~@mdi/svg/svg/arrow-collapse-vertical.svg') 12 12, auto;
}
.adjust-pointer__vertical {
  cursor: url('~@mdi/svg/svg/arrow-collapse-horizontal.svg') 12 12, auto;
}
</style>

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
