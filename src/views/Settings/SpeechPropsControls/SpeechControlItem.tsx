import React, {FC, ReactElement, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
  FormControl,
  FormLabel, GridItem, Icon, IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text
} from '@chakra-ui/react';
import CheckIcon from '@mui/icons-material/Check';
import {useTranslation} from 'react-i18next';
import {useLoading} from '../../../hooks/useLoading';
import {useSettingsStore} from '../../../store/hooks';

interface Props {
  label: string;
  speechValueType: 'volume' | 'rate' | 'pitch';
  speechValue: number;
}

const SpeechControlItem: FC<Props> = observer((props): ReactElement => {
  const {speechValue, label, speechValueType} = props;
  const settingsStore = useSettingsStore();
  const {isLoading, setIsLoading} = useLoading();
  const [currentSpeechValue, setCurrentSpeechValue] = useState<number>(speechValue);
  const { t } = useTranslation(['common']);

  const handleUpdateSpeechValue = async () => {
    setIsLoading(true);

    switch (speechValueType) {
      case 'volume': await settingsStore.updateSpeechVolumeValue(currentSpeechValue); break;
      case 'rate': await settingsStore.updateSpeechRateValue(currentSpeechValue); break;
      case 'pitch': await settingsStore.updateSpeechPitchValue(currentSpeechValue); break;
      default: break;
    }

    setIsLoading(false);
  };

  return (
    <GridItem>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <FormControl>
        <Stack direction={'row'}>
          <FormLabel>{label}:</FormLabel>

          <Text as={'strong'}>{currentSpeechValue}</Text>
        </Stack>

        <Stack direction={'row'} alignItems={'baseline'} justifyContent={'flex-start'} spacing={6}>
          <Slider
            onChangeEnd={(value) => setCurrentSpeechValue(value)}
            aria-label='speech-volume'
            defaultValue={currentSpeechValue}
            step={0.1}
            min={0}
            max={1}>
            <SliderTrack>
              <SliderFilledTrack/>
            </SliderTrack>

            <SliderThumb bgColor={'twitter.600'}/>
          </Slider>

          <IconButton
            onClick={() => handleUpdateSpeechValue()}
            colorScheme={'telegram'}
            variant={'outline'}
            boxShadow={'md'}
            title={t('common_save_btn_title')!}
            aria-label={'Save'}
            isLoading={isLoading}
            icon={<Icon as={CheckIcon}/>}/>
        </Stack>
      </FormControl>
      {/* eslint-enable */}
    </GridItem>
  );
});

export default SpeechControlItem;
