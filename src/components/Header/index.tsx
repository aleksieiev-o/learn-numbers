import React, { FC, ReactElement, RefObject } from 'react';
import { APP_NAME } from '../../utils/constants';
import { Container, Heading, Icon, IconButton, Stack, useColorMode } from '@chakra-ui/react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import { ColorMode } from '../../theme';
import { useTranslation } from 'react-i18next';
import SetAppLang from './SetAppLang';

interface Props {
  settingsButtonRef: RefObject<HTMLButtonElement>;
  onOpenSettings: () => void;
}

const Header: FC<Props> = (props): ReactElement => {
  const { settingsButtonRef, onOpenSettings } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useTranslation(['common']);

  return (
    <Stack as={'header'} w={'full'} boxShadow={'md'}>
      <Container centerContent={true} w={'full'} maxW={'6xl'} p={4}>
        <Stack direction={'row'} w={'full'} alignItems={'center'} justifyContent={'space-between'}>
          <Heading as={'h4'} fontSize={{ md: 32, base: 20 }} color={'teal.600'} cursor={'default'}>{APP_NAME}</Heading>

          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={6}>
            <SetAppLang/>

            {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
            <IconButton
              onClick={toggleColorMode}
              colorScheme={'gray'}
              variant={'outline'}
              title={colorMode === ColorMode.LIGHT ? t('common_set_dark_theme_title')! : t('common_set_light_theme_title')!}
              aria-label={colorMode === ColorMode.LIGHT ? 'Set dark theme' : 'Set light theme'}
              icon={<Icon as={colorMode === ColorMode.LIGHT ? DarkModeIcon : LightModeIcon}/>}/>

            <IconButton
              onClick={onOpenSettings}
              ref={settingsButtonRef}
              colorScheme={'gray'}
              variant={'outline'}
              title={t('common_open_settings_title')!}
              aria-label={'Open settings'}
              icon={<Icon as={SettingsIcon}/>}/>
            {/* eslint-enable */}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Header;
