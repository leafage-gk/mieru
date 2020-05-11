import { MDockColKey, MDockContainerKey, MDockRowKey } from '../identities';

export interface MDockRow {
  key: MDockRowKey;
  parent: MDockContainerKey;
  cols: MDockColKey[];
  size: number;
}

export const initDockRow = (
  key: MDockRowKey,
  parent: MDockContainerKey,
  cols: MDockColKey[],
  size = 1,
): MDockRow => ({
  key,
  parent,
  cols,
  size,
});

const indexOfCol = (row: MDockRow, key: MDockColKey) => row.cols.indexOf(key);

const isNotLastCol = (row: MDockRow, index: number) =>
  index !== -1 && index < row.cols.length - 1;

const getPrevColKey = (row: MDockRow, key: MDockColKey) => {
  const index = indexOfCol(row, key);
  if (index > 0) {
    return row.cols[index - 1];
  } else if (isNotLastCol(row, index)) {
    return row.cols[index + 1];
  }
};

const getNextColKey = (row: MDockRow, key: MDockColKey) => {
  const index = indexOfCol(row, key);
  if (isNotLastCol(row, index)) {
    return row.cols[index + 1];
  }
};

const appendCol = (row: MDockRow, key: MDockColKey) => {
  row.cols.push(key);
};

const insertCol = (row: MDockRow, key: MDockColKey, index: number) => {
  row.cols.splice(index, 0, key);
};

const removeCol = (row: MDockRow, key: MDockColKey) => {
  const index = row.cols.indexOf(key);
  if (index !== -1) {
    row.cols.splice(index, 1);
  }
};

const setSize = (row: MDockRow, size: number) => {
  row.size = size;
};

const addRowSize = (cur: MDockRow, next: MDockRow, add: number) => {
  if (add < next.size) {
    setSize(cur, cur.size + add);
    setSize(next, next.size - add);
    return true;
  }
  return false;
};

const subRowSize = (cur: MDockRow, next: MDockRow, sub: number) => {
  if (sub < cur.size) {
    setSize(cur, cur.size - sub);
    setSize(next, next.size + sub);
    return true;
  }
  return false;
};

export const dockRow = {
  indexOfCol,
  isNotLastCol,
  getPrevColKey,
  getNextColKey,
  appendCol,
  insertCol,
  removeCol,
  setSize,
  addRowSize,
  subRowSize,
};
