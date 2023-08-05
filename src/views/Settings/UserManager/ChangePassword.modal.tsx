import React, {FC, ReactElement, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useAuthorizationStore} from '../../../store/hooks';
import {useTranslation} from 'react-i18next';
import {useActionToast} from '../../../hooks/useActionToast';
import {useLoading} from '../../../hooks/useLoading';
import {object, string} from 'yup';
import {FormikHelpers, useFormik} from 'formik';
import {
  Button,
  FormControl, FormErrorMessage, FormLabel, Icon, IconButton, Input, InputGroup, InputRightElement, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text
} from '@chakra-ui/react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IAuthChangePasswordRequestDto } from '../../../store/AuthorizationStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: FC<Props> = observer((props): ReactElement => {
  const { isOpen, onClose } = props;
  const authorizationStore = useAuthorizationStore();
  const { t } = useTranslation(['common', 'auth']);
  const {showActionToast} = useActionToast();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState<boolean>(false);
  const [needReAuth, setNeedReAuth] = useState<boolean>(false);
  const {isLoading, setIsLoading} = useLoading();

  const initialChangePasswordValues: IAuthChangePasswordRequestDto = {
    newPassword: '',
    email: '',
    password: '',
  };

  // TODO after change app language, error text don't translate
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const validationChangePasswordSchema = useMemo(() => {
    if (!needReAuth) {
      return object().shape({
        newPassword: string()
          .trim()
          .required(t('common_password_error_text_required')!)
          .min(6, t('common_password_error_text_min_length')!)
          .max(28, t('common_password_error_text_max_length')!),
      });
    }

    return object().shape({
      newPassword: string()
        .trim()
        .required(t('common_password_error_text_required')!)
        .min(6, t('common_password_error_text_min_length')!)
        .max(28, t('common_password_error_text_max_length')!),
      email: string()
        .trim()
        .required(t('common_new_email_error_text_required')!)
        .email(t('common_new_email_error_text_email_type')!)
        .min(3, t('common_new_email_error_text_min_length')!)
        .max(254, t('common_new_email_error_text_max_length')!),
      password: string()
        .trim()
        .required(t('common_password_error_text_required')!)
        .min(3, t('common_password_error_text_min_length')!)
        .max(28, t('common_password_error_text_max_length')!),
    });
  }, [t, needReAuth]);

  const handleSubmit = async (payload: IAuthChangePasswordRequestDto, formikHelpers: FormikHelpers<IAuthChangePasswordRequestDto>) => {
    setIsLoading(true);

    try {
      if (needReAuth) {
        await authorizationStore.reAuthUser({ email: payload.email, password: payload.password });
        await authorizationStore.updateUserPassword(payload);
      } else {
        await authorizationStore.updateUserPassword(payload);
      }

      formikHelpers.resetForm();
      await onClose();

      showActionToast({
        title: t('common_toast_change_password_success_title')!,
        description: t('common_toast_change_password_success_description')!,
        status: 'success',
      });
    } catch (err: unknown) {
      setNeedReAuth(true);

      showActionToast({
        title: t('common_toast_change_password_error_title')!,
        description: t('common_toast_change_password_error_description')!,
        status: 'error',
      });
    } finally {
      formikHelpers.setSubmitting(false);
      setIsLoading(false);
    }
  };
  /* eslint-enable */

  const formik = useFormik({
    initialValues: initialChangePasswordValues,
    validationSchema: validationChangePasswordSchema,
    onSubmit: handleSubmit,
    validateOnBlur: true,
  });

  const { touched, errors, getFieldProps } = formik;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <ModalOverlay/>

      <form onSubmit={formik.handleSubmit} style={{ width: '100% '}}>
        <ModalContent>
          <ModalHeader>{t('common_btn_change_password')}</ModalHeader>

          <ModalCloseButton title={t('common_close_btn')!}/>

          <ModalBody>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={4} w={'full'} overflow={'hidden'}>
              <FormControl isInvalid={touched.newPassword && Boolean(errors.newPassword)}>
                <FormLabel>{t('common_new_password_label')}</FormLabel>

                <InputGroup>
                  <Input
                    type={newPasswordVisibility ? 'text' : 'password'}
                    colorScheme={'twitter'}
                    boxShadow={'md'}
                    isDisabled={isLoading}
                    placeholder={t('common_new_password_placeholder')!}
                    {...getFieldProps('newPassword')}/>

                  <InputRightElement>
                    <IconButton
                      onClick={() => setNewPasswordVisibility(!newPasswordVisibility)}
                      isDisabled={isLoading}
                      variant={'link'}
                      title={newPasswordVisibility ? t('auth_screen_password_btn_hide_title', {ns: 'auth'})! : t('auth_screen_password_btn_show_title', {ns: 'auth'})!}
                      icon={<Icon as={newPasswordVisibility ? VisibilityOffIcon : VisibilityIcon} />}
                      aria-label={'new password visibility'}
                    />
                  </InputRightElement>
                </InputGroup>

                {touched.newPassword && Boolean(errors.newPassword) && <FormErrorMessage>{errors.newPassword}</FormErrorMessage>}
              </FormControl>

              {
                needReAuth && <>
                  <Text color={'orange.600'}>{t('common_reauth_text')}</Text>

                  <FormControl isInvalid={touched.email && Boolean(errors.email)}>
                    <FormLabel>{t('common_current_email_label')}</FormLabel>

                    <Input
                      isDisabled={isLoading}
                      colorScheme={'twitter'}
                      boxShadow={'md'}
                      placeholder={t('common_current_email_placeholder')!}
                      {...getFieldProps('email')}/>

                    {touched.email && Boolean(errors.email) && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                  </FormControl>

                  <FormControl isInvalid={touched.password && Boolean(errors.password)}>
                    <FormLabel>{t('common_current_password_label')}</FormLabel>

                    <InputGroup>
                      <Input
                        type={passwordVisibility ? 'text' : 'password'}
                        colorScheme={'twitter'}
                        boxShadow={'md'}
                        placeholder={t('common_current_password_placeholder')!}
                        {...getFieldProps('password')}/>

                      <InputRightElement>
                        <IconButton
                          onClick={() => setPasswordVisibility(!passwordVisibility)}
                          isDisabled={isLoading}
                          variant={'link'}
                          title={passwordVisibility ? t('auth_screen_password_btn_hide_title', {ns: 'auth'})! : t('auth_screen_password_btn_show_title', {ns: 'auth'})!}
                          icon={<Icon as={passwordVisibility ? VisibilityOffIcon : VisibilityIcon} />}
                          aria-label={'password visibility'}
                        />
                      </InputRightElement>
                    </InputGroup>

                    {touched.password && Boolean(errors.password) && <FormErrorMessage>{errors.password}</FormErrorMessage>}
                  </FormControl>
                </>
              }
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} variant={'outline'} colorScheme={'gray'} title={t('common_cancel_btn')!} mr={4}>
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

export default ChangePasswordModal;
