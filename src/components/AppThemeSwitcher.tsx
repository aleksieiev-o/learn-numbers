import React, {FC, ReactElement, useEffect} from 'react';
import {ColorMode} from '../theme';
import {Icon, IconButton, useColorMode} from '@chakra-ui/react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {observer} from 'mobx-react-lite';
import {useLoading} from '../hooks/useLoading';
import {useTranslation} from 'react-i18next';
import {IAppTheme} from '../store/SettingsStore/types';
import {useSettingsStore} from '../store/hooks';

const AppThemeSwitcher: FC = observer((): ReactElement => {
  const { colorMode, setColorMode } = useColorMode();
  const settingsStore = useSettingsStore();
  const {isLoading, setIsLoading} = useLoading();
  const { t } = useTranslation(['common']);

  const updateTheme = async () => {
    setIsLoading(true);

    if (settingsStore.appSettings.appTheme === IAppTheme.LIGHT) {
      await settingsStore.updateAppTheme(IAppTheme.DARK);
    } else {
      await settingsStore.updateAppTheme(IAppTheme.LIGHT);
    }

    await setIsLoading(false);
  };

  useEffect(() => {
    setColorMode(settingsStore.appSettings.appTheme);
  }, [settingsStore.appSettings.appTheme]);

  return (
    <>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <IconButton
        onClick={updateTheme}
        isLoading={isLoading}
        colorScheme={'gray'}
        variant={'outline'}
        boxShadow={'md'}
        title={colorMode === ColorMode.DARK ? t('common_set_light_theme_title')! : t('common_set_dark_theme_title')!}
        aria-label={colorMode === ColorMode.DARK ? 'Set light theme' : 'Set dark theme'}
        icon={<Icon as={colorMode === ColorMode.DARK ? LightModeIcon : DarkModeIcon}/>}/>
      {/* eslint-enable */}
    </>
  );
});

export default AppThemeSwitcher;
