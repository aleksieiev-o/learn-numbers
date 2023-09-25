import React, {FC, ReactElement, useContext} from 'react';
import {
  FormControl,
  FormLabel,
  Grid, GridItem,
  Heading,
  Select,
  Stack,
} from '@chakra-ui/react';
import { SpeechUtteranceContext } from '../../../providers/SpeechUtteranceContext.provider';
import { observer } from 'mobx-react-lite';
import { useSettingsStore } from '../../../store/hooks';
import { useTranslation } from 'react-i18next';
import SpeechControlItem from './SpeechControlItem';

const SpeechPropsControls: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const { voicesList } = useContext(SpeechUtteranceContext);
  const { t } = useTranslation(['common']);

  return (
    <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'space-between'} spacing={6}>
      <Heading as={'h6'} fontSize={20}>{t('common_speech_props_label')}</Heading>

      <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={{ md: 6, base: 4 }} w={'full'} alignItems={'flex-start'}>
        <GridItem>
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
        </GridItem>
      </Grid>

      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={{ md: 6, base: 4 }} w={'full'} alignItems={'flex-start'}>
        <SpeechControlItem
          speechValueType={'volume'}
          label={t('common_speech_volume_label')!}
          speechValue={settingsStore.remoteSpeechSettings.speechVolume}/>

        <SpeechControlItem
          speechValueType={'rate'}
          label={t('common_speech_rate_label')!}
          speechValue={settingsStore.remoteSpeechSettings.speechRate}/>

        <SpeechControlItem
          speechValueType={'pitch'}
          label={t('common_speech_pitch_label')!}
          speechValue={settingsStore.remoteSpeechSettings.speechPitch}/>
      </Grid>
      {/* eslint-enable */}
    </Stack>
  );
});

export default SpeechPropsControls;
