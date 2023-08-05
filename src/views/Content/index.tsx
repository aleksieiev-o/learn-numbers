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

export enum EnumSpeechStatus {
  STOPPED,
  STARTED,
}

const Content: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const {start, stop} = useContext(SpeechUtteranceContext);
  const [speechStatus, setSpeechStatus] = useState<EnumSpeechStatus>(EnumSpeechStatus.STOPPED);
  const [currentRandomNumberId, setCurrentRandomNumberId] = useState<string>('');
  const [currentRandomNumber, setCurrentRandomNumber] = useState<number | null>(null);

  const speech = () => {
    if (currentRandomNumber) {
      start({
        text: currentRandomNumber.toString(),
        langURI: settingsStore.localeSpeechSettings.speechLocale,
        volume: settingsStore.remoteSpeechSettings.speechVolume,
        rate: settingsStore.remoteSpeechSettings.speechRate,
        pitch: settingsStore.remoteSpeechSettings.speechPitch,
      });
    }
  };

  useEffect(() => {
    speech();
  }, [currentRandomNumberId]);

  const speechRandomNumber = () => {
    const {speechMinValue, speechMaxValue} = settingsStore.remoteSpeechSettings.speechRangeValue;
    const randomNumber = createRandomNumber(speechMinValue, speechMaxValue);
    setCurrentRandomNumberId(randomNumber.id);
    setCurrentRandomNumber(randomNumber.value);
  };

  const startSpeechProcess = () => {
    setSpeechStatus(EnumSpeechStatus.STARTED);
    speechRandomNumber();
  };

  const stopSpeechProcess = () => {
    stop();
    setCurrentRandomNumber(null);
    setSpeechStatus(EnumSpeechStatus.STOPPED);
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
