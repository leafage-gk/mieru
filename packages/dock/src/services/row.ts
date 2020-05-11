import {
  dockCol,
  dockRecord,
  dockRow,
  initDockRow,
  MDockCol,
  MDockRecord,
} from '../entities';
import {
  createRowKey,
  MDockColKey,
  MDockContainerKey,
  MDockUnitKey,
} from '../identities';
import { map, pipe } from '../utils';
import { createDockCol, createDockColFromUnit } from './col';
import { eraseCol } from './erase';

const bothModifier = (
  record: MDockRecord,
  key: MDockColKey,
  modifier: (col1: MDockCol, col2: MDockCol) => void,
) =>
  pipe(
    (key: MDockColKey) => dockRecord.getColParent(record, key),
    (row) => dockRow.getNextColKey(row, key),
    map((nextKey) => {
      const cur = dockRecord.getCol(record, key);
      const next = dockRecord.getCol(record, nextKey);
      modifier(cur, next);
    }),
  )(key);

export const adjustColSize = (
  record: MDockRecord,
  key: MDockColKey,
  diff: number,
) =>
  bothModifier(record, key, (cur, next) => {
    if (diff > 0) {
      dockCol.addColSize(cur, next, diff) || eraseCol(record, next.key);
    } else if (diff < 0) {
      dockCol.subColSize(cur, next, -diff) || eraseCol(record, cur.key);
    }
  });

export const createDockRow = (
  record: MDockRecord,
  containerKey: MDockContainerKey,
  size = 1,
) => {
  const rowKey = createRowKey();
  const colKey = createDockCol(record, rowKey);
  const row = initDockRow(rowKey, containerKey, [colKey], size);
  dockRecord.setRow(record, row);
  return rowKey;
};

export const createDockRowFromUnit = (
  record: MDockRecord,
  containerKey: MDockContainerKey,
  unitKey: MDockUnitKey,
  rowSize = 1,
  colSize = 1,
) => {
  const rowKey = createRowKey();
  const colKey = createDockColFromUnit(record, rowKey, unitKey, colSize);
  const row = initDockRow(rowKey, containerKey, [colKey], rowSize);
  dockRecord.setRow(record, row);
  return rowKey;
};
