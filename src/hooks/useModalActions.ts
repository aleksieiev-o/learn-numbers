import { useLoading } from './useLoading';
import {FormEvent, useState} from 'react';

interface IUseModalActions {
  isLoading: boolean;
  closeEsc: boolean;
  closeOverlayClick: boolean;
  handleActionModalButton: (e?: FormEvent<HTMLFormElement>) => void;
  handleCloseModalButton: () => void;
}

export const useModalActions = (handleAction: () => void | Promise<void>, onClose: () => void): IUseModalActions => {
  const {isLoading, setIsLoading} = useLoading();
  const [closeEsc, setCloseEsc] = useState<boolean>(true);
  const [closeOverlayClick, setCloseOverlayClick] = useState<boolean>(true);

  const handleActionModalButton = async () => {
    setIsLoading(true);
    setCloseEsc(false);
    setCloseOverlayClick(false);

    try {
      await handleAction();
      await onClose();
    } finally {
      setIsLoading(false);
      setCloseEsc(true);
      setCloseOverlayClick(true);
    }
  };

  const handleCloseModalButton = async () => {
    if (closeEsc && closeOverlayClick) {
      await onClose();
    }
  };

  return {
    isLoading,
    closeEsc,
    closeOverlayClick,
    handleActionModalButton,
    handleCloseModalButton,
  };
};
