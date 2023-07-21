import React, { FC, ReactElement, RefObject } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Stack, useDisclosure
} from '@chakra-ui/react';
import NumbersRangeControls from './NumbersRangeControls';
import SpeechPropsControls from './SpeechPropsControls';
import { useTranslation } from 'react-i18next';
import AppSettingsControls from './AppSettingsControls';
import LogoutIcon from '@mui/icons-material/Logout';
import ActionConfirmationModal, {ActionConfirmationModalType} from '../../components/ActionConfirmation.modal';
import {useAuthorizationStore} from '../../store/hooks';
import {observer} from 'mobx-react-lite';
import UserManager from './UserManager';

interface Props {
  settingsButtonRef: RefObject<HTMLButtonElement>;
  initElementRef: RefObject<HTMLInputElement>;
  isOpenSettings: boolean;
  onCloseSettings: () => void;
}

const ContentSettings: FC<Props> = observer((props): ReactElement => {
  const {settingsButtonRef, initElementRef, isOpenSettings, onCloseSettings} = props;
  const { t } = useTranslation(['common']);
  const { isOpen: isOpenSignOutModal, onOpen: onOpenSignOutModal, onClose: onCloseSignOutModal } = useDisclosure();
  const authorizationStore = useAuthorizationStore();

  const handleSignOut = async () => {
    await authorizationStore.singOut();
  };

  return (
    <>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <Drawer
        onClose={onCloseSettings}
        isOpen={isOpenSettings}
        initialFocusRef={initElementRef}
        finalFocusRef={settingsButtonRef}
        placement={'right'}
        size={'md'}
        autoFocus={true}>
        <DrawerOverlay/>

        <DrawerContent>
          <DrawerCloseButton/>

          <DrawerHeader as={'h4'} fontSize={24}>{t('common_settings_label')}</DrawerHeader>

          <DrawerBody>
            <Stack spacing={6}>
              <AppSettingsControls/>

              <NumbersRangeControls/>

              <SpeechPropsControls/>

              {
                authorizationStore.isAuth && <UserManager/>
              }
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} w={'full'} spacing={4}>
              {
                authorizationStore.isAuth && <Button
                  onClick={onOpenSignOutModal}
                  colorScheme={'orange'}
                  variant={'outline'}
                  boxShadow={'md'}
                  title={t('common_sign_out_btn_title')!}
                  leftIcon={<Icon as={LogoutIcon}/>}
                  mr={'auto'}>
                  {t('common_sign_out_btn')}
                </Button>
              }

              <Button
                onClick={onCloseSettings}
                variant={'outline'}
                boxShadow={'md'}
                title={t('common_close_btn')!}>
                {t('common_close_btn')}
              </Button>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {
        isOpenSignOutModal &&
        <ActionConfirmationModal
          isOpen={isOpenSignOutModal}
          onClose={onCloseSignOutModal}
          handleAction={handleSignOut}
          modalType={ActionConfirmationModalType.WARNING}
          modalTitle={t('common_sign_out_confirm_title')!}
          modalDescription={t('common_sign_out_confirm_message')!}
          modalQuestion={t('common_confirm_question')!}
          buttonText={t('common_sign_out_btn_title')!}/>
      }
      {/* eslint-enable */}
    </>
  );
});

export default ContentSettings;
