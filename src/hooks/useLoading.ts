import { Dispatch, SetStateAction, useState } from 'react';

interface IUseLoading {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const useLoading = (): IUseLoading => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading,
    setIsLoading,
  };
};
