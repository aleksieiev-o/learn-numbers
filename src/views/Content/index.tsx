import React, { FC, ReactElement } from 'react';
import { Container, Stack } from '@chakra-ui/react';
import NumbersRangeControls from './NumbersRangeControls';
import SpeechPropsControls from './SpeechPropsControls';
import ActionControls from './ActionControls';
import UserCheckControls from './UserCheckControls';

const Content: FC = (): ReactElement => {
  return (
    <Stack
      as={'main'}
      w={'full'}
      h={'full'}
      overflowY={'auto'}>
      <Container
        centerContent={true}
        w={'full'}
        h={'full'}
        maxW={'6xl'}
        p={4}>
        <Stack
          w={'full'}
          h={'full'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          spacing={4}>
          <NumbersRangeControls/>

          <SpeechPropsControls/>

          <ActionControls/>

          <UserCheckControls/>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Content;
