import React, { FC, ReactElement } from 'react';
import {
  Button,
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
import AppLayout from '../../layouts/App.layout';
import MainLayout from '../../layouts/Main.layout';
import {useNavigate} from 'react-router-dom';
import {EnumRouter} from '../../Router';
import ContainerLayout from '../../layouts/Container.layout';

const Settings: FC = observer((): ReactElement => {
  const { t } = useTranslation(['common']);
  const { isOpen: isOpenSignOutModal, onOpen: onOpenSignOutModal, onClose: onCloseSignOutModal } = useDisclosure();
  const authorizationStore = useAuthorizationStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authorizationStore.singOut();
    await navigate(EnumRouter.MAIN);
  };

  return (
    <AppLayout>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <MainLayout>
        <>
          <ContainerLayout>
            <Stack direction={'column'} alignItems={'flex-start'} justifyContent={'center'} w={'full'} spacing={6} pb={4}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} w={'full'} spacing={6}>
                <Button
                  onClick={() => navigate(EnumRouter.MAIN)}
                  colorScheme={'gray'}
                  variant={'outline'}
                  title={t('common_back_btn_title')!}>
                  {t('common_back_btn_title')}
                </Button>
              </Stack>

              <AppSettingsControls/>

              <NumbersRangeControls/>

              <SpeechPropsControls/>

              {
                authorizationStore.isAuth && <UserManager/>
              }

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
            </Stack>
          </ContainerLayout>

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
        </>
        {/* eslint-enable */}
      </MainLayout>
    </AppLayout>
  );
});

export default Settings;
