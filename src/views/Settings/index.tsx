import React, { FC, ReactElement } from 'react';
import {
  Button,
  Stack
} from '@chakra-ui/react';
import NumbersRangeControls from './NumbersRangeControls';
import SpeechPropsControls from './SpeechPropsControls';
import { useTranslation } from 'react-i18next';
import {useAuthorizationStore} from '../../store/hooks';
import {observer} from 'mobx-react-lite';
import UserManager from './UserManager';
import AppLayout from '../../layouts/App.layout';
import MainLayout from '../../layouts/Main.layout';
import {EnumRouter} from '../../Router';
import ContainerLayout from '../../layouts/Container.layout';
import {useChangeRoute} from '../../hooks/useChangeRoute';

const Settings: FC = observer((): ReactElement => {
  const { t } = useTranslation(['common']);
  const authorizationStore = useAuthorizationStore();
  const {changeRoute} = useChangeRoute();

  return (
    <AppLayout>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <MainLayout>
        <>
          <ContainerLayout>
            <Stack direction={'column'} alignItems={'flex-start'} justifyContent={'center'} w={'full'} spacing={6} pb={4}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} w={'full'} spacing={6}>
                <Button
                  onClick={() => changeRoute(EnumRouter.MAIN)}
                  colorScheme={'gray'}
                  variant={'outline'}
                  boxShadow={'md'}
                  title={t('common_back_btn_title')!}>
                  {t('common_back_btn_title')}
                </Button>
              </Stack>

              <NumbersRangeControls/>

              <SpeechPropsControls/>

              {
                authorizationStore.isAuth && <UserManager/>
              }
            </Stack>
          </ContainerLayout>
        </>
        {/* eslint-enable */}
      </MainLayout>
    </AppLayout>
  );
});

export default Settings;
