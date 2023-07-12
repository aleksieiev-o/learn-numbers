import React, { FC, ReactElement, useMemo, useState } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Heading, Icon, IconButton, Input, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useSettingsStore } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';

const NumbersRangeControls: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const [minValue, setMinValue] = useState<string>(String(settingsStore.speechSettings.speechMinValue));
  const [maxValue, setMaxValue] = useState<string>(String(settingsStore.speechSettings.speechMaxValue));
  const { t } = useTranslation(['common']);

  const isMinValueValid = useMemo(() => {
    return new RegExp(/^\d+$/).test(minValue.toString());
  }, [minValue]);

  const isMaxValueValid = useMemo(() => {
    return new RegExp(/^\d+$/).test(maxValue.toString());
  }, [maxValue]);

  const updateMinValue = async () => {
    if (isMinValueValid) {
      await settingsStore.updateSpeechMinValue(parseInt(minValue, 10) || 0);
    }
  };

  const updateMaxValue = async () => {
    if (isMaxValueValid) {
      await settingsStore.updateSpeechMinValue(parseInt(maxValue, 10) || 0);
    }
  };

  return (
    <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'space-between'}>
      <Heading as={'h6'} fontSize={20}>{t('common_num_range_label')}</Heading>

      <Stack direction={'column'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={4}>
        {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
        <FormControl isRequired={true}>
          <Stack direction={'row'} alignItems={'end'} justifyContent={'center'} w={'full'} spacing={6}>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} w={'full'} spacing={0}>
              <FormLabel>{t('common_min_number_label')}</FormLabel>

              <Input
                onChange={(e) => setMinValue(e.target.value)}
                value={minValue}
                isInvalid={!isMinValueValid}
                type={'text'}
                colorScheme={'twitter'}
                boxShadow={'md'}
                placeholder={t('common_min_number_ph')!}/>

              {
                !isMinValueValid && <FormErrorMessage>
                  {t('common_error_text_number_supported')!}
                </FormErrorMessage>
              }
            </Stack>

            <IconButton
              onClick={updateMinValue}
              colorScheme={'telegram'}
              variant={'outline'}
              boxShadow={'md'}
              title={t('common_save_btn_title')!}
              aria-label={'Save'}
              icon={<Icon as={CheckIcon}/>}/>
          </Stack>
        </FormControl>

        <FormControl isRequired={true}>
          <Stack direction={'row'} alignItems={'end'} justifyContent={'center'} w={'full'} spacing={6}>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} w={'full'} spacing={0}>
              <FormLabel>{t('common_max_number_label')}</FormLabel>

              <Input
                onChange={(e) => setMaxValue(e.target.value)}
                value={maxValue}
                isInvalid={!isMaxValueValid}
                type={'text'}
                colorScheme={'twitter'}
                boxShadow={'md'}
                placeholder={t('common_max_number_ph')!}/>

              {
                !isMaxValueValid && <FormErrorMessage>
                  {t('common_error_text_number_supported')!}
                </FormErrorMessage>
              }
            </Stack>

            <IconButton
              onClick={updateMaxValue}
              colorScheme={'telegram'}
              variant={'outline'}
              boxShadow={'md'}
              title={t('common_save_btn_title')!}
              aria-label={'Save'}
              icon={<Icon as={CheckIcon}/>}/>
          </Stack>
        </FormControl>
        {/* eslint-enable */}
      </Stack>
    </Stack>
  );
});

export default NumbersRangeControls;
