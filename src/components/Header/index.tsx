import React, {FC, ReactElement, RefObject} from 'react';
import {APP_NAME, APP_NAME_SHORT} from '../../utils/constants';
import {Container, Heading, Icon, IconButton, Stack, useColorMode, useDisclosure} from '@chakra-ui/react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import {ColorMode} from '../../theme';
import {useTranslation} from 'react-i18next';
import SetAppLang from './SetAppLang';
import {useAuthorizationStore, useRootStore, useSettingsStore} from '../../store/hooks';
import {IAppTheme} from '../../store/SettingsStore/types';
import {useLoading} from '../../hooks/useLoading';
import AuthorizationModal from '../AuthorizationModal/Authorization.modal';
import {observer} from 'mobx-react-lite';
import UserInfo from './UserInfo';
import ActionConfirmationModal, {ActionConfirmationModalType} from '../UI/ActionConfirmation.modal';

interface Props {
  settingsButtonRef: RefObject<HTMLButtonElement>;
  onOpenSettings: () => void;
}

const Header: FC<Props> = observer((props): ReactElement => {
  const { settingsButtonRef, onOpenSettings } = props;
  const { colorMode, setColorMode } = useColorMode();
  const { isOpen: isOpenAuthModal, onOpen: onOpenAuthModal, onClose: onCloseAuthModal } = useDisclosure();
  const { isOpen: isOpenSignOutModal, onOpen: onOpenSignOutModal, onClose: onCloseSignOutModal } = useDisclosure();
  const {bowserPlatform} = useRootStore();
  const settingsStore = useSettingsStore();
  const authorizationStore = useAuthorizationStore();
  const {isLoading, setIsLoading} = useLoading();
  const { t } = useTranslation(['common', 'auth']);

  const updateTheme = async () => {
    setIsLoading(true);

    if (settingsStore.appSettings.appTheme === IAppTheme.LIGHT) {
      setColorMode(IAppTheme.DARK);
      await settingsStore.updateAppTheme(IAppTheme.DARK);
    } else {
      setColorMode(IAppTheme.LIGHT);
      await settingsStore.updateAppTheme(IAppTheme.LIGHT);
    }

    await setIsLoading(false);
  };

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
              {bowserPlatform.type === 'desktop' ? APP_NAME : APP_NAME_SHORT}
            </Heading>

            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={{ md: 6, base: 2 }} overflow={'hidden'}>
              {
                authorizationStore.isAuth && <UserInfo/>
              }

              <SetAppLang/>

              <IconButton
                onClick={updateTheme}
                isLoading={isLoading}
                colorScheme={'gray'}
                variant={'outline'}
                boxShadow={'md'}
                title={colorMode === ColorMode.DARK ? t('common_set_light_theme_title')! : t('common_set_dark_theme_title')!}
                aria-label={colorMode === ColorMode.DARK ? 'Set light theme' : 'Set dark theme'}
                icon={<Icon as={colorMode === ColorMode.DARK ? LightModeIcon : DarkModeIcon}/>}/>

              <IconButton
                onClick={onOpenSettings}
                ref={settingsButtonRef}
                colorScheme={'gray'}
                variant={'outline'}
                boxShadow={'md'}
                title={t('common_open_settings_title')!}
                aria-label={'Open settings'}
                icon={<Icon as={SettingsIcon}/>}/>

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
