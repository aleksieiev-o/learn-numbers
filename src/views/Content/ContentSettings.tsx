import React, { FC, ReactElement, RefObject } from 'react';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Stack } from '@chakra-ui/react';
import NumbersRangeControls from './NumbersRangeControls';
import SpeechPropsControls from './SpeechPropsControls';
import { useTranslation } from 'react-i18next';
import AppSettingsControls from './AppSettingsControls';

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
      onClose={onCloseSettings}
      isOpen={isOpenSettings}
      initialFocusRef={initElementRef}
      finalFocusRef={settingsButtonRef}
      placement={'right'}
      size={'md'}
      autoFocus={true}>
      <DrawerOverlay/>

      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <DrawerContent>
        <DrawerCloseButton/>

        <DrawerHeader as={'h4'} fontSize={24}>{t('common_settings_label')}</DrawerHeader>

        <DrawerBody>
          <Stack spacing={6}>
            <AppSettingsControls/>

            <NumbersRangeControls/>

            <SpeechPropsControls/>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button
            onClick={onCloseSettings}
            variant={'outline'}
            boxShadow={'md'}
            title={t('common_close_btn')!}>
            {t('common_close_btn')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
      {/* eslint-enable */}
    </Drawer>
  );
};

export default ContentSettings;
