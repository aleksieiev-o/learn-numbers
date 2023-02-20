import React, { FC, ReactElement } from 'react';
import { Stack } from '@chakra-ui/react';

const Content: FC = (): ReactElement => {
  return (
    <Stack
      as={'main'}
      direction={'column'}
      w={'full'}
      h={'full'}
      alignItems={'center'}
      justifyContent={'space-between'}
      overflow={'hidden'}
      p={4}>
      <p>Content</p>
    </Stack>
  );
};

export default Content;
