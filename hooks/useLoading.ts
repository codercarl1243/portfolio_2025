import { useState, useCallback } from 'react';

export function useLoading() {
  const [loading, setLoading] = useState(false);


  /**
  * Executes a given function and automatically toggles loading state on start and end if the function returns a Promise.
  *
  * @template T The return type of the function. If the passed function is typed already, this is not needed.
  * @template A The argument type passed into the function.
  *
  * @param fn - The function to be executed. Can be synchronous or return a Promise.
  * @param args - Optional arguments to be passed into the function.
  * @returns The result of the function — either the value directly, or a Promise that resolves with it.
  *
  * @example
  * const { loading, callbackWithLoading } = useLoading();
  *
  * const fetchUser = (id: number) => fetch(`/api/user/${id}`).then(res => res.json());
  * 
  * const handleClick = await callbackWithLoading(() => fetchUser());
 */
  const callbackWithLoading = useCallback(
    function <T, A extends any[]>(
      fn: (...args: A) => T | Promise<T>,
      ...args: A
    ): Promise<T> {
      try {
        const result = fn(...args);

        if (result instanceof Promise) {
          setLoading(true);
          return result
            .then((res) => res)
            .catch((err) => {
              console.error('useLoading error:', { cause: err });
              throw err;
            })
            .finally(() => {
              setLoading(false);
            });
        }

        // Non-promise path
        // If fn returns synchronously, wrap it in a resolved Promise.
        // consumers can choose to handle this with async/await if they want
        return Promise.resolve(result);

      } catch (err) {
        // This catch handles synchronous throw in fn(...) call itself
        console.error('useLoading error:', { cause: err });
        return Promise.reject(err);
      }
    },
    []
  );

  return { loading, callbackWithLoading };
}