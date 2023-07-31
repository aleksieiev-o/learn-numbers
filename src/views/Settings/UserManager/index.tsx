import React, {FC, ReactElement} from 'react';
import {Button, Heading, Icon, Stack, useDisclosure} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {observer} from 'mobx-react-lite';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ChangeUserProfileModal from './ChangeUserProfile.modal';
import ChangeEmailModal from './ChangeEmail.modal';
import ChangePasswordModal from './ChangePassword.modal';
import LogoutIcon from '@mui/icons-material/Logout';
import ActionConfirmationModal, {EnumActionConfirmationModalType} from '../../../components/ActionConfirmation.modal';
import {useAuthorizationStore} from '../../../store/hooks';
import {useNavigate} from 'react-router-dom';
import {EnumRouter} from '../../../Router';

const UserManager: FC = observer((): ReactElement => {
  const { t } = useTranslation(['common']);
  const { isOpen: isOpenChangeUserProfileModal, onOpen: onOpenChangeUserProfileModal, onClose: onCloseChangeUserProfileModal } = useDisclosure();
  const { isOpen: isOpenChangeEmailModal, onOpen: onOpenChangeEmailModal, onClose: onCloseChangeEmailModal } = useDisclosure();
  const { isOpen: isOpenChangePasswordModal, onOpen: onOpenChangePasswordModal, onClose: onCloseChangePasswordModal } = useDisclosure();
  const { isOpen: isOpenSignOutModal, onOpen: onOpenSignOutModal, onClose: onCloseSignOutModal } = useDisclosure();
  const authorizationStore = useAuthorizationStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authorizationStore.singOut();
    await navigate(EnumRouter.MAIN);
  };

  return (
    <>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={4}>
        <Heading as={'h6'} fontSize={20}>{t('common_user_data_title')}</Heading>

        <Button
          onClick={onOpenChangeUserProfileModal}
          variant={'outline'}
          colorScheme={'gray'}
          w={'full'}
          boxShadow={'md'}
          title={t('common_btn_change_dn')!}
          leftIcon={<Icon as={PersonIcon}/>}>
          {t('common_btn_change_dn')}
        </Button>

        <Button
          onClick={onOpenChangeEmailModal}
          variant={'outline'}
          colorScheme={'gray'}
          w={'full'}
          boxShadow={'md'}
          title={t('common_btn_change_email')!}
          leftIcon={<Icon as={EmailIcon}/>}>
          {t('common_btn_change_email')}
        </Button>

        <Button
          onClick={onOpenChangePasswordModal}
          variant={'outline'}
          colorScheme={'gray'}
          w={'full'}
          boxShadow={'md'}
          title={t('common_btn_change_password')!}
          leftIcon={<Icon as={VpnKeyIcon}/>}>
          {t('common_btn_change_password')}
        </Button>

        <Button
          onClick={onOpenSignOutModal}
          colorScheme={'orange'}
          variant={'outline'}
          w={'full'}
          boxShadow={'md'}
          title={t('common_sign_out_btn_title')!}
          leftIcon={<Icon as={LogoutIcon}/>}
          mr={'auto'}>
          {t('common_sign_out_btn')}
        </Button>
      </Stack>

      {
        isOpenChangeUserProfileModal && <ChangeUserProfileModal
          isOpen={isOpenChangeUserProfileModal}
          onClose={onCloseChangeUserProfileModal}/>
      }
      
      {
        isOpenChangeEmailModal && <ChangeEmailModal
          isOpen={isOpenChangeEmailModal}
          onClose={onCloseChangeEmailModal}/>
      }

      {
        isOpenChangePasswordModal && <ChangePasswordModal
          isOpen={isOpenChangePasswordModal}
          onClose={onCloseChangePasswordModal}/>
      }

      {
        isOpenSignOutModal &&
        <ActionConfirmationModal
          isOpen={isOpenSignOutModal}
          onClose={onCloseSignOutModal}
          handleAction={handleSignOut}
          modalType={EnumActionConfirmationModalType.WARNING}
          modalTitle={t('common_sign_out_confirm_title')!}
          modalDescription={t('common_sign_out_confirm_message')!}
          modalQuestion={t('common_confirm_question')!}
          buttonText={t('common_sign_out_btn_title')!}/>
      }
      {/* eslint-enable */}
    </>
  );
});

export default UserManager;
