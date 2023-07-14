import React, { FC, ReactElement, useMemo, useState } from 'react';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useModalActions } from '../../hooks/useModalActions';
import SignIn from './SignIn';
import SignUp from './SignUp';

export enum AuthModalType {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleAction: () => void | Promise<void>;
}

const AuthorizationModal: FC<Props> = (props): ReactElement => {
  const {isOpen, onClose, handleAction} = props;
  const [authModalType, setAuthModalType] = useState<AuthModalType>(AuthModalType.SIGN_IN);
  const { isLoading, closeEsc, closeOverlayClick, handleActionModalButton, handleCloseModalButton } = useModalActions(handleAction, onClose);

  const CurrentModalContent = useMemo(() => {
    if (authModalType === AuthModalType.SIGN_IN) {
      return <SignIn
        isLoading={isLoading}
        handleActionModalButton={handleActionModalButton}
        handleCloseModalButton={handleCloseModalButton}
        setAuthModalType={setAuthModalType}/>;
    } else if (authModalType === AuthModalType.SIGN_UP) {
      return <SignUp
        isLoading={isLoading}
        handleActionModalButton={handleActionModalButton}
        handleCloseModalButton={handleCloseModalButton}
        setAuthModalType={setAuthModalType}/>;
    }
  }, [authModalType]);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModalButton} closeOnEsc={closeEsc} closeOnOverlayClick={closeOverlayClick}>
      <ModalOverlay/>

      {CurrentModalContent}
    </Modal>
  );
};

export default AuthorizationModal;
