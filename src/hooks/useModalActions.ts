import { useLoading } from './useLoading';
import { useState } from 'react';

interface UseModalActions {
  isLoading: boolean;
  closeEsc: boolean;
  closeOverlayClick: boolean;
  handleActionModalButton: () => void;
  handleCloseModalButton: () => void;
}

export const useModalActions = (handleAction: () => void | Promise<void>, onClose: () => void): UseModalActions => {
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
