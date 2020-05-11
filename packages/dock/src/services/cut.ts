import {
  dockCol,
  dockContainer,
  dockRecord,
  dockRow,
  initDockContainer,
  MDockRecord,
} from '../entities';
import { createContainerKey, MDockColKey, MDockRowKey } from '../identities';
import { createDockCol } from './col';
import { createDockRow, createDockRowFromUnit } from './row';

export const cutCol = (
  record: MDockRecord,
  colKey: MDockColKey,
  size: number,
) => {
  const col = dockRecord.getCol(record, colKey);
  const row = dockRecord.getColParent(record, colKey);
  const newColKey = createDockCol(record, row.key, (1 - size) * col.size);
  const index = dockRow.indexOfCol(row, colKey);
  dockCol.setSize(col, size * col.size);
  dockRow.insertCol(row, newColKey, index + 1);
};

export const cutContainerRow = (
  record: MDockRecord,
  rowKey: MDockRowKey,
  size: number,
) => {
  const row = dockRecord.getRow(record, rowKey);
  const container = dockRecord.getRowParent(record, rowKey);
  const newRowKey = createDockRow(record, container.key, (1 - size) * row.size);
  const index = dockContainer.indexOfRow(container, rowKey);
  dockRow.setSize(row, size * row.size);
  dockContainer.insertRow(container, newRowKey, index + 1);
};

export const cutColRow = (
  record: MDockRecord,
  colKey: MDockColKey,
  size: number,
) => {
  const col = dockRecord.getCol(record, colKey);
  if (col.type === 'unit') {
    const containerKey = createContainerKey();
    const rowKey1 = createDockRowFromUnit(record, containerKey, col.node, size);
    const rowKey2 = createDockRow(record, containerKey, 1 - size);
    const container = initDockContainer(
      containerKey,
      [rowKey1, rowKey2],
      colKey,
    );
    dockRecord.setContainer(record, container);
    dockCol.setNode(col, 'container', containerKey);
  }
};

export const cutRow = (
  record: MDockRecord,
  colKey: MDockColKey,
  size: number,
) => {
  const row = dockRecord.getColParent(record, colKey);
  if (row.cols.length === 1) {
    cutContainerRow(record, row.key, size);
  } else {
    cutColRow(record, colKey, size);
  }
};
