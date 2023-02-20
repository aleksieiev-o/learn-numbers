import React, { FC, ReactElement } from 'react';
import { ChakraProvider, Stack } from '@chakra-ui/react';
import { theme } from './theme';
import SpeechUtteranceContextProvider from './Providers/SpeechUtteranceContext.provider';
import Header from './components/Header';
import Content from './views/Content';

const App: FC = (): ReactElement => {
  return (
    <ChakraProvider resetCSS={true} theme={theme} portalZIndex={1}>
      <SpeechUtteranceContextProvider>
        <Stack
          as={'section'}
          direction={'column'}
          w={'full'}
          h={'full'}>
          <Header/>

          <Content/>
        </Stack>
      </SpeechUtteranceContextProvider>
    </ChakraProvider>
  );
};

export default App;
