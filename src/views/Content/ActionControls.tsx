import React, { FC, ReactElement } from 'react';
import { Button, Grid, GridItem, Icon } from '@chakra-ui/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';

const ActionControls: FC = (): ReactElement => {
  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={6} w={'full'}>
      <GridItem>
        <Button w={'full'} isLoading={false} colorScheme={'green'} variant={'outline'} leftIcon={<Icon as={PlayArrowIcon}/>}>Start</Button>
      </GridItem>

      <GridItem>
        <Button w={'full'} isDisabled={true} colorScheme={'orange'} variant={'outline'} leftIcon={<Icon as={ReplayIcon}/>}>Replay last number</Button>
      </GridItem>

      <GridItem>
        <Button w={'full'} isDisabled={true} colorScheme={'red'} variant={'outline'} leftIcon={<Icon as={StopIcon}/>}>Stop</Button>
      </GridItem>
    </Grid>
  );
};

export default ActionControls;
