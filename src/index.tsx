import React from 'react';
import ReactDOM from 'react-dom/client';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import './locales/index';
import './index.css';
import {theme} from './theme';
import StoreContextProvider from './providers/StoreContext.provider';
import SpeechUtteranceContextProvider from './providers/SpeechUtteranceContext.provider';
import {ChakraProvider} from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import {router} from './Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true} theme={theme} portalZIndex={1}>
      <StoreContextProvider>
        <SpeechUtteranceContextProvider>
          <RouterProvider router={router}/>
        </SpeechUtteranceContextProvider>
      </StoreContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// serviceWorkerRegistration.register();
reportWebVitals();
