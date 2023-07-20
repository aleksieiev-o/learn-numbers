import React, {FC, ReactElement, RefObject} from 'react';
import {APP_NAME} from '../../utils/constants';
import {Container, Heading, Icon, IconButton, Stack, useDisclosure, Hide} from '@chakra-ui/react';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {tabletScreenWidth} from '../../theme';
import {useTranslation} from 'react-i18next';
import AppLanguageChanger from '../AppLanguageChanger';
import {useAuthorizationStore} from '../../store/hooks';
import AuthorizationModal from '../AuthorizationModal/Authorization.modal';
import {observer} from 'mobx-react-lite';
import UserInfo from './UserInfo';
import ActionConfirmationModal, {ActionConfirmationModalType} from '../ActionConfirmation.modal';
import AppThemeSwitcher from '../AppThemeSwitcher';

interface Props {
  settingsButtonRef: RefObject<HTMLButtonElement>;
  onOpenSettings: () => void;
}

const Header: FC<Props> = observer((props): ReactElement => {
  const { settingsButtonRef, onOpenSettings } = props;
  const { isOpen: isOpenAuthModal, onOpen: onOpenAuthModal, onClose: onCloseAuthModal } = useDisclosure();
  const { isOpen: isOpenSignOutModal, onOpen: onOpenSignOutModal, onClose: onCloseSignOutModal } = useDisclosure();
  const authorizationStore = useAuthorizationStore();
  const { t } = useTranslation(['common', 'auth']);

  const handleSignOut = async () => {
    await authorizationStore.singOut();
  };

  return (
    <>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <Stack as={'header'} w={'full'} boxShadow={'md'}>
        <Container centerContent={true} w={'full'} maxW={'6xl'} p={4}>
          <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'space-between'} minH={'50px'}>
            <Heading
              as={'h4'}
              fontSize={{ md: 32, base: 20 }}
              color={'twitter.600'}
              cursor={'default'}
              whiteSpace={'nowrap'} mr={4}
              title={APP_NAME}>
              {APP_NAME}
            </Heading>

            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={{ md: 6, base: 2 }} overflow={'hidden'}>
              {
                authorizationStore.isAuth && <UserInfo/>
              }

              <Hide breakpoint={`(max-width: ${tabletScreenWidth}px)`}>
                <AppLanguageChanger/>

                <AppThemeSwitcher/>
              </Hide>

              {
                <IconButton
                  onClick={authorizationStore.isAuth ? onOpenSignOutModal : onOpenAuthModal}
                  colorScheme={'gray'}
                  variant={'outline'}
                  boxShadow={'md'}
                  title={authorizationStore.isAuth
                    ? t('common_open_sign_out_modal_btn_title')!
                    : t('auth_open_auth_modal_btn_title', {ns: 'auth'})!}
                  aria-label={authorizationStore.isAuth ? 'Open sign out modal' : 'Open authorization modal'}
                  icon={<Icon as={authorizationStore.isAuth ? LogoutIcon : LoginIcon}/>}/>
              }

              <IconButton
                onClick={onOpenSettings}
                ref={settingsButtonRef}
                colorScheme={'gray'}
                variant={'outline'}
                boxShadow={'md'}
                title={t('common_open_settings_title')!}
                aria-label={'Open settings'}
                icon={<Icon as={MenuIcon}/>}/>
            </Stack>
          </Stack>
        </Container>
      </Stack>

      {
        isOpenAuthModal &&
        <AuthorizationModal
          isOpen={isOpenAuthModal}
          onClose={onCloseAuthModal}/>
      }

      {
        isOpenSignOutModal &&
        <ActionConfirmationModal
          isOpen={isOpenSignOutModal}
          onClose={onCloseSignOutModal}
          handleAction={handleSignOut}
          modalType={ActionConfirmationModalType.WARNING}
          modalTitle={t('common_sign_out_confirm_title')!}
          modalDescription={t('common_sign_out_confirm_message')!}
          modalQuestion={t('common_confirm_question')!}
          buttonText={t('common_sign_out_btn_title')!}/>
      }
      {/* eslint-enable */}
    </>
  );
});

export default Header;
