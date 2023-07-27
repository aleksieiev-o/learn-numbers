import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {observer} from 'mobx-react-lite';
import {Stack} from '@chakra-ui/react';
import {useGlobalLoaderStore, useRootStore} from '../store/hooks';
import AppLoader from '../components/AppLoader';
import BrowserIsNotSupported from '../components/BrowserIsNotSupported';

const AppLayout: FC<PropsWithChildren> = observer((props): ReactElement => {
  const {children} = props;
  const {bowserBrowser} = useRootStore();
  const {isGlobalLoading} = useGlobalLoaderStore();
  const isSupportedBrowser = (): boolean => bowserBrowser.name === 'Chrome'/* || bowserBrowser.name === 'Firefox'*/;

  return (
    <Stack as={'section'} direction={'column'} w={'full'} h={'full'}>
      {
        isGlobalLoading ?
          <AppLoader/>
          :
          <>
            {
              isSupportedBrowser() ?
                <>
                  {children}
                </>
                :
                <BrowserIsNotSupported/>
            }
          </>
      }
    </Stack>
  );
});

export default AppLayout;
