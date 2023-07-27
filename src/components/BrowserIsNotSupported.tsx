import React, {FC, ReactElement} from 'react';
import {Stack, Text} from '@chakra-ui/react';

const BrowserIsNotSupported: FC = (): ReactElement => {
  return (
    <Stack as={'section'} direction={'column'} spacing={2} alignItems={'center'} justifyContent={'center'} w={'full'} h={'full'}>
      <Text fontSize={20}>This browser is not supported.</Text>
      <Text fontSize={20}>Please, use only Chrome browser.</Text>
    </Stack>
  );
};

export default BrowserIsNotSupported;
