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

const UserManager: FC = observer((): ReactElement => {
  const { t } = useTranslation(['common']);
  const { isOpen: isOpenChangeUserProfileModal, onOpen: onOpenChangeUserProfileModal, onClose: onCloseChangeUserProfileModal } = useDisclosure();
  const { isOpen: isOpenChangeEmailModal, onOpen: onOpenChangeEmailModal, onClose: onCloseChangeEmailModal } = useDisclosure();
  const { isOpen: isOpenChangePasswordModal, onOpen: onOpenChangePasswordModal, onClose: onCloseChangePasswordModal } = useDisclosure();

  return (
    <>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} spacing={4}>
        <Heading as={'h6'} fontSize={20}>{t('common_user_data_title')}</Heading>

        <Button
          onClick={onOpenChangeUserProfileModal}
          variant={'outline'}
          colorScheme={'gray'}
          title={t('common_btn_change_dn')!}
          leftIcon={<Icon as={PersonIcon}/>}>
          {t('common_btn_change_dn')}
        </Button>

        <Button
          onClick={onOpenChangeEmailModal}
          variant={'outline'}
          colorScheme={'gray'}
          title={t('common_btn_change_email')!}
          leftIcon={<Icon as={EmailIcon}/>}>
          {t('common_btn_change_email')}
        </Button>

        <Button
          onClick={onOpenChangePasswordModal}
          variant={'outline'}
          colorScheme={'gray'}
          title={t('common_btn_change_password')!}
          leftIcon={<Icon as={VpnKeyIcon}/>}>
          {t('common_btn_change_password')}
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
      {/* eslint-enable */}
    </>
  );
});

export default UserManager;
