import { mdiBoxCutter, mdiEraser, mdiFormatColorFill } from '@mdi/js';
import { computed, reactive, toRefs } from '@vue/composition-api';

const useTools = () => {
  const toolSymbols = ['cutter', 'eraser', 'fill-color'] as const;

  const localState = reactive({
    color: '#FF0000',
  });

  const state = reactive({
    tool: 0 as number | undefined,
    type: toolSymbols[0] as typeof toolSymbols[number] | undefined,
  });

  const tools = [mdiBoxCutter, mdiEraser, mdiFormatColorFill];

  const selectTool = (tool: number | undefined) => {
    state.tool = tool;
    state.type = tool === undefined ? undefined : toolSymbols[tool];
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
