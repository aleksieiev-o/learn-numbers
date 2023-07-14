import React, { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import {
  Button, FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  Text
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FormikHelpers, useFormik } from 'formik';
import { object, string } from 'yup';
import { AuthModalType } from './Authorization.modal';

interface Props {
  isLoading: boolean;
  handleActionModalButton: () => void;
  handleCloseModalButton: () => void;
  setAuthModalType: Dispatch<SetStateAction<AuthModalType>>;
}

interface ISignInDto {
  email: string;
  password: string;
}

const initialValues: ISignInDto = {
  email: '',
  password: '',
};

const validationSchema = object().shape({
  email: string().required('Email is required'),
  password: string().required('Password is required'),
});

const SignIn: FC<Props> = (props): ReactElement => {
  const {isLoading, handleActionModalButton, handleCloseModalButton, setAuthModalType} = props;
  const { t } = useTranslation(['common', 'auth']);

  const submitHandler = async (payload: ISignInDto, formikHelpers: FormikHelpers<ISignInDto>) => {
    try {

    } catch (e) {
      console.warn(e);
    } finally {
      formikHelpers.resetForm();
      formikHelpers.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
    validateOnBlur: true,
  });

  const { touched, dirty, errors, getFieldProps } = formik;

  return (
    <ModalContent>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <ModalHeader>{t('auth_modal_sign_in_title', {ns: 'auth'})}</ModalHeader>

      <ModalCloseButton title={t('common_close_btn')!}/>

      <ModalBody>
        <Stack>
          <FormControl isRequired={true} isInvalid={touched.email && dirty && Boolean(errors.email)}>
            <FormLabel>{t('auth_modal_email_label', {ns: 'auth'})}</FormLabel>

            <Input
              type={'email'}
              colorScheme={'telegram'}
              boxShadow={'md'}
              placeholder={t('auth_modal_email_placeholder', {ns: 'auth'})!}
              {...getFieldProps('email')}/>

            {touched.email && dirty && Boolean(errors.email) && <FormErrorMessage>{touched.email && dirty && errors.email}</FormErrorMessage>}
          </FormControl>

          <Text>{t('auth_modal_sign_in_desc', {ns: 'auth'})}</Text>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button onClick={handleCloseModalButton} colorScheme={'gray'} title={t('common_cancel_btn')!} mr={4}>
          {t('common_cancel_btn')!}
        </Button>

        <Button
          onClick={handleActionModalButton}
          isLoading={isLoading}
          colorScheme={'telegram'}
          title={t('auth_modal_sign_in_btn_text', {ns: 'auth'})!}>
          {t('auth_modal_sign_in_btn_text', {ns: 'auth'})}
        </Button>
      </ModalFooter>
      {/* eslint-enable */}
    </ModalContent>
  );
};

export default SignIn;
