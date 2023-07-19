import React, { FC, ReactElement } from 'react';
import Header from '../components/Header';
import Content from './Content';
import { Stack, useDisclosure, Text } from '@chakra-ui/react';
import { useRootStore } from '../store/hooks';

const Main: FC = (): ReactElement => {
  const { isOpen: isOpenSettings, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure();
  const settingsButtonRef = React.useRef<HTMLButtonElement>(null);
  const initElementRef = React.useRef<HTMLInputElement>(null);
  const {bowserBrowser} = useRootStore();

  const isSupportedBrowser = (): boolean => bowserBrowser.name === 'Chrome'/* || bowserBrowser.name === 'Firefox'*/;

  return (
    <Stack as={'section'} direction={'column'} w={'full'} h={'full'}>
      {
        isSupportedBrowser() ?
        <>
          <Header
            settingsButtonRef={settingsButtonRef}
            onOpenSettings={onOpenSettings}/>

          <Content
            settingsButtonRef={settingsButtonRef}
            initElementRef={initElementRef}
            isOpenSettings={isOpenSettings}
            onCloseSettings={onCloseSettings}/>
        </>
        :
        <Stack as={'section'} direction={'column'} spacing={2} alignItems={'center'} justifyContent={'center'} w={'full'} h={'full'}>
          <Text fontSize={20}>This browser is not supported.</Text>
          <Text fontSize={20}>Please, use only Chrome browser.</Text>
        </Stack>
      }
    </Stack>
  );
};

export default Main;
