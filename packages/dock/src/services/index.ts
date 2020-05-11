import { adjustRowSize } from './container';
import { cutCol, cutColRow, cutContainerRow, cutRow } from './cut';
import { eraseCol, eraseRow } from './erase';
import { adjustColSize } from './row';
import { setUnitBackground } from './unit';

export const dockService = {
  adjustRowSize,
  adjustColSize,
  cutCol,
  cutColRow,
  cutContainerRow,
  cutRow,
  setUnitBackground,
  eraseRow,
  eraseCol,
};
