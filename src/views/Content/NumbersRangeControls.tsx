import React, { FC, ReactElement } from 'react';
import { FormControl, FormLabel, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack } from '@chakra-ui/react';

const NumbersRangeControls: FC = (): ReactElement => {
  return (
    <Stack
      direction={'column'}
      w={'full'}
      alignItems={'flex-start'}
      justifyContent={'space-between'}>
      <Heading as={'h6'} fontSize={20}>Using numbers range</Heading>

      <Stack
        direction={'row'}
        w={'full'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        spacing={6}>
        <FormControl>
          <FormLabel>From</FormLabel>

          <NumberInput allowMouseWheel colorScheme={'cyan'}>
            <NumberInputField placeholder={'Enter minimal number'} autoFocus={true}/>

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
