import React, {FC, ReactElement} from 'react';
import {Spinner, Stack} from '@chakra-ui/react';

const AppLoader: FC = (): ReactElement => {
  return (
    <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} w={'full'} h={'full'} overflow={'hidden'}>
      <Spinner size={'xl'} color={'twitter.500'}/>
    </Stack>
  );
};

export default AppLoader;
