import React, { FC, ReactElement, RefObject } from 'react';
import { FormControl, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack } from '@chakra-ui/react';

interface Props {
  initElementRef: RefObject<HTMLInputElement>;
}

const NumbersRangeControls: FC<Props> = ({initElementRef}): ReactElement => {
  return (
    <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'space-between'}>
      <Heading as={'h6'} fontSize={20}>Using numbers range</Heading>

      <Stack direction={'column'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={4}>
        <FormControl>
          <FormLabel>From</FormLabel>

          <NumberInput allowMouseWheel colorScheme={'cyan'}>
            <NumberInputField ref={initElementRef} placeholder={'Enter minimal number'}/>

            <NumberInputStepper>
              <NumberIncrementStepper/>

              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>To</FormLabel>

          <NumberInput allowMouseWheel colorScheme={'cyan'}>
            <NumberInputField placeholder={'Enter maximal number'}/>

            <NumberInputStepper>
              <NumberIncrementStepper/>

              <NumberDecrementStepper/>
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default NumbersRangeControls;
