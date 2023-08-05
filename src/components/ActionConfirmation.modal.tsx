import React, { FC, ReactElement } from 'react';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useModalActions } from '../hooks/useModalActions';

export enum EnumActionConfirmationModalType {
  INFO,
  WARNING,
  DANGER,
}

interface Props {
  modalType: EnumActionConfirmationModalType;
  modalTitle: string;
  modalDescription: string;
  modalQuestion: string;
  buttonText: string;
  isOpen: boolean;
  onClose: () => void;
  handleAction: () => void | Promise<void>;
}

const ActionConfirmationModal: FC<Props> = (props): ReactElement => {
  const { modalType,  modalTitle, modalDescription, modalQuestion, buttonText, isOpen, onClose, handleAction } = props;
  const { t } = useTranslation(['common']);
  const { isLoading, closeEsc, closeOverlayClick, handleActionModalButton, handleCloseModalButton } = useModalActions(handleAction, onClose);

  const actionButtonColorScheme = {
    [EnumActionConfirmationModalType.INFO]: 'twitter',
    [EnumActionConfirmationModalType.WARNING]: 'orange',
    [EnumActionConfirmationModalType.DANGER]: 'red',
  }[modalType];

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModalButton} closeOnEsc={closeEsc} closeOnOverlayClick={closeOverlayClick}>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>

        <ModalCloseButton title={t('common_close_btn')!}/>

        <ModalBody>
          <Stack>
            <Text>{modalDescription}</Text>

            <Text as={'strong'}>{modalQuestion}</Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleCloseModalButton} variant={'outline'} colorScheme={'gray'} title={t('common_close_btn')!} mr={4}>
            {t('common_close_btn')!}
          </Button>

          <Button
            onClick={() => handleActionModalButton()}
            isLoading={isLoading}
            variant={'outline'}
            colorScheme={actionButtonColorScheme}
            title={buttonText}>
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
      {/* eslint-enable */}
    </Modal>
  );
};

export default ActionConfirmationModal;
