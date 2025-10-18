import {DependencyList, EffectCallback, useEffect, useRef} from 'react';

/**
 * A custom hook that functions similarly to the `useEffect` hook but skips
 * execution on the initial render. This hook ensures that the provided effect
 * is only executed when any of the values in the `dependencies` array is updated
 * after the initial mount.
 *
 * @param {EffectCallback} effect - The callback function to be executed when dependencies change.
 *                                   The function can optionally return a cleanup function.
 * @param {DependencyList} dependencies - An array of dependency values that the effect depends on.
 *
 * @returns {void} Does not return any value.
 */
const useUpdateEffect = (
  effect: EffectCallback,
  dependencies: DependencyList,
): void => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return effect();
    } else {
      isMounted.current = true;
    }
  }, dependencies);
};

export default useUpdateEffect;
