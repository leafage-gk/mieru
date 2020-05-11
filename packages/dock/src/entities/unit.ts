import { MDockUnitType } from '../dock-type';
import { MDockColKey, MDockUnitKey } from '../identities';

export interface MDockUnit {
  key: MDockUnitKey;
  parent: MDockColKey;
  type: MDockUnitType;
  background?: string;
}

export const initDockUnit = (
  key: MDockUnitKey,
  parent: MDockColKey,
  background?: string,
): MDockUnit => ({ key, type: 'unit', parent, background });

const setBackground = (unit: MDockUnit, background?: string) => {
  unit.background = background;
};

export const dockUnit = {
  setBackground,
};
