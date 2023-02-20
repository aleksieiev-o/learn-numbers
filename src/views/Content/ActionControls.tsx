import React, { FC, ReactElement } from 'react';
import { Button, Icon, Stack } from '@chakra-ui/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';

const ActionControls: FC = (): ReactElement => {
  return (
    <Stack
      w={'full'}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={6}>
      <Button
        w={'full'}
        isLoading={false}
        colorScheme={'green'}
        variant={'outline'}
        leftIcon={<Icon as={PlayArrowIcon}/>}>
        Start
      </Button>

      <Button
        w={'full'}
        isDisabled={true}
        colorScheme={'orange'}
        variant={'outline'}
        leftIcon={<Icon as={ReplayIcon}/>}>
        Replay last number
      </Button>

      <Button
        w={'full'}
        isDisabled={true}
        colorScheme={'red'}
        variant={'outline'}
        leftIcon={<Icon as={StopIcon}/>}>
        Stop
      </Button>
    </Stack>
  );
};

export default ActionControls;
