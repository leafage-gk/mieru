import * as uuid from 'uuid';

import {
  createColKey,
  createContainerKey,
  createRowKey,
  createUnitKey,
  MDockColKey,
  MDockContainerKey,
  MDockRowKey,
  MDockUnitKey,
} from '../identities';
import { pipe } from '../utils';
import { initDockCol, MDockCol } from './col';
import { initDockContainer, MDockContainer } from './container';
import { initDockRow, MDockRow } from './row';
import { initDockUnit, MDockUnit } from './unit';

export interface MDockRecord {
  id: string;
  rootKey: string;
  containers: Record<string, MDockContainer>;
  rows: Record<string, MDockRow>;
  cols: Record<string, MDockCol>;
  units: Record<string, MDockUnit>;
}

export const initDockRecord = (): MDockRecord => {
  const id = uuid.v4();

  const rootKey = createContainerKey();
  const rowKey = createRowKey();
  const colKey = createColKey();
  const unitKey = createUnitKey();
  const root = initDockContainer(rootKey, [rowKey]);
  const row = initDockRow(rowKey, rootKey, [colKey]);
  const col = initDockCol(colKey, rowKey, 'unit', unitKey);
  const unit = initDockUnit(unitKey, colKey);

  return {
    id,
    rootKey,
    containers: {
      [rootKey]: root,
    },
    rows: {
      [rowKey]: row,
    },
    cols: {
      [colKey]: col,
    },
    units: {
      [unitKey]: unit,
    },
  };
};

const getContainer = (record: MDockRecord, key: MDockContainerKey) =>
  record.containers[key];

const getRow = (record: MDockRecord, key: MDockRowKey) => record.rows[key];

const getCol = (record: MDockRecord, key: MDockColKey) => record.cols[key];

const getRowParent = (record: MDockRecord, key: MDockRowKey) =>
  pipe(
    (key: MDockRowKey) => getRow(record, key),
    (row) => getContainer(record, row.parent),
  )(key);

const getColParent = (record: MDockRecord, key: MDockColKey) =>
  pipe(
    (key: MDockColKey) => getCol(record, key),
    (col) => getRow(record, col.parent),
  )(key);

const getUnit = (record: MDockRecord, key: MDockUnitKey) => record.units[key];

const setRow = (record: MDockRecord, row: MDockRow) => {
  record.rows = { ...record.rows, [row.key]: row };
};

const deleteRow = (record: MDockRecord, row: MDockRowKey) => {
  delete record.rows[row];
};

const setContainer = (record: MDockRecord, container: MDockContainer) => {
  record.containers = { ...record.containers, [container.key]: container };
};

const deleteContainer = (record: MDockRecord, container: MDockContainerKey) => {
  delete record.containers[container];
};

const setCol = (record: MDockRecord, col: MDockCol) => {
  record.cols = { ...record.cols, [col.key]: col };
};

const deleteCol = (record: MDockRecord, col: MDockColKey) => {
  delete record.cols[col];
};

const setUnit = (record: MDockRecord, unit: MDockUnit) => {
  record.units = { ...record.units, [unit.key]: unit };
};

const deleteUnit = (record: MDockRecord, unit: MDockUnitKey) => {
  delete record.units[unit];
};

export const dockRecord = {
  getContainer,
  getRow,
  getCol,
  getUnit,
  getRowParent,
  getColParent,
  setRow,
  deleteRow,
  setContainer,
  deleteContainer,
  setCol,
  deleteCol,
  setUnit,
  deleteUnit,
};
