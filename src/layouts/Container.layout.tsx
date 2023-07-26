import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {Container, Stack} from '@chakra-ui/react';

const ContainerLayout: FC<PropsWithChildren> = (props): ReactElement => {
  const {children} = props;

  return (
    <Stack as={'main'} w={'full'} h={'full'} overflowY={'auto'}>
      <Container centerContent={true} w={'full'} h={'full'} maxW={'6xl'} p={4}>
        <Stack alignItems={'center'} justifyContent={'flex-start'} w={'full'} h={'full'} spacing={6}>
          {children}
        </Stack>
      </Container>
    </Stack>
  );
};

export default ContainerLayout;
