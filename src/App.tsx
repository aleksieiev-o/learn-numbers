import React, { FC, ReactElement } from 'react';
import { ChakraProvider, Stack } from '@chakra-ui/react';
import { theme } from './theme';
import SpeechUtteranceContextProvider from './Providers/SpeechUtteranceContext.provider';

const App: FC = (): ReactElement => {
  return (
    <ChakraProvider resetCSS={true} theme={theme} portalZIndex={1}>
      <SpeechUtteranceContextProvider>
        <Stack
          as={'section'}
          direction={'column'}
          w={'full'}
          h={'full'}>
          <p>App</p>
        </Stack>
      </SpeechUtteranceContextProvider>
    </ChakraProvider>
  );
};

export default App;
