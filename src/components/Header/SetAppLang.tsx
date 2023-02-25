import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

export enum AppLang {
  EN_US = 'en-US',
  RU_RU = 'ru-RU',
}

export enum AppLangTitle {
  EN_US = 'English',
  RU_RU = 'Русский',
}

const SetAppLang: FC = (): ReactElement => {
  const [language, setLanguage] = useState<AppLang>(AppLang.EN_US);
  const { t, i18n } = useTranslation(['common']);

  const languages: Array<{ title: AppLangTitle, lang: AppLang }> = [
    { title: AppLangTitle.EN_US, lang: AppLang.EN_US },
    { title: AppLangTitle.RU_RU, lang: AppLang.RU_RU },
  ];

  const changeLocale = async (lang: AppLang): Promise<void> => {
    await i18n.changeLanguage(lang);
    await setLanguage(lang);
  };

  useEffect(() => {
    const lang = window.localStorage.getItem('i18nextLng');

    changeLocale(lang as AppLang || AppLang.EN_US);
  }, []);

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
              onClick={() => changeLocale(menuItem.lang)}
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
};

export default SetAppLang;
