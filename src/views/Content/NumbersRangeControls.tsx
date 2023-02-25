import React, { ChangeEvent, FC, ReactElement, RefObject } from 'react';
import { FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useSettingsStore } from '../../store/hooks';

interface Props {
  initElementRef: RefObject<HTMLInputElement>;
}

const NumbersRangeControls: FC<Props> = observer(({initElementRef}): ReactElement => {
  const settingsStore = useSettingsStore();

  const updateValue = (type: 'min' | 'max', e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    if (type === 'min') {
      settingsStore.updateMinValue(value);
    } else if (type === 'max') {
      settingsStore.updateMaxValue(value);
    }
  };

  return (
    <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'space-between'}>
      <Heading as={'h6'} fontSize={20}>Numbers range</Heading>

      <Stack direction={'column'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={4}>
        <FormControl>
          <FormLabel>Minimal number</FormLabel>

          <Input
            onChange={(e) => updateValue('min', e)}
            value={settingsStore.settings.minValue}
            ref={initElementRef}
            type={'number'}
            colorScheme={'teal'}
            placeholder={'Enter minimal number'}/>
        </FormControl>

        <FormControl>
          <FormLabel>Maximal number</FormLabel>

          <Input
            onChange={(e) => updateValue('max', e)}
            value={settingsStore.settings.maxValue}
            type={'number'}
            colorScheme={'teal'}
            placeholder={'Enter maximal number'}/>
        </FormControl>
      </Stack>
    </Stack>
  );
});

export default NumbersRangeControls;
