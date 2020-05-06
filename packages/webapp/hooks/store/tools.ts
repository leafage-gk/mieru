import {
  mdiArrowCollapse,
  mdiBoxCutter,
  mdiEraser,
  mdiFormatColorFill,
} from '@mdi/js';
import { computed, reactive, toRefs } from '@vue/composition-api';

const useTools = () => {
  const toolSymbols = ['cutter', 'collapse', 'eraser', 'fill-color'] as const;

  const localState = reactive({
    color: '#FF0000',
  });

  const state = reactive({
    tool: 0,
    type: toolSymbols[0] as typeof toolSymbols[number],
  });

  const tools = [mdiBoxCutter, mdiArrowCollapse, mdiEraser, mdiFormatColorFill];

  const selectTool = (tool: number) => {
    state.tool = tool;
    state.type = toolSymbols[tool];
  };

  const color = computed({
    get: () => localState.color,
    set: (color: string) => (localState.color = color),
  });

  return {
    ...toRefs(state),
    selectTool,
    tools,
    color,
  };
};

export default useTools;
