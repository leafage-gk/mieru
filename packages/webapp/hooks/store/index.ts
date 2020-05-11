import { useDockRepo } from '../dock/repo';
import { useDockTools } from '../dock/tools';

const useStore = () => {
  const repo = useDockRepo();
  const tools = useDockTools();
  return {
    dock: {
      repo,
      tools,
    },
  };
};

export type Store = ReturnType<typeof useStore>;
export default useStore;
