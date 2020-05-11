import { storeKey } from '../../keys';
import { injectWithE } from '../../utils';
import { DockOperatorProps } from './props';

const useOnCut = (ctx: DockOperatorProps) => {
  // called by DockOperator setup
  const store = injectWithE(storeKey);

  const onCutRow = (size: number) => {
    if (ctx.col.type === 'container') {
      return;
    }
    store.dock.repo.cutRow(ctx.col.key, size);
  };
  const onCutCol = (size: number) => {
    if (ctx.col.type === 'container') {
      return;
    }
    store.dock.repo.cutCol(ctx.col.key, size);
  };
  return {
    onCutRow,
    onCutCol,
  };
};

export default useOnCut;
