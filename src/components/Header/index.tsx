import React, {FC, ReactElement} from 'react';
import {APP_NAME} from '../../utils/constants';
import {Container, Icon, IconButton, Stack} from '@chakra-ui/react';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import {useTranslation} from 'react-i18next';
import AppLanguageChanger from '../AppLanguageChanger';
import {useAuthorizationStore} from '../../store/hooks';
import {observer} from 'mobx-react-lite';
import UserInfo from './UserInfo';
import AppThemeSwitcher from '../AppThemeSwitcher';
import {EnumRouter} from '../../Router';
import LogoIcon from './Logo.icon';
import { Link } from 'react-router-dom';
import {useChangeRoute} from '../../hooks/useChangeRoute';

const Header: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const { t } = useTranslation(['common', 'auth']);
  const {changeRoute} = useChangeRoute();

  return (
    <>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <Stack as={'header'} w={'full'} boxShadow={'md'}>
        <Container centerContent={true} w={'full'} maxW={'6xl'} p={4}>
          <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'space-between'} minH={'50px'}>
            <Stack mr={10}>
              <Link to={EnumRouter.MAIN}>
                <LogoIcon size={60} title={APP_NAME}/>
              </Link>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={{ md: 6, base: 2 }} overflow={'hidden'} pt={1} pb={1}>
              {
                authorizationStore.isAuth && <UserInfo/>
              }

              <AppLanguageChanger/>

              <AppThemeSwitcher/>

              {
                !authorizationStore.isAuth && <IconButton
                  onClick={() => changeRoute(EnumRouter.SIGN_IN)}
                  colorScheme={'gray'}
                  variant={'outline'}
                  boxShadow={'md'}
                  title={t('auth_open_auth_screen_btn_title', {ns: 'auth'})!}
                  aria-label={'Open authorization modal'}
                  icon={<Icon as={LoginIcon}/>}/>
              }

              <IconButton
                onClick={() => changeRoute(EnumRouter.SETTINGS)}
                colorScheme={'gray'}
                variant={'outline'}
                boxShadow={'md'}
                title={t('common_open_settings_title')!}
                aria-label={'Open settings'}
                icon={<Icon as={SettingsIcon}/>}/>
            </Stack>
          </Stack>
        </Container>
      </Stack>
      {/* eslint-enable */}
    </>
  );
});

export default Header;
