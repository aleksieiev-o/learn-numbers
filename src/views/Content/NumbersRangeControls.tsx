import React, { ChangeEvent, FC, ReactElement } from 'react';
import { FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useSettingsStore } from '../../store/hooks';
import { useTranslation } from 'react-i18next';

const NumbersRangeControls: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const { t } = useTranslation(['common']);

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
      <Heading as={'h6'} fontSize={20}>{t('common_num_range_label')}</Heading>

      <Stack direction={'column'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={4}>
        {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
        <FormControl>
          <FormLabel>{t('common_min_number_label')}</FormLabel>

          <Input
            onChange={(e) => updateValue('min', e)}
            value={settingsStore.settings.minValue}
            type={'number'}
            colorScheme={'twitter'}
            boxShadow={'md'}
            placeholder={t('common_min_number_ph')!}/>
        </FormControl>

        <FormControl>
          <FormLabel>{t('common_max_number_label')}</FormLabel>

          <Input
            onChange={(e) => updateValue('max', e)}
            value={settingsStore.settings.maxValue}
            type={'number'}
            colorScheme={'twitter'}
            boxShadow={'md'}
            placeholder={t('common_max_number_ph')!}/>
        </FormControl>
        {/* eslint-enable */}
      </Stack>
    </Stack>
  );
});

export default NumbersRangeControls;
