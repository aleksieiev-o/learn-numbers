import React, { FC, ReactElement, RefObject } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack } from '@chakra-ui/react';
import NumbersRangeControls from './NumbersRangeControls';
import SpeechPropsControls from './SpeechPropsControls';
import { useTranslation } from 'react-i18next';

interface Props {
  settingsButtonRef: RefObject<HTMLButtonElement>;
  initElementRef: RefObject<HTMLInputElement>;
  isOpenSettings: boolean;
  onCloseSettings: () => void;
}

const ContentSettings: FC<Props> = (props): ReactElement => {
  const {settingsButtonRef, initElementRef, isOpenSettings, onCloseSettings} = props;
  const { t } = useTranslation(['common']);

  return (
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
        <DrawerCloseButton/>

        <DrawerHeader as={'h4'} fontSize={24}>{t('common_settings_label')}</DrawerHeader>

        <DrawerBody>
          <Stack spacing={6}>
            <NumbersRangeControls/>

            <SpeechPropsControls/>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant={'outline'}
            boxShadow={'md'}
            onClick={onCloseSettings}>
            {t('common_close_btn')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ContentSettings;
