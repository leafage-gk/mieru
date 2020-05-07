import { useDashboardTools } from '~/hooks/dashboard-tools';

import useDashboard from './dashboard';

const useStore = () => {
  const dashboard = useDashboard();
  const tools = useDashboardTools();
  return {
    dashboard,
    tools,
  };
};

export type Store = ReturnType<typeof useStore>;
export default useStore;
