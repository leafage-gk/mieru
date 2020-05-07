import { storeKey } from '~/hooks/keys';
import { injectWithE } from '~/hooks/utils';

import { DockOperatorProps } from './props';

const useOnTouch = (ctx: DockOperatorProps) => {
  // called by DockOperator setup
  const { tools, dashboard } = injectWithE(storeKey);
  const onTouch = () => {
    if (ctx.child.type === 'container') {
      return;
    }
    if (tools.selectedTool.value === 'fill-color') {
      const dock = {
        ...ctx.child,
        background: tools.color.value,
      };
      dashboard.setDock(ctx.child.uuid, dock);
    }
    if (tools.selectedTool.value === 'eraser') {
      setTimeout(() => {
        dashboard.removeDock(ctx.parent.uuid, ctx.rowIndex, ctx.colIndex);
      }, 0);
    }
  };
  return {
    onTouch,
  };
};

export default useOnTouch;
