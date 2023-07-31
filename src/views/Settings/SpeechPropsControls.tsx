import React, { FC, ReactElement, useContext } from 'react';
import { FormControl, FormLabel, Heading, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text } from '@chakra-ui/react';
import { SpeechUtteranceContext } from '../../providers/SpeechUtteranceContext.provider';
import { observer } from 'mobx-react-lite';
import { useSettingsStore } from '../../store/hooks';
import { useTranslation } from 'react-i18next';

const SpeechPropsControls: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const { voicesList } = useContext(SpeechUtteranceContext);
  const { t } = useTranslation(['common']);

  return (
    <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'space-between'} spacing={4}>
      <Heading as={'h6'} fontSize={20}>{t('common_speech_props_label')}</Heading>

      <FormControl>
        <FormLabel>{t('common_speech_lang_label')}</FormLabel>

        <Select
          onChange={(e) => settingsStore.updateSpeechLocale(e.target.value)}
          value={settingsStore.localeSpeechSettings.speechLocale}
          boxShadow={'md'}>
          {
            voicesList.map((voice) => <option value={voice.voiceURI} key={voice.voiceURI}>{voice.name}</option>)
          }
        </Select>
      </FormControl>

      <FormControl>
        <Stack direction={'row'}>
          <FormLabel>{t('common_speech_volume_label')}:</FormLabel>
          <Text as={'strong'}>{settingsStore.remoteSpeechSettings.speechVolume}</Text>
        </Stack>

        <Slider
          onChangeEnd={(value) => settingsStore.updateSpeechVolumeValue(value)}
          aria-label='speech-volume'
          defaultValue={settingsStore.remoteSpeechSettings.speechVolume}
          step={0.1}
          min={0}
          max={1}>
          <SliderTrack>
            <SliderFilledTrack/>
          </SliderTrack>

          <SliderThumb bgColor={'twitter.600'}/>
        </Slider>
      </FormControl>

      <FormControl>
        <Stack direction={'row'}>
          <FormLabel>{t('common_speech_rate_label')}:</FormLabel>
          <Text as={'strong'}>{settingsStore.remoteSpeechSettings.speechRate}</Text>
        </Stack>

        <Slider
          onChangeEnd={(value) => settingsStore.updateSpeechRateValue(value)}
          aria-label='speech-rate'
          defaultValue={settingsStore.remoteSpeechSettings.speechRate}
          step={0.1}
          min={0.1}
          max={2}>
          <SliderTrack>
            <SliderFilledTrack/>
          </SliderTrack>

          <SliderThumb bgColor={'twitter.600'}/>
        </Slider>
      </FormControl>

      <FormControl>
        <Stack direction={'row'}>
          <FormLabel>{t('common_speech_pitch_label')}:</FormLabel>
          <Text as={'strong'}>{settingsStore.remoteSpeechSettings.speechPitch}</Text>
        </Stack>

        <Slider
          onChangeEnd={(value) => settingsStore.updateSpeechPitchValue(value)}
          aria-label='speech-pitch'
          defaultValue={settingsStore.remoteSpeechSettings.speechPitch}
          step={0.1}
          min={0}
          max={2}>
          <SliderTrack>
            <SliderFilledTrack/>
          </SliderTrack>

          <SliderThumb bgColor={'twitter.600'}/>
        </Slider>
      </FormControl>
    </Stack>
  );
});

export default SpeechPropsControls;
