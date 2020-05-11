// 簡易的なMaybe Monad

export type Maybe<T> = T | undefined;

type Functor<S, T> = (value: S) => T;

export const map = <S, T>(map: Functor<S, T>) => (
  value: Maybe<S>,
): Maybe<T> => {
  return value ? map(value) : undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flatMap = <S, T extends [...any[]]>(map: Functor<S, T>) => (
  value: Maybe<S>,
): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return value ? map(value) : (([] as any) as T);
};

type Reverse<T> = { [P in keyof T]: Exclude<T[P], undefined> };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const all = <T extends readonly [...any[]]>(value: T): value is Reverse<T> =>
  value.reduce((prev, cur) => prev && !!cur, true);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const traverse = <S extends readonly [...any[]], T>(
  map: Functor<Reverse<S>, T>,
) => (value: S): Maybe<T> => {
  if (all(value)) {
    return map(value);
  }
  return undefined;
};

export function pipe<T1, R>(fn1: (arg: T1) => R): (arg: T1) => R;

export function pipe<T1, T2, R>(
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => R,
): (arg: T1) => R;

export function pipe<T1, T2, T3, R>(
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => T3,
  fn3: (arg: T3) => R,
): (arg: T1) => R;

export function pipe<T1, T2, T3, T4, R>(
  fn1: (arg: T1) => T2,
  fn2: (arg: T2) => T3,
  fn3: (arg: T3) => T4,
  fn4: (arg: T4) => R,
): (arg: T1) => R;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pipe(...fns: ((arg: any) => any)[]): (arg: any) => any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (arg: any) => fns.reduce((prev, nextFn) => nextFn(prev), arg);
}
