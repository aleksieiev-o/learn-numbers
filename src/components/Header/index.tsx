import React, {FC, ReactElement} from 'react';
import {APP_NAME} from '../../utils/constants';
import {Container, Heading, Icon, IconButton, Stack, Hide} from '@chakra-ui/react';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import {tabletScreenWidth} from '../../theme';
import {useTranslation} from 'react-i18next';
import AppLanguageChanger from '../AppLanguageChanger';
import {useAuthorizationStore} from '../../store/hooks';
import {observer} from 'mobx-react-lite';
import UserInfo from './UserInfo';
import AppThemeSwitcher from '../AppThemeSwitcher';
import {useNavigate} from 'react-router-dom';
import {EnumRouter} from '../../Router';

const Header: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();
  const { t } = useTranslation(['common', 'auth']);
  const navigate = useNavigate();

  return (
    <>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <Stack as={'header'} w={'full'} boxShadow={'md'}>
        <Container centerContent={true} w={'full'} maxW={'6xl'} p={4}>
          <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'space-between'} minH={'50px'}>
            <Heading
              onClick={() => navigate(EnumRouter.MAIN)}
              as={'h4'}
              fontSize={{ md: 32, base: 20 }}
              color={'twitter.600'}
              cursor={'default'}
              whiteSpace={'nowrap'} mr={4}
              title={APP_NAME}
              style={{ cursor: 'pointer' }}>
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
                !authorizationStore.isAuth && <IconButton
                  onClick={() => navigate(EnumRouter.SIGN_IN)}
                  colorScheme={'gray'}
                  variant={'outline'}
                  boxShadow={'md'}
                  title={t('auth_open_auth_screen_btn_title', {ns: 'auth'})!}
                  aria-label={'Open authorization modal'}
                  icon={<Icon as={LoginIcon}/>}/>
              }

              <IconButton
                onClick={() => navigate(EnumRouter.SETTINGS)}
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
