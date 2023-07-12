import React, { FC, ReactElement, RefObject, useContext, useEffect, useState } from 'react';
import { Container, Stack } from '@chakra-ui/react';
import ActionControls from './ActionControls';
import UserCheckControls from './UserCheckControls';
import { createRandomNumber } from '../../utils/createRandomNumber';
import { useSettingsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { SpeechUtteranceContext } from '../../providers/SpeechUtteranceContext.provider';
import ContentSettings from './ContentSettings';

export enum SpeechStatus {
  STOPPED,
  STARTED,
}

interface Props {
  settingsButtonRef: RefObject<HTMLButtonElement>;
  initElementRef: RefObject<HTMLInputElement>;
  isOpenSettings: boolean;
  onCloseSettings: () => void;
}

const Content: FC<Props> = observer((props): ReactElement => {
  const {settingsButtonRef, initElementRef, isOpenSettings, onCloseSettings} = props;
  const settingsStore = useSettingsStore();
  const {start, stop} = useContext(SpeechUtteranceContext);
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>(SpeechStatus.STOPPED);
  const [currentRandomNumberId, setCurrentRandomNumberId] = useState<string>('');
  const [currentRandomNumber, setCurrentRandomNumber] = useState<number | null>(null);

  const speech = () => {
    if (currentRandomNumber) {
      start({
        text: currentRandomNumber.toString(),
        langURI: settingsStore.speechSettings.speechLocale,
        volume: settingsStore.speechSettings.speechVolume,
        rate: settingsStore.speechSettings.speechRate,
        pitch: settingsStore.speechSettings.speechPitch,
      });
    }
  };

  useEffect(() => {
    speech();
  }, [currentRandomNumberId]);

  const speechRandomNumber = () => {
    const randomNumber = createRandomNumber(settingsStore.speechSettings.speechMinValue, settingsStore.speechSettings.speechMaxValue);
    setCurrentRandomNumberId(randomNumber.id);
    setCurrentRandomNumber(randomNumber.value);
  };

  const startSpeechProcess = () => {
    setSpeechStatus(SpeechStatus.STARTED);
    speechRandomNumber();
  };

  const stopSpeechProcess = () => {
    stop();
    setCurrentRandomNumber(null);
    setSpeechStatus(SpeechStatus.STOPPED);
  };

  const replayLastNumber = () => {
    speech();
  };

  return (
    <Stack as={'main'} w={'full'} h={'full'} overflowY={'auto'}>
      <Container centerContent={true} w={'full'} h={'full'} maxW={'6xl'} p={4}>
        <Stack w={'full'} h={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={4}>
          <ContentSettings
            settingsButtonRef={settingsButtonRef}
            initElementRef={initElementRef}
            isOpenSettings={isOpenSettings}
            onCloseSettings={onCloseSettings}/>

          <ActionControls
            speechStatus={speechStatus}
            startSpeechProcess={startSpeechProcess}
            stopSpeechProcess={stopSpeechProcess}
            replayLastNumber={replayLastNumber}/>

          <UserCheckControls
            speechStatus={speechStatus}
            currentRandomNumber={currentRandomNumber}
            speechRandomNumber={speechRandomNumber}/>
        </Stack>
      </Container>
    </Stack>
  );
});

export default Content;
