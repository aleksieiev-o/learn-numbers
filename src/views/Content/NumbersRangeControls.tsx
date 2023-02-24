import React, { FC, ReactElement, RefObject } from 'react';
import { FormControl, FormLabel, Heading, NumberInput, NumberInputField, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useSettingsStore } from '../../store/hooks';

interface Props {
  initElementRef: RefObject<HTMLInputElement>;
}

const NumbersRangeControls: FC<Props> = observer(({initElementRef}): ReactElement => {
  const settingsStore = useSettingsStore();

  return (
    <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'space-between'}>
      <Heading as={'h6'} fontSize={20}>Numbers range</Heading>

      <Stack direction={'column'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={4}>
        <FormControl>
          <FormLabel>Minimal number</FormLabel>

          <NumberInput value={settingsStore.settings.minValue} colorScheme={'teal'}>
            <NumberInputField
              onChange={(e) => settingsStore.updateMinValue(e.target.value)}
              ref={initElementRef}
              placeholder={'Enter minimal number'}/>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Maximal number</FormLabel>

          <NumberInput value={settingsStore.settings.maxValue} colorScheme={'teal'}>
            <NumberInputField
              onChange={(e) => settingsStore.updateMaxValue(e.target.value)}
              placeholder={'Enter maximal number'}/>
          </NumberInput>
        </FormControl>
      </Stack>
    </Stack>
  );
});

export default NumbersRangeControls;
