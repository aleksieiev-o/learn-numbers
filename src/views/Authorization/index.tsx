import React, {FC, ReactElement, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuthorizationStore} from '../../store/hooks';
import {IAuthSignInRequestDto} from '../../store/AuthorizationStore';
import {object, string} from 'yup';
import {FormikHelpers, useFormik} from 'formik';
import {
  Button,
  FormControl, FormErrorMessage, FormLabel, Heading, Icon, IconButton, Input, InputGroup, InputRightElement,
  Stack, Text
} from '@chakra-ui/react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {useLocation, useNavigate} from 'react-router-dom';
import {useLoading} from '../../hooks/useLoading';
import {EnumRouter} from '../../Router';
import ContainerLayout from '../../layouts/Container.layout';
import AppLayout from '../../layouts/App.layout';
import MainLayout from '../../layouts/Main.layout';

const Authorization: FC = (): ReactElement => {
  const { t } = useTranslation(['common', 'auth']);
  const authorizationStore = useAuthorizationStore();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const {isLoading, setIsLoading} = useLoading();
  const navigate = useNavigate();
  const location = useLocation();

  const isSignInPage = useMemo(() => {
    return location.pathname === EnumRouter.SIGN_IN;
  }, [location]);

  const initialSignInValues: IAuthSignInRequestDto = {
    email: '',
    password: '',
  };

  // TODO after change app language, error text don't translate
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const validationSignInSchema = useMemo(() => {
    return object().shape({
      email: string()
        .trim()
        .required(t('auth_screen_email_error_text_required', {ns: 'auth'})!)
        .email(t('auth_screen_email_error_text_email_type', {ns: 'auth'})!)
        .min(3, t('auth_screen_email_error_text_min_length', {ns: 'auth'})!)
        .max(254, t('auth_screen_email_error_text_max_length', {ns: 'auth'})!),
      password: string()
        .trim()
        .required(t('auth_screen_password_error_text_required', {ns: 'auth'})!)
        .min(3, t('auth_screen_password_error_text_min_length', {ns: 'auth'})!)
        .max(28, t('auth_screen_password_error_text_max_length', {ns: 'auth'})!),
    });
  }, [t]);
  /* eslint-enable */

  const submitHandler = async (payload: IAuthSignInRequestDto, formikHelpers: FormikHelpers<IAuthSignInRequestDto>) => {
    setIsLoading(true);

    try {
      if (isSignInPage) {
        await authorizationStore.signInEmailPassword(payload);
        await navigate(EnumRouter.MAIN);
      } else if (!isSignInPage) {
        await authorizationStore.singUpEmailAndPassword(payload);
        await navigate(EnumRouter.MAIN);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      formikHelpers.resetForm();
      formikHelpers.setSubmitting(false);
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: initialSignInValues,
    validationSchema: validationSignInSchema,
    onSubmit: submitHandler,
    validateOnBlur: true,
  });

  const { touched, errors, resetForm, getFieldProps } = formik;

  const handleToggleAuthRoute = () => {
    navigate(isSignInPage ? EnumRouter.SIGN_UP : EnumRouter.SIGN_IN);
    resetForm();
  };

  return (
    <AppLayout>
      <MainLayout>
        <ContainerLayout>
          <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} h={'full'} spacing={4} minW={'320px'}>
            {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
            <Heading as={'h6'} fontSize={24} color={'twitter.600'}>
              {isSignInPage ? t('auth_screen_sign_in_title', {ns: 'auth'}) : t('auth_screen_sign_up_title', {ns: 'auth'})}
            </Heading>

            <form onSubmit={formik.handleSubmit} style={{ width: '100% '}}>
              <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={4} mb={6}>
                <FormControl isInvalid={touched.email && Boolean(errors.email)}>
                  <FormLabel>{t('auth_screen_email_label', {ns: 'auth'})}</FormLabel>

                  <Input
                    type={'email'}
                    colorScheme={'twitter'}
                    boxShadow={'md'}
                    placeholder={t('auth_screen_email_placeholder', {ns: 'auth'})!}
                    {...getFieldProps('email')}/>

                  {touched.email && Boolean(errors.email) && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                </FormControl>

                <FormControl isInvalid={touched.password && Boolean(errors.password)}>
                  <FormLabel>{t('auth_screen_password_label', {ns: 'auth'})}</FormLabel>

                  <InputGroup>
                    <Input
                      type={passwordVisibility ? 'text' : 'password'}
                      colorScheme={'twitter'}
                      boxShadow={'md'}
                      placeholder={t('auth_screen_password_placeholder', {ns: 'auth'})!}
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

                <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={2}>
                  <Text>
                    {
                      isSignInPage
                        ? t('auth_screen_sign_in_desc', {ns: 'auth'})
                        : t('auth_screen_sign_up_desc', {ns: 'auth'})
                    }
                  </Text>

                  <Button
                    onClick={handleToggleAuthRoute}
                    variant={'link'}
                    colorScheme={'twitter'}
                    title={isSignInPage
                      ? t('auth_screen_sign_up_btn_text', {ns: 'auth'})!
                      : t('auth_screen_sign_in_btn_text', {ns: 'auth'})!}>
                    {isSignInPage
                      ? t('auth_screen_sign_up_btn_text', {ns: 'auth'})
                      : t('auth_screen_sign_in_btn_text', {ns: 'auth'})
                    }
                  </Button>
                </Stack>
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} w={'full'} spacing={2}>
                <Button
                  onClick={() => navigate(EnumRouter.MAIN)}
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
                  colorScheme={'twitter'}
                  boxShadow={'md'}
                  title={isSignInPage
                    ? t('auth_screen_sign_in_btn_text', {ns: 'auth'})!
                    : t('auth_screen_sign_up_btn_text', {ns: 'auth'})!}>
                  {isSignInPage
                    ? t('auth_screen_sign_in_btn_text', {ns: 'auth'})
                    : t('auth_screen_sign_up_btn_text', {ns: 'auth'})
                  }
                </Button>
              </Stack>
            </form>
            {/* eslint-enable */}
          </Stack>
        </ContainerLayout>
      </MainLayout>
    </AppLayout>
  );
};

export default Authorization;
