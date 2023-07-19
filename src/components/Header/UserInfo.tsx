import React, {FC, ReactElement} from 'react';
import {observer} from 'mobx-react-lite';
import {Avatar, Icon, Stack, Text, Hide} from '@chakra-ui/react';
import {useAuthorizationStore} from '../../store/hooks';
import PersonIcon from '@mui/icons-material/Person';

const UserInfo: FC = observer((): ReactElement => {
  const authorizationStore = useAuthorizationStore();

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4} overflow={'hidden'}>
      <Hide breakpoint={'(max-width: 845px)'}>
        <Stack direction={'column'} alignItems={'flex-end'} justifyContent={'center'} spacing={0} overflow={'hidden'}>
          <Text
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
            w={'full'}
            textAlign={'end'}
            fontWeight={700}
            fontSize={14}>
            {authorizationStore.user.displayName ? authorizationStore.user.displayName : authorizationStore.user.uid}
          </Text>

          <Text
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
            w={'full'}
            textAlign={'end'}
            fontSize={16}>
            {authorizationStore.user.email}
          </Text>
        </Stack>
      </Hide>

      <Avatar
        name={authorizationStore.user.displayName ? authorizationStore.user.displayName : undefined}
        src={undefined}
        bg={'telegram.600'}
        icon={<Icon as={PersonIcon}/>}/>
    </Stack>
  );
});

export default UserInfo;
