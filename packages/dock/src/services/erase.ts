import {
  dockCol,
  dockContainer,
  dockRecord,
  dockRow,
  MDockRecord,
  MDockRow,
} from '../entities';
import { MDockColKey, MDockContainerKey, MDockRowKey } from '../identities';

const eraseContainerRecursive = (
  record: MDockRecord,
  containerKey: MDockContainerKey,
) => {
  const container = dockRecord.getContainer(record, containerKey);
  container.rows.forEach((rowKey) => {
    const row = dockRecord.getRow(record, rowKey);
    row.cols.forEach((colKey) => {
      const col = dockRecord.getCol(record, colKey);
      if (col.type === 'container') {
        eraseContainerRecursive(record, col.node);
      } else {
        dockRecord.deleteUnit(record, col.node);
      }
      dockRecord.deleteCol(record, colKey);
    });
    dockRecord.deleteRow(record, rowKey);
  });
  dockRecord.deleteContainer(record, containerKey);
};

const eraseRowCols = (record: MDockRecord, row: MDockRow) => {
  row.cols.forEach((colKey) => {
    const col = dockRecord.getCol(record, colKey);
    if (col.type == 'container') {
      eraseContainerRecursive(record, col.node);
    } else {
      dockRecord.deleteUnit(record, col.node);
    }
    dockRecord.deleteCol(record, colKey);
  });
};

export const eraseRow = (record: MDockRecord, rowKey: MDockRowKey) => {
  const row = dockRecord.getRow(record, rowKey);
  const container = dockRecord.getContainer(record, row.parent);
  const prevRowKey = dockContainer.getPrevRowKey(container, row.key);
  if (prevRowKey) {
    const prevRow = dockRecord.getRow(record, prevRowKey);
    eraseRowCols(record, row);
    dockContainer.removeRow(container, row.key);
    dockRow.setSize(prevRow, row.size + prevRow.size);
    dockRecord.deleteRow(record, row.key);
    if (
      container.rows.length === 1 &&
      prevRow.cols.length === 1 &&
      container.parent
    ) {
      // 残り１行かつ、１列の場合
      const prevCol = dockRecord.getCol(record, prevRow.cols[0]);
      const parent = dockRecord.getCol(record, container.parent);
      dockCol.setNode(parent, prevCol.type, prevCol.node);
      dockRecord.deleteCol(record, prevCol.key);
      dockRecord.deleteRow(record, prevRow.key);
      dockRecord.deleteContainer(record, container.key);
    }
  } else if (container.parent) {
    dockRecord.deleteRow(record, row.key);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    eraseCol(record, container.parent);
  }
};

export const eraseCol = (record: MDockRecord, colKey: MDockColKey) => {
  const col = dockRecord.getCol(record, colKey);
  const row = dockRecord.getRow(record, col.parent);
  const prevColKey = dockRow.getPrevColKey(row, colKey);
  if (prevColKey) {
    // 列削除
    const prev = dockRecord.getCol(record, prevColKey);
    dockRow.removeCol(row, colKey);
    dockCol.setSize(prev, col.size + prev.size);
    if (col.type === 'container') {
      eraseContainerRecursive(record, col.node);
    } else {
      dockRecord.deleteUnit(record, col.node);
    }
    dockRecord.deleteCol(record, colKey);
  } else {
    // 行削除
    eraseRow(record, row.key);
  }
};
