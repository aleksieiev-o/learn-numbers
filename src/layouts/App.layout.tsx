import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {Stack, Text} from '@chakra-ui/react';
import {useRootStore} from '../store/hooks';

const AppLayout: FC<PropsWithChildren> = (props): ReactElement => {
  const {children} = props;
  const {bowserBrowser} = useRootStore();
  const isSupportedBrowser = (): boolean => bowserBrowser.name === 'Chrome'/* || bowserBrowser.name === 'Firefox'*/;

  return (
    <Stack as={'section'} direction={'column'} w={'full'} h={'full'}>
      {
        isSupportedBrowser()
          ?
          <>{children}</>
          :
          <Stack as={'section'} direction={'column'} spacing={2} alignItems={'center'} justifyContent={'center'} w={'full'} h={'full'}>
            <Text fontSize={20}>This browser is not supported.</Text>
            <Text fontSize={20}>Please, use only Chrome browser.</Text>
          </Stack>
      }
    </Stack>
  );
};

export default AppLayout;
