import React, { FC, ReactElement } from 'react';
import { APP_NAME } from '../../utils/constants';
import { Heading, Icon, IconButton, Stack, useColorMode } from '@chakra-ui/react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ColorMode } from '../../theme';

const Header: FC = (): ReactElement => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack
      as={'header'}
      direction={'row'}
      w={'full'}
      alignItems={'center'}
      justifyContent={'space-between'}
      boxShadow={'md'}
      p={4}>
      <Heading as={'h4'} color={'cyan.600'} cursor={'default'}>{APP_NAME}</Heading>

      <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={6}>
        <IconButton
          onClick={toggleColorMode}
          colorScheme={'gray'}
          variant={'outline'}
          title={colorMode === ColorMode.LIGHT ? 'Set dark theme' : 'Set light theme'}
          aria-label={colorMode === ColorMode.LIGHT ? 'Set dark theme' : 'Set light theme'}
          icon={<Icon as={colorMode === ColorMode.LIGHT ? DarkModeIcon : LightModeIcon}/>}/>
      </Stack>
    </Stack>
  );
};

export default Header;
