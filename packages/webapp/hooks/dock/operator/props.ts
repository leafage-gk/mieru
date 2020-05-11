import { MDockCol, MDockColKey, MDockContainer, MDockRow } from '@mieru/dock';
import { reactive } from '@vue/composition-api';

import { storeKey } from '../../keys';
import { injectWithE } from '../../utils';

export interface DockOperatorProps {
  container: MDockContainer;
  row: MDockRow;
  col: MDockCol;
  rowIndex: number;
  colIndex: number;
}

const useOperatorProps = (key: MDockColKey) => {
  const store = injectWithE(storeKey);
  const col = store.dock.repo.getCol(key);
  const row = store.dock.repo.getRow(col.value.parent);
  const container = store.dock.repo.getContainer(row.value.parent);
  const rowIndex = store.dock.repo.rowIndex(container.value, row.value);
  const colIndex = store.dock.repo.colIndex(row.value, col.value);

  return reactive({
    container,
    row,
    col,
    rowIndex,
    colIndex,
  }) as DockOperatorProps;
};

export default useOperatorProps;
