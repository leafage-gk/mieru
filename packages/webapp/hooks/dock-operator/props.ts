import { ColItem } from '~/hooks/store/dashboard';

export interface DockOperatorProps {
  parent: ColItem;
  child: ColItem;
  rowIndex: number;
  colIndex: number;
}
