import React, { FC, ReactElement } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import StoreContextProvider from './Providers/StoreContext.provider';
import SpeechUtteranceContextProvider from './Providers/SpeechUtteranceContext.provider';
import Main from './views/Main';

const App: FC = (): ReactElement => {
  return (
    <ChakraProvider resetCSS={true} theme={theme} portalZIndex={1}>
      <StoreContextProvider>
        <SpeechUtteranceContextProvider>
          <Main/>
        </SpeechUtteranceContextProvider>
      </StoreContextProvider>
    </ChakraProvider>
  );
};

export default App;
