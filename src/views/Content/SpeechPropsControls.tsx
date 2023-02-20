import React, { FC, ReactElement, useContext } from 'react';
import { FormControl, FormLabel, Heading, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack } from '@chakra-ui/react';
import { SpeechUtteranceContext } from '../../Providers/SpeechUtteranceContext.provider';

const SpeechPropsControls: FC = (): ReactElement => {
  const { voicesList } = useContext(SpeechUtteranceContext);

  return (
    <Stack
      direction={'column'}
      w={'full'}
      alignItems={'flex-start'}
      justifyContent={'space-between'}
      spacing={4}>
      <Heading as={'h6'} fontSize={20}>Speech properties</Heading>

      <FormControl>
        <FormLabel>Speech language</FormLabel>

        <Select placeholder={'Select speech language'}>
          {
            voicesList.map((voice) => <option value={voice.lang} key={voice.voiceURI}>{voice.name}</option>)
          }
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Speech volume</FormLabel>

        <Slider aria-label='speech-volume' defaultValue={0.3} step={0.1} min={0} max={1}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>

          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel>Speech rate</FormLabel>

        <Slider aria-label='speech-rate' defaultValue={0.3} step={0.1} min={0} max={1}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>

          <SliderThumb />
        </Slider>
      </FormControl>

      <FormControl>
        <FormLabel>Speech pitch</FormLabel>

        <Slider aria-label='speech-pitch' defaultValue={0.3} step={0.1} min={0} max={1}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>

          <SliderThumb />
        </Slider>
      </FormControl>
    </Stack>
  );
};

export default SpeechPropsControls;
