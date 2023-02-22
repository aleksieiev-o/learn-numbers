import React, { FC, ReactElement } from 'react';
import Header from '../components/Header';
import Content from './Content';
import { Stack, useDisclosure } from '@chakra-ui/react';

const Main: FC = (): ReactElement => {
  const { isOpen: isOpenSettings, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure();
  const settingsButtonRef = React.useRef<HTMLButtonElement>(null);
  const initElementRef = React.useRef<HTMLInputElement>(null);

  return (
    <Stack as={'section'} direction={'column'} w={'full'} h={'full'}>
      <Header
        settingsButtonRef={settingsButtonRef}
        onOpenSettings={onOpenSettings}/>

      <Content
        settingsButtonRef={settingsButtonRef}
        initElementRef={initElementRef}
        isOpenSettings={isOpenSettings}
        onCloseSettings={onCloseSettings}/>
    </Stack>
  );
};

export default Main;
