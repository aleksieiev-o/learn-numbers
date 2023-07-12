import React, { FC, ReactElement, useState } from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { useLoading } from '../../hooks/useLoading';

export enum ActionConfirmationModalType {
  INFO,
  WARNING,
  DANGER,
}

interface Props {
  modalType: ActionConfirmationModalType;
  modalTitle: string;
  modalDescription: string;
  modalQuestion: string;
  buttonText: string;
  isOpen: boolean;
  onClose: () => void;
  actionHandler: () => void | Promise<void>;
}

const ActionConfirmationModal: FC<Props> = (props): ReactElement => {
  const { modalType,  modalTitle, modalDescription, modalQuestion, buttonText, isOpen, onClose, actionHandler } = props;
  const { isLoading, setIsLoading } = useLoading();
  const [closeEsc, setCloseEsc] = useState<boolean>(true);
  const [closeOverlayClick, setCloseOverlayClick] = useState<boolean>(true);

  const handleActionModalButton = async () => {
    setIsLoading(true);
    setCloseEsc(false);
    setCloseOverlayClick(false);

    try {
      await actionHandler();
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

  const actionButtonColorScheme = {
    [ActionConfirmationModalType.INFO]: 'telegram',
    [ActionConfirmationModalType.WARNING]: 'orange',
    [ActionConfirmationModalType.DANGER]: 'red',
  }[modalType];

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModalButton} closeOnEsc={closeEsc} closeOnOverlayClick={closeOverlayClick}>
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>

        <ModalCloseButton title={'Close'}/>

        <ModalBody>
          <Stack>
            <Text>{modalDescription}</Text>

            <Text as={'strong'}>{modalQuestion}</Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleActionModalButton}
            isLoading={isLoading}
            colorScheme={actionButtonColorScheme}
            title={buttonText}
            mr={4}>
            {buttonText}
          </Button>

          <Button onClick={handleCloseModalButton} colorScheme={'gray'} title={'Close'}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ActionConfirmationModal;
