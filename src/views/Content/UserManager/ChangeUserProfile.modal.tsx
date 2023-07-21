import React, {FC, ReactElement} from 'react';
import {observer} from 'mobx-react-lite';
import {
  Button, FormControl, FormErrorMessage, FormLabel, Input, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useModalActions} from '../../../hooks/useModalActions';
import {useAuthorizationStore} from '../../../store/hooks';
import {IAuthChangeUserProfileRequestDto} from '../../../store/AuthorizationStore';
import {object, string} from 'yup';
import {FormikHelpers, useFormik} from 'formik';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeUserProfileModal: FC<Props> = observer((props): ReactElement => {
  const { isOpen, onClose } = props;
  const authorizationStore = useAuthorizationStore();
  const { t } = useTranslation(['common']);

  const initialChangeUserProfileValues: IAuthChangeUserProfileRequestDto = {
    displayName: '',
  };

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const validationChangeUserProfileSchema = object().shape({
    displayName: string()
      .trim()
      .required(t('common_new_dn_error_text_required')!)
      .min(3, t('common_new_dn_error_text_min_length')!)
      .max(28, t('common_new_dn_error_text_max_length')!),
  });
  /* eslint-enable */

  const submitHandler = async (payload: IAuthChangeUserProfileRequestDto, formikHelpers: FormikHelpers<IAuthChangeUserProfileRequestDto>) => {
    try {
      await authorizationStore.updateUserProfile(payload);
    } catch (e) {
      console.warn(e);
    } finally {
      formikHelpers.resetForm();
      formikHelpers.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialChangeUserProfileValues,
    validationSchema: validationChangeUserProfileSchema,
    onSubmit: submitHandler,
    validateOnBlur: true,
  });

  const { isLoading, closeEsc, closeOverlayClick, handleActionModalButton, handleCloseModalButton } = useModalActions(formik.handleSubmit, onClose);
  const { touched, errors, getFieldProps } = formik;

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModalButton} closeOnEsc={closeEsc} closeOnOverlayClick={closeOverlayClick}>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <ModalOverlay/>

      <form onSubmit={handleActionModalButton} style={{ width: '100% '}}>
        <ModalContent>
          <ModalHeader>{t('common_btn_change_dn')}</ModalHeader>

          <ModalCloseButton title={t('common_close_btn')!}/>

          <ModalBody>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={4} w={'full'} overflow={'hidden'}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                {
                  authorizationStore.user.displayName ?
                  <>
                    <Text>{t('common_current_dn_text')}</Text>

                    <Text
                      as={'strong'}
                      whiteSpace={'nowrap'}
                      textOverflow={'ellipsis'}
                      overflow={'hidden'}>
                      {authorizationStore.user.displayName}
                    </Text>
                  </>
                  :
                  <Text>{t('common_without_current_dn_text')}</Text>
                }
              </Stack>

              <FormControl isInvalid={touched.displayName && Boolean(errors.displayName)}>
                <FormLabel>{t('common_new_dn_label')}</FormLabel>

                <Input
                  isDisabled={isLoading}
                  colorScheme={'twitter'}
                  boxShadow={'md'}
                  placeholder={t('common_new_dn_placeholder')!}
                  {...getFieldProps('displayName')}/>

                {touched.displayName && Boolean(errors.displayName) && <FormErrorMessage>{errors.displayName}</FormErrorMessage>}
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleCloseModalButton} variant={'outline'} colorScheme={'gray'} title={t('common_cancel_btn')!} mr={4}>
              {t('common_cancel_btn')!}
            </Button>

            <Button
              type={'submit'}
              isLoading={isLoading}
              variant={'outline'}
              colorScheme={'twitter'}
              title={t('common_submit_btn_title')!}>
              {t('common_submit_btn_title')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
      {/* eslint-enable */}
    </Modal>
  );
});

export default ChangeUserProfileModal;
