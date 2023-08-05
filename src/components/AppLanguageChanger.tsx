import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import {EnumAppLocale} from '../store/SettingsStore/types';
import {useSettingsStore} from '../store/hooks';
import {observer} from 'mobx-react-lite';

enum EnumAppLangTitle {
  EN_US = 'English',
  RU_RU = 'Русский',
}

const AppLanguageChanger: FC = observer((): ReactElement => {
  const [language, setLanguage] = useState<EnumAppLocale>(EnumAppLocale.EN_US);
  const { t, i18n } = useTranslation(['common']);
  const settingsStore = useSettingsStore();

  const languages: Array<{ title: EnumAppLangTitle, lang: EnumAppLocale }> = [
    { title: EnumAppLangTitle.EN_US, lang: EnumAppLocale.EN_US },
    { title: EnumAppLangTitle.RU_RU, lang: EnumAppLocale.RU_RU },
  ];

  const changeLocale = async (lang: EnumAppLocale): Promise<void> => {
    await i18n.changeLanguage(lang);
    await setLanguage(lang);
  };

  const updateLocale = async (lang: EnumAppLocale) => {
    if (settingsStore.appSettings.appLocale !== lang) {
      await settingsStore.updateAppLocale(lang);
    }
  };

  useEffect(() => {
    changeLocale(settingsStore.appSettings.appLocale);
  }, [settingsStore.appSettings.appLocale]);

  return (
    <Menu>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <MenuButton
        as={IconButton}
        colorScheme={'gray'}
        variant={'outline'}
        boxShadow={'md'}
        title={t('common_set_app_lang_title')!}
        aria-label={'Set application language'}
        icon={<Icon as={LanguageIcon}/>}/>

      <MenuList>
        {
          languages.map((menuItem) => {
            return <MenuItem
              onClick={() => updateLocale(menuItem.lang)}
              key={menuItem.lang}
              color={language === menuItem.lang ? 'twitter.600' : ''}>
              {menuItem.title}
            </MenuItem>;
          })
        }
      </MenuList>
      {/* eslint-enable */}
    </Menu>
  );
});

export default AppLanguageChanger;
