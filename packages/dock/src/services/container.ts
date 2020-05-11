import {
  dockContainer,
  dockRecord,
  dockRow,
  MDockRecord,
  MDockRow,
} from '../entities';
import { MDockRowKey } from '../identities';
import { pipe } from '../utils';
import { eraseRow } from './erase';

const bothModifier = (
  record: MDockRecord,
  key: MDockRowKey,
  modifier: (row1: MDockRow, row2: MDockRow, exp: number) => void,
) =>
  pipe(
    (key: MDockRowKey) => dockRecord.getRowParent(record, key),
    (contanier) =>
      [dockContainer.getNextRowKey(contanier, key), contanier.parent] as const,
    ([nextKey, parentKey]) => {
      const cur = dockRecord.getRow(record, key);
      if (nextKey) {
        const next = dockRecord.getRow(record, nextKey);
        const exp = parentKey
          ? dockRecord.getColParent(record, parentKey).size
          : 1;
        modifier(cur, next, exp);
      }
    },
  )(key);

export const adjustRowSize = (
  record: MDockRecord,
  key: MDockRowKey,
  diff: number,
) =>
  bothModifier(record, key, (cur, next) => {
    if (diff > 0) {
      dockRow.addRowSize(cur, next, diff) || eraseRow(record, next.key);
    } else if (diff < 0) {
      dockRow.subRowSize(cur, next, -diff) || eraseRow(record, cur.key);
    }
  });
