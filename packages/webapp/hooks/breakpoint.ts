import { computed, Ref, SetupContext } from '@vue/composition-api';

type Breakpoint = SetupContext['root']['$vuetify']['breakpoint'];
type Keys = keyof SetupContext['root']['$vuetify']['breakpoint'];

const useBreakpoint = <T extends Keys>(
  ctx: SetupContext,
  keys: T[] | undefined = undefined,
) =>
  (keys || (Object.keys(ctx.root.$vuetify.breakpoint) as Keys[])).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: computed(() => ctx.root.$vuetify.breakpoint[cur]),
    }),
    {},
  ) as { [K in T]: Readonly<Ref<Breakpoint[K]>> };

export default useBreakpoint;
