import { dockContainer, dockRow } from '@mieru/dock';
import { computed, Ref } from '@vue/composition-api';

import { storeKey } from '../../keys';
import { injectWithE } from '../../utils';
import { DockOperatorProps } from './props';

const useUseAdjust = (containerRef: Ref<Element | undefined>) => {
  // called by DockContainer setup
  const useAdjust = (props: DockOperatorProps) => {
    // called by DockOperator setup
    const store = injectWithE(storeKey);

    const handleRowMoveY = (moveY: number) => {
      if (containerRef.value && moveY !== 0) {
        store.dock.repo.adjustRowSize(
          props.row.key,
          moveY / containerRef.value.clientHeight,
        );
      }
    };

    const handleColMoveX = (moveX: number) => {
      if (containerRef.value && moveX !== 0) {
        store.dock.repo.adjustColSize(
          props.col.key,
          moveX / containerRef.value.clientWidth,
        );
      }
    };

    const rowAvailable = computed(() =>
      dockContainer.isNotLastRow(props.container, props.rowIndex),
    );

    const colAvailable = computed(() =>
      dockRow.isNotLastCol(props.row, props.colIndex),
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
