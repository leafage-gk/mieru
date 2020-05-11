import { storeKey } from '../../keys';
import { injectWithE } from '../../utils';
import { DockOperatorProps } from './props';

const useOnTouch = (ctx: DockOperatorProps) => {
  // called by DockOperator setup
  const store = injectWithE(storeKey);
  const tools = store.dock.tools;

  const onTouch = () => {
    if (ctx.col.type === 'container') {
      return;
    }
    if (tools.selectedTool.value === 'fill-color') {
      store.dock.repo.setUnitBackground(ctx.col.node, tools.color.value);
    }
    if (tools.selectedTool.value === 'eraser') {
      setTimeout(() => {
        store.dock.repo.eraseCol(ctx.col.key);
      }, 0);
    }
  };
  return {
    onTouch,
  };
};

export default useOnTouch;
