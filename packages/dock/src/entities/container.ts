import { MDockContainerType } from '../dock-type';
import { MDockColKey, MDockContainerKey, MDockRowKey } from '../identities';

export interface MDockContainer {
  key: MDockContainerKey;
  parent?: MDockColKey;
  type: MDockContainerType;
  rows: MDockRowKey[];
}

export const initDockContainer = (
  key: MDockContainerKey,
  rows: MDockRowKey[],
  parent?: MDockColKey,
): MDockContainer => ({
  key,
  type: 'container',
  rows,
  parent,
});

const indexOfRow = (container: MDockContainer, key: MDockRowKey) =>
  container.rows.indexOf(key);

const isNotLastRow = (container: MDockContainer, index: number) =>
  index !== -1 && index < container.rows.length - 1;

const getPrevRowKey = (container: MDockContainer, key: MDockRowKey) => {
  const index = indexOfRow(container, key);
  if (index > 0) {
    return container.rows[index - 1];
  } else if (isNotLastRow(container, index)) {
    return container.rows[index + 1];
  }
};

const getNextRowKey = (container: MDockContainer, key: MDockRowKey) => {
  const index = indexOfRow(container, key);
  if (isNotLastRow(container, index)) {
    return container.rows[index + 1];
  }
};

const appendRow = (container: MDockContainer, key: MDockRowKey) => {
  container.rows.push(key);
};

const insertRow = (
  container: MDockContainer,
  key: MDockRowKey,
  index: number,
) => {
  container.rows.splice(index, 0, key);
};

const removeRow = (container: MDockContainer, key: MDockRowKey) => {
  const index = container.rows.indexOf(key);
  if (index !== -1) {
    container.rows.splice(index, 1);
  }
};

export const dockContainer = {
  indexOfRow,
  isNotLastRow,
  getPrevRowKey,
  getNextRowKey,
  appendRow,
  insertRow,
  removeRow,
};
