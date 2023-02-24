import React, { FC, ReactElement, useContext } from 'react';
import { FormControl, FormLabel, Heading, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text } from '@chakra-ui/react';
import { SpeechUtteranceContext } from '../../Providers/SpeechUtteranceContext.provider';
import { observer } from 'mobx-react-lite';
import { useSettingsStore } from '../../store/hooks';

const SpeechPropsControls: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const { voicesList } = useContext(SpeechUtteranceContext);

  return (
    <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'space-between'} spacing={4}>
      <Heading as={'h6'} fontSize={20}>Speech properties</Heading>

      <FormControl>
        <FormLabel>Speech language</FormLabel>

        <Select
          onChange={(e) => settingsStore.updateSpeechLocale(e.target.value)}
          value={settingsStore.settings.speechLocale}>
          {
            voicesList.map((voice) => <option value={voice.voiceURI} key={voice.voiceURI}>{voice.name}</option>)
          }
        </Select>
      </FormControl>

      <FormControl>
        <Stack direction={'row'}>
          <FormLabel>Speech volume:</FormLabel>
          <Text as={'strong'}>{settingsStore.settings.speechVolume}</Text>
        </Stack>

        <Slider
          onChangeEnd={(value) => settingsStore.updateSpeechVolumeValue(value)}
          aria-label='speech-volume'
          defaultValue={settingsStore.settings.speechVolume}
          step={0.1}
          min={0}
          max={1}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>

          <SliderThumb bgColor={'teal.600'}/>
        </Slider>
      </FormControl>

      <FormControl>
        <Stack direction={'row'}>
          <FormLabel>Speech rate:</FormLabel>
          <Text as={'strong'}>{settingsStore.settings.speechRate}</Text>
        </Stack>

        <Slider
          onChangeEnd={(value) => settingsStore.updateSpeechRateValue(value)}
          aria-label='speech-rate'
          defaultValue={settingsStore.settings.speechRate}
          step={0.1}
          min={0.1}
          max={10}>
          <SliderTrack>
            <SliderFilledTrack/>
          </SliderTrack>

          <SliderThumb bgColor={'teal.600'}/>
        </Slider>
      </FormControl>

      <FormControl>
        <Stack direction={'row'}>
          <FormLabel>Speech pitch:</FormLabel>
          <Text as={'strong'}>{settingsStore.settings.speechPitch}</Text>
        </Stack>

        <Slider
          onChangeEnd={(value) => settingsStore.updateSpeechPitchValue(value)}
          aria-label='speech-pitch'
          defaultValue={settingsStore.settings.speechPitch}
          step={0.1}
          min={0}
          max={2}>
          <SliderTrack>
            <SliderFilledTrack/>
          </SliderTrack>

          <SliderThumb bgColor={'teal.600'}/>
        </Slider>
      </FormControl>
    </Stack>
  );
});

export default SpeechPropsControls;
