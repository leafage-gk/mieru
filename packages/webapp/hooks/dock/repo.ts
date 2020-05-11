import {
  dockContainer,
  dockRecord,
  dockRow,
  dockService,
  initDockRecord,
  MDockCol,
  MDockColKey,
  MDockContainer,
  MDockContainerKey,
  MDockRow,
  MDockRowKey,
  MDockUnitKey,
} from '@mieru/dock';
import { computed, reactive } from '@vue/composition-api';

export const useDockRepo = () => {
  const record = initDockRecord();
  const state = reactive({
    record,
  });

  const rootKey = computed(() => state.record.rootKey);

  const getContainer = (key: MDockContainerKey) =>
    computed(() => dockRecord.getContainer(state.record, key));

  const getRow = (key: MDockRowKey) =>
    computed(() => dockRecord.getRow(state.record, key));

  const getCol = (key: MDockColKey) =>
    computed(() => dockRecord.getCol(state.record, key));

  const getUnit = (key: MDockUnitKey) =>
    computed(() => dockRecord.getUnit(state.record, key));

  const rowIndex = (container: MDockContainer, row: MDockRow) =>
    computed(() => dockContainer.indexOfRow(container, row.key));

  const colIndex = (row: MDockRow, col: MDockCol) =>
    computed(() => dockRow.indexOfCol(row, col.key));

  const adjustRowSize = (key: MDockRowKey, diff: number) =>
    dockService.adjustRowSize(state.record, key, diff);

  const adjustColSize = (key: MDockColKey, diff: number) =>
    dockService.adjustColSize(state.record, key, diff);

  const cutRow = (key: MDockColKey, size: number) =>
    dockService.cutRow(state.record, key, size);

  const cutCol = (key: MDockColKey, size: number) =>
    dockService.cutCol(state.record, key, size);

  const setUnitBackground = (key: MDockUnitKey, background?: string) =>
    dockService.setUnitBackground(state.record, key, background);

  const eraseRow = (key: MDockRowKey) => dockService.eraseRow(record, key);

  const eraseCol = (key: MDockColKey) => dockService.eraseCol(record, key);

  return {
    rootKey,
    getContainer,
    getRow,
    getCol,
    getUnit,
    rowIndex,
    colIndex,
    adjustRowSize,
    adjustColSize,
    cutRow,
    cutCol,
    setUnitBackground,
    eraseRow,
    eraseCol,
  };
};
