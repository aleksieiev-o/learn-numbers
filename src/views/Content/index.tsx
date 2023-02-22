import React, { FC, ReactElement, RefObject } from 'react';
import { Container, Stack, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button } from '@chakra-ui/react';
import NumbersRangeControls from './NumbersRangeControls';
import SpeechPropsControls from './SpeechPropsControls';
import ActionControls from './ActionControls';
import UserCheckControls from './UserCheckControls';

interface Props {
  settingsButtonRef: RefObject<HTMLButtonElement>;
  initElementRef: RefObject<HTMLInputElement>;
  isOpenSettings: boolean;
  onCloseSettings: () => void;
}

const Content: FC<Props> = (props): ReactElement => {
  const {settingsButtonRef, initElementRef, isOpenSettings, onCloseSettings} = props;

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

          <ActionControls/>

          <UserCheckControls/>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Content;
