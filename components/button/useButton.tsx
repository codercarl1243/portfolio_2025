'use client'
import { useLoading } from "@/hooks/useLoading";
import { useCallback } from "react";

export default function useButton() {
  const { loading, callbackWithLoading } = useLoading();

  const handleClick = useCallback(
    <T = void>(
      userHandler?: (event: React.MouseEvent<HTMLButtonElement>) => T
    ) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("here")
        // add Users' preference here such as adding a logging wrapper
        if (!userHandler) return;
        try {
          // return userHandler(event)
          return callbackWithLoading(userHandler, event);
        } catch (err) {
          // we could do something here like forward to a global error store
          // errorStore.set(err); or useErrorBoundary(err);
          console.error("Button click error (sync):", { cause: err });
        }
      },
    [callbackWithLoading]
  );

  return { handleClick, isLoading: loading }

}