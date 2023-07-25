import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import ActionControls from './ActionControls';
import UserCheckControls from './UserCheckControls';
import { createRandomNumber } from '../../utils/createRandomNumber';
import { useSettingsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { SpeechUtteranceContext } from '../../providers/SpeechUtteranceContext.provider';
import AppLayout from '../../layouts/App.layout';
import MainLayout from '../../layouts/Main.layout';
import ContainerLayout from '../../layouts/Container.layout';

export enum SpeechStatus {
  STOPPED,
  STARTED,
}

const Content: FC = observer((): ReactElement => {
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
    <AppLayout>
      <MainLayout>
        <ContainerLayout>
          <ActionControls
            speechStatus={speechStatus}
            startSpeechProcess={startSpeechProcess}
            stopSpeechProcess={stopSpeechProcess}
            replayLastNumber={replayLastNumber}/>

          <UserCheckControls
            speechStatus={speechStatus}
            currentRandomNumber={currentRandomNumber}
            speechRandomNumber={speechRandomNumber}/>
        </ContainerLayout>
      </MainLayout>
    </AppLayout>
  );
});

export default Content;
