import { computed, Ref } from '@vue/composition-api';

import { storeKey } from '~/hooks/keys';
import { injectWithE } from '~/hooks/utils';

import { DockOperatorProps } from './props';

export interface DockAdjustProps {
  handleRowMoveY: (moveY: number) => void;
  handleColMoveX: (moveX: number) => void;
  rowAvailable: boolean;
  colAvailable: boolean;
}

const useUseAdjust = (containerRef: Ref<Element | undefined>) => {
  // called by DockPanel setup
  const useAdjust = (props: DockOperatorProps) => {
    // called by DockOperator setup
    const { dashboard } = injectWithE(storeKey);

    const handleRowMoveY = (moveY: number) => {
      if (containerRef.value) {
        const flex = (12 * moveY) / containerRef.value.clientHeight;
        if (flex !== 0) {
          dashboard.rowSlider(props.parent.uuid, flex);
        }
      }
    };

    const handleColMoveX = (moveX: number) => {
      if (containerRef.value) {
        const flex = (12 * moveX) / containerRef.value.clientWidth;
        if (flex !== 0) {
          dashboard.colSlider(props.parent.uuid, flex);
        }
      }
    };

    const rowAvailable = computed(
      () =>
        props.parent.type === 'container' &&
        props.rowIndex < props.parent.rows.length - 1,
    );

    const colAvailable = computed(() =>
      props.parent.type === 'container' && props.parent.rows[props.rowIndex]
        ? props.colIndex < props.parent.rows[props.rowIndex].cols.length - 1
        : false,
    );

    return {
      handleRowMoveY,
      handleColMoveX,
      rowAvailable,
      colAvailable,
    };
  };
  return {
    useAdjust,
  };
};

export default useUseAdjust;
