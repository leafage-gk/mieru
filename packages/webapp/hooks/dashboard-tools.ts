import { mdiBoxCutter, mdiEraser, mdiFormatColorFill } from '@mdi/js';
import { computed, reactive } from '@vue/composition-api';

export const toolIcons = [mdiBoxCutter, mdiEraser, mdiFormatColorFill] as const;

const toolSymbols = ['cutter', 'eraser', 'fill-color'] as const;

export type ToolType = typeof toolSymbols[number];

export interface DashboardToolValue {
  color: string;
  selectedIndex?: number;
}

const getSelected = ({ selectedIndex }: DashboardToolValue) => {
  return selectedIndex !== undefined ? toolSymbols[selectedIndex] : undefined;
};

const defaultValue = (): DashboardToolValue => ({
  color: '#FF0000',
  selectedIndex: 0,
});

export const useDashboardTools = (init = defaultValue()) => {
  const state = reactive({
    val: { ...init },
    selected: getSelected(init),
  });

  const toolVal = computed({
    get: () => state.val,
    set: (val) => {
      state.val = val;
      state.selected = getSelected(val);
    },
  });

  const color = computed(() => state.val.color);

  const selectedTool = computed(() => state.selected);

  return {
    toolVal,
    color,
    selectedTool,
  };
};
