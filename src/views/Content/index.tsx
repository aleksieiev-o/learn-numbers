import React, { FC, ReactElement, RefObject, useContext, useEffect, useState } from 'react';
import { Container, Stack, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button } from '@chakra-ui/react';
import NumbersRangeControls from './NumbersRangeControls';
import SpeechPropsControls from './SpeechPropsControls';
import ActionControls from './ActionControls';
import UserCheckControls from './UserCheckControls';
import { createRandomNumber } from '../../utils/createRandomNumber';
import { useSettingsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import { SpeechUtteranceContext } from '../../Providers/SpeechUtteranceContext.provider';

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
  const [currentRandomNumber, setCurrentRandomNumber] = useState<number | null>(null);

  const speech = () => {
    if (currentRandomNumber) {
      start({
        text: currentRandomNumber.toString(),
        langURI: settingsStore.speechLocale,
      });
    }
  };

  useEffect(() => {
    speech();
  }, [currentRandomNumber]);

  const speechRandomNumber = () => {
    const randomNumber = createRandomNumber(settingsStore.minValue, settingsStore.maxValue);
    setCurrentRandomNumber(randomNumber);
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
          <Drawer
            isOpen={isOpenSettings}
            placement={'right'}
            size={'md'}
            onClose={onCloseSettings}
            initialFocusRef={initElementRef}
            finalFocusRef={settingsButtonRef}
            autoFocus={true}>
            <DrawerOverlay/>

            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Settings</DrawerHeader>

              <DrawerBody>
                <Stack spacing={6}>
                  <NumbersRangeControls initElementRef={initElementRef}/>

                  <SpeechPropsControls/>
                </Stack>
              </DrawerBody>

              <DrawerFooter>
                <Button variant='outline' onClick={onCloseSettings}>Close</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

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
