import React, { FC, ReactElement } from 'react';
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface Props {
  firstTab: ReactElement;
  secondTab: ReactElement;
}

const ContentNavigation: FC<Props> = (props): ReactElement => {
  const {firstTab, secondTab} = props;
  const { t } = useTranslation(['common']);

  return (
    <Tabs variant={'line'} isFitted={true} w={'full'} colorScheme={'twitter'}>
      <TabList>
        <Tab>{t('common_write_nav_tab')}</Tab>

        <Tab>{t('common_say_nav_tab')}</Tab>
      </TabList>

      <TabPanels pt={2}>
        <TabPanel pr={0} pb={0} pl={0}>
          <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={6}>
            {firstTab}
          </Stack>
        </TabPanel>

        <TabPanel pr={0} pb={0} pl={0}>
          <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={6}>
            {secondTab}
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ContentNavigation;
