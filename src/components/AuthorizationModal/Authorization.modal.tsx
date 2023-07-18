import React, { FC, ReactElement, useState } from 'react';
import {
  Button,
  FormControl, FormErrorMessage,
  FormLabel, IconButton, Input, InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton, ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack, Text, Icon, InputGroup
} from '@chakra-ui/react';
import { useModalActions } from '../../hooks/useModalActions';
import {object, string} from 'yup';
import {useTranslation} from 'react-i18next';
import {FormikHelpers, useFormik} from 'formik';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useAuthorizationStore} from '../../store/hooks';
import {IAuthSignInRequestDto} from '../../store/AuthorizationStore';

enum AuthModalType {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AuthorizationModal: FC<Props> = (props): ReactElement => {
  const {isOpen, onClose} = props;
  const { t } = useTranslation(['common', 'auth']);
  const authorizationStore = useAuthorizationStore();
  const [authModalType, setAuthModalType] = useState<AuthModalType>(AuthModalType.SIGN_IN);
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const initialSignInValues: IAuthSignInRequestDto = {
    email: '',
    password: '',
  };

  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const validationSignInSchema = object().shape({
    email: string().required(t('auth_modal_email_error_text_required', {ns: 'auth'})!),
    password: string().required(t('auth_modal_password_error_text_required', {ns: 'auth'})!),
  });
  /* eslint-enable */

  const submitHandler = async (payload: IAuthSignInRequestDto, formikHelpers: FormikHelpers<IAuthSignInRequestDto>) => {
    try {
      if (authModalType === AuthModalType.SIGN_IN) {
        await authorizationStore.signInEmailPassword(payload);
      } else if (authModalType === AuthModalType.SIGN_UP) {
        await authorizationStore.singUpEmailAndPassword(payload);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      formikHelpers.resetForm();
      formikHelpers.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialSignInValues,
    validationSchema: validationSignInSchema,
    onSubmit: submitHandler,
    validateOnBlur: true,
  });

  const { isLoading, closeEsc, closeOverlayClick, handleActionModalButton, handleCloseModalButton } = useModalActions(formik.handleSubmit, onClose);
  const { touched, errors, getFieldProps } = formik;

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModalButton} closeOnEsc={closeEsc} closeOnOverlayClick={closeOverlayClick}>
      <ModalOverlay/>

      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <ModalContent>
        <ModalHeader>{t('auth_modal_sign_in_title', {ns: 'auth'})}</ModalHeader>

        <ModalCloseButton title={t('common_close_btn')!}/>

        <form onSubmit={handleActionModalButton} style={{ width: '100% '}}>
          <ModalBody>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={4}>
              <FormControl isInvalid={touched.email && Boolean(errors.email)}>
                <FormLabel>{t('auth_modal_email_label', {ns: 'auth'})}</FormLabel>

                <Input
                  type={'email'}
                  colorScheme={'telegram'}
                  boxShadow={'md'}
                  placeholder={t('auth_modal_email_placeholder', {ns: 'auth'})!}
                  {...getFieldProps('email')}/>

                {touched.email && Boolean(errors.email) && <FormErrorMessage>{errors.email}</FormErrorMessage>}
              </FormControl>

              <FormControl isInvalid={touched.password && Boolean(errors.password)}>
                <FormLabel>{t('auth_modal_password_label', {ns: 'auth'})}</FormLabel>

                <InputGroup>
                  <Input
                    type={passwordVisibility ? 'text' : 'password'}
                    colorScheme={'telegram'}
                    boxShadow={'md'}
                    placeholder={t('auth_modal_password_placeholder', {ns: 'auth'})!}
                    {...getFieldProps('password')}/>

                  <InputRightElement>
                    <IconButton
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                      isDisabled={isLoading}
                      variant={'link'}
                      icon={<Icon as={passwordVisibility ? VisibilityOffIcon : VisibilityIcon} />}
                      aria-label={'password visibility'}
                    />
                  </InputRightElement>
                </InputGroup>

                {touched.password && Boolean(errors.password) && <FormErrorMessage>{errors.password}</FormErrorMessage>}
              </FormControl>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={4}>
                <Text>
                  {
                    authModalType === AuthModalType.SIGN_IN
                      ? t('auth_modal_sign_in_desc', {ns: 'auth'})
                      : t('auth_modal_sign_up_desc', {ns: 'auth'})
                  }
                </Text>

                <Button
                  onClick={() => setAuthModalType(authModalType === AuthModalType.SIGN_IN ? AuthModalType.SIGN_UP : AuthModalType.SIGN_IN)}
                  variant={'link'}
                  colorScheme={'telegram'}
                  title={authModalType === AuthModalType.SIGN_IN
                    ? t('auth_modal_sign_up_btn_text', {ns: 'auth'})!
                    : t('auth_modal_sign_in_btn_text', {ns: 'auth'})!}>
                  {authModalType === AuthModalType.SIGN_IN
                    ? t('auth_modal_sign_up_btn_text', {ns: 'auth'})
                    : t('auth_modal_sign_in_btn_text', {ns: 'auth'})
                  }
                </Button>
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleCloseModalButton}
              variant={'outline'}
              colorScheme={'gray'}
              boxShadow={'md'}
              title={t('common_cancel_btn')!} mr={4}>
              {t('common_cancel_btn')!}
            </Button>

            <Button
              type={'submit'}
              isLoading={isLoading}
              variant={'outline'}
              colorScheme={'telegram'}
              boxShadow={'md'}
              title={authModalType === AuthModalType.SIGN_IN
                ? t('auth_modal_sign_in_btn_text', {ns: 'auth'})!
                : t('auth_modal_sign_up_btn_text', {ns: 'auth'})!}>
              {authModalType === AuthModalType.SIGN_IN
                ? t('auth_modal_sign_in_btn_text', {ns: 'auth'})
                : t('auth_modal_sign_up_btn_text', {ns: 'auth'})
              }
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
      {/* eslint-enable */}
    </Modal>
  );
};

export default AuthorizationModal;
