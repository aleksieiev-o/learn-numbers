import React, { FC, ReactElement } from 'react';
import { ChakraProvider, Stack, useDisclosure } from '@chakra-ui/react';
import { theme } from './theme';
import SpeechUtteranceContextProvider from './Providers/SpeechUtteranceContext.provider';
import Header from './components/Header';
import Content from './views/Content';

const App: FC = (): ReactElement => {
  const { isOpen: isOpenSettings, onOpen: onOpenSettings, onClose: onCloseSettings } = useDisclosure();
  const settingsButtonRef = React.useRef<HTMLButtonElement>(null);
  const initElementRef = React.useRef<HTMLInputElement>(null);

  return (
    <ChakraProvider resetCSS={true} theme={theme} portalZIndex={1}>
      <SpeechUtteranceContextProvider>
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
      </SpeechUtteranceContextProvider>
    </ChakraProvider>
  );
};

export default App;
