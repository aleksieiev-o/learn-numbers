import React, {FC, ReactElement} from 'react';
import {Heading, Show, Stack} from '@chakra-ui/react';
import AppThemeSwitcher from '../../components/AppThemeSwitcher';
import {useTranslation} from 'react-i18next';
import AppLanguageChanger from '../../components/AppLanguageChanger';
import {tabletScreenWidth} from '../../theme';

const AppSettingsControls: FC = (): ReactElement => {
  const { t } = useTranslation(['common']);
  
  return (
    <Show breakpoint={`(max-width: ${tabletScreenWidth}px)`}>
      <Stack spacing={4}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={4}>
          <Heading as={'h6'} fontSize={20}>{t('common_theme_text')}</Heading>

          <AppThemeSwitcher/>
        </Stack>

        <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={4}>
          <Heading as={'h6'} fontSize={20}>{t('common_language_text')}</Heading>

          <AppLanguageChanger/>
        </Stack>
      </Stack>
    </Show>
  );
};

export default AppSettingsControls;
