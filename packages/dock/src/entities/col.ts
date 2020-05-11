import { MDockContainerType, MDockNodeType, MDockUnitType } from '../dock-type';
import {
  MDockColKey,
  MDockContainerKey,
  MDockNodeKey,
  MDockRowKey,
  MDockUnitKey,
} from '../identities';

type MDockColContainer = {
  type: MDockContainerType;
  node: MDockContainerKey;
};

type MDockColUnit = {
  type: MDockUnitType;
  node: MDockUnitKey;
};

type MDockColBase = {
  key: MDockColKey;
  parent: MDockRowKey;
  size: number;
};

export type MDockCol = MDockColBase & (MDockColContainer | MDockColUnit);

export const initDockCol = <T extends MDockNodeType>(
  key: MDockColKey,
  parent: MDockRowKey,
  type: T,
  node: MDockNodeKey<T>,
  size = 1,
) =>
  ({
    key,
    parent,
    type,
    node,
    size,
  } as MDockCol);

const setNode = <A extends MDockNodeType>(
  col: MDockCol,
  type: A,
  node: MDockNodeKey<A>,
) => {
  col.type = type;
  col.node = node;
};

const setSize = (col: MDockCol, size: number) => {
  col.size = size;
};

const addColSize = (cur: MDockCol, next: MDockCol, add: number) => {
  if (add < next.size) {
    setSize(cur, cur.size + add);
    setSize(next, next.size - add);
    return true;
  }
  return false;
};

const subColSize = (cur: MDockCol, next: MDockCol, sub: number) => {
  if (sub < cur.size) {
    setSize(cur, cur.size - sub);
    setSize(next, next.size + sub);
    return true;
  }
  return false;
};

export const dockCol = {
  setNode,
  setSize,
  addColSize,
  subColSize,
};
