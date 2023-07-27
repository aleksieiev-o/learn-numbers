import React, {FC, ReactElement, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
  Button, FormControl, FormErrorMessage, FormLabel, Icon, IconButton, Input, InputGroup, InputRightElement, Modal,
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
import {useAuthorizationStore} from '../../../store/hooks';
import {IAuthChangeEmailRequestDto} from '../../../store/AuthorizationStore';
import {object, string} from 'yup';
import {FormikHelpers, useFormik} from 'formik';
import {useActionToast} from '../../../hooks/useActionToast';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useLoading} from '../../../hooks/useLoading';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeEmailModal: FC<Props> = observer((props): ReactElement => {
  const { isOpen, onClose } = props;
  const authorizationStore = useAuthorizationStore();
  const { t } = useTranslation(['common', 'auth']);
  const {showActionToast} = useActionToast();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [needReAuth, setNeedReAuth] = useState<boolean>(false);
  const {isLoading, setIsLoading} = useLoading();

  const initialChangeEmailValues: IAuthChangeEmailRequestDto = {
    newEmail: '',
    email: '',
    password: '',
  };

  // TODO after change app language, error text don't translate
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const validationChangeEmailSchema = useMemo(() => {
    if (!needReAuth) {
      return object().shape({
        newEmail: string()
          .trim()
          .required(t('common_new_email_error_text_required')!)
          .email(t('common_new_email_error_text_email_type')!)
          .min(3, t('common_new_email_error_text_min_length')!)
          .max(254, t('common_new_email_error_text_max_length')!)
          .matches(new RegExp(`^(?!${authorizationStore.user.email}$).*`), t('common_new_email_error_text_same')!),
      });
    }

    return object().shape({
      newEmail: string()
        .trim()
        .required(t('common_new_email_error_text_required')!)
        .email(t('common_new_email_error_text_email_type')!)
        .min(3, t('common_new_email_error_text_min_length')!)
        .max(254, t('common_new_email_error_text_max_length')!)
        .matches(new RegExp(`^(?!${authorizationStore.user.email}$).*`), t('common_new_email_error_text_same')!),
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

  const submitHandler = async (payload: IAuthChangeEmailRequestDto, formikHelpers: FormikHelpers<IAuthChangeEmailRequestDto>) => {
    setIsLoading(true);

    try {
      if (needReAuth) {
        await authorizationStore.reAuthUser({ email: payload.email, password: payload.password });
        await authorizationStore.updateUserEmail(payload);
      } else {
        await authorizationStore.updateUserEmail(payload);
      }

      formikHelpers.resetForm();
      await onClose();

      showActionToast({
        title: t('common_toast_change_email_success_title')!,
        description: t('common_toast_change_email_success_description')!,
        status: 'success',
      });
    } catch (err) {
      console.warn(err);
      setNeedReAuth(true);

      showActionToast({
        title: t('common_toast_change_email_error_title')!,
        description: t('common_toast_change_email_error_description')!,
        status: 'error',
      });
    } finally {
      formikHelpers.setSubmitting(false);
      setIsLoading(false);
    }
  };
  /* eslint-enable */

  const formik = useFormik({
    initialValues: initialChangeEmailValues,
    validationSchema: validationChangeEmailSchema,
    onSubmit: submitHandler,
    validateOnBlur: true,
  });

  const { touched, errors, getFieldProps } = formik;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <ModalOverlay/>

      <form onSubmit={formik.handleSubmit} style={{ width: '100% '}}>
        <ModalContent>
          <ModalHeader>{t('common_btn_change_email')}</ModalHeader>

          <ModalCloseButton title={t('common_close_btn')!}/>

          <ModalBody>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={4} w={'full'} overflow={'hidden'}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} spacing={2} overflow={'hidden'}>
                <Text>{t('common_current_email_text')}</Text>

                <Text
                  as={'strong'}
                  whiteSpace={'nowrap'}
                  textOverflow={'ellipsis'}
                  overflow={'hidden'}>
                  {authorizationStore.user.email}
                </Text>
              </Stack>

              <FormControl isInvalid={touched.newEmail && Boolean(errors.newEmail)}>
                <FormLabel>{t('common_new_email_label')}</FormLabel>

                <Input
                  isDisabled={isLoading}
                  colorScheme={'twitter'}
                  boxShadow={'md'}
                  placeholder={t('common_new_email_placeholder')!}
                  {...getFieldProps('newEmail')}/>

                {touched.newEmail && Boolean(errors.newEmail) && <FormErrorMessage>{errors.newEmail}</FormErrorMessage>}
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

export default ChangeEmailModal;
