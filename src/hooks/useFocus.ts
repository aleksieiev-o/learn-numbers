import { RefObject, useRef } from 'react';

interface IUseFocus<T> {
  elementRef:  RefObject<T>;
  setFocus: () => void;
}

export const useFocus = <T extends HTMLElement>(): IUseFocus<T> => {
  const elementRef = useRef<T>(null);

  const setFocus = () => elementRef?.current?.focus?.();

  return {
    elementRef,
    setFocus,
  };
};
