import { Ref, ref } from '@vue/composition-api';

import useUseAdjust from './adjust';
import useOnCut from './cut';
import useOperatorProps from './props';
import useOnTouch from './touch';

export const useDockOperator = () => {
  // called by DockContainer setup
  const containerRef = ref(null) as Ref<Element | undefined>;

  const { useAdjust } = useUseAdjust(containerRef);
  const dockOperatorHooks = {
    useAdjust,
  };

  return {
    containerRef,
    dockOperatorHooks,
  };
};

export type DockOperatorHooks = ReturnType<
  typeof useDockOperator
>['dockOperatorHooks'];

export { useOnTouch, useOperatorProps, useOnCut };
