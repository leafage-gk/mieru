import { dockRecord, dockUnit, initDockUnit, MDockRecord } from '../entities';
import { createUnitKey, MDockColKey, MDockUnitKey } from '../identities';

export const createDockUnit = (
  record: MDockRecord,
  colKey: MDockColKey,
  background?: string,
) => {
  const unitKey = createUnitKey();
  const unit = initDockUnit(unitKey, colKey, background);
  dockRecord.setUnit(record, unit);
  return unitKey;
};

export const setUnitBackground = (
  record: MDockRecord,
  unitKey: MDockUnitKey,
  background?: string,
) => {
  const unit = dockRecord.getUnit(record, unitKey);
  dockUnit.setBackground(unit, background);
};
