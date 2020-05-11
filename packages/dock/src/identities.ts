import * as uuid from 'uuid';

import { MDockContainerType, MDockNodeType } from './dock-type';

export type MDockContainerKey = string & { __MDockContainerKey: never };
export type MDockRowKey = string & { __MDockRowKey: never };
export type MDockColKey = string & { __MDockColKey: never };
export type MDockUnitKey = string & { __MDockUnitKey: never };

export type MDockNodeKey<T extends MDockNodeType> = T extends MDockContainerType
  ? MDockContainerKey
  : MDockUnitKey;

export const createContainerKey = () => uuid.v4() as MDockContainerKey;
export const createRowKey = () => uuid.v4() as MDockRowKey;
export const createColKey = () => uuid.v4() as MDockColKey;
export const createUnitKey = () => uuid.v4() as MDockUnitKey;
