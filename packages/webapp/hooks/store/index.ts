import { reactive, toRefs } from '@vue/composition-api';

import useDashboard from './dashboard';

const useStore = () => {
  const dashboard = useDashboard();
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
  };
};

export type Store = ReturnType<typeof useStore>;
export default useStore;
