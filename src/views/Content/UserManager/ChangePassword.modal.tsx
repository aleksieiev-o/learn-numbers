import React, {FC, ReactElement} from 'react';
import {observer} from 'mobx-react-lite';
import {useAuthorizationStore} from '../../../store/hooks';
import {useTranslation} from 'react-i18next';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: FC<Props> = observer((props): ReactElement => {
  const { isOpen, onClose } = props;
  const authorizationStore = useAuthorizationStore();
  const { t } = useTranslation(['common']);

  return (
    <div>ChangePassword.modal</div>
  );
});

export default ChangePasswordModal;
