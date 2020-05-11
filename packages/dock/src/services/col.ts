import { dockRecord, initDockCol, MDockRecord } from '../entities';
import { createColKey, MDockRowKey, MDockUnitKey } from '../identities';
import { createDockUnit } from './unit';

export const createDockCol = (
  record: MDockRecord,
  rowKey: MDockRowKey,
  size?: number,
) => {
  const colKey = createColKey();
  const unitKey = createDockUnit(record, colKey);
  const col = initDockCol(colKey, rowKey, 'unit', unitKey, size);
  dockRecord.setCol(record, col);
  return colKey;
};

export const createDockColFromUnit = (
  record: MDockRecord,
  rowKey: MDockRowKey,
  unitKey: MDockUnitKey,
  size = 1,
) => {
  const colKey = createColKey();
  const col = initDockCol(colKey, rowKey, 'unit', unitKey, size);
  dockRecord.setCol(record, col);
  return colKey;
};
