import { reactive, toRefs } from '@vue/composition-api';

import useDashboard from './dashboard';
import useTools from './tools';

const useStore = () => {
  const dashboard = useDashboard();
  const tools = useTools();
  const state = reactive({
    isRootMounted: false,
  });
  const setRootMounted = () => {
    state.isRootMounted = true;
  };
  return {
    ...toRefs(state),
    setRootMounted,
    dashboard,
    tools,
  };
};

export type Store = ReturnType<typeof useStore>;
export default useStore;
