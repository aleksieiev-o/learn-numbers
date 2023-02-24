import React, { FC, ReactElement } from 'react';
import { Button, Grid, GridItem, Icon } from '@chakra-ui/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import { SpeechStatus } from './index';

interface Props {
  speechStatus: SpeechStatus;
  startSpeechProcess: () => void;
  stopSpeechProcess: () => void;
  replayLastNumber: () => void;
}

const ActionControls: FC<Props> = (props): ReactElement => {
  const {startSpeechProcess, stopSpeechProcess, replayLastNumber, speechStatus} = props;

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={6} w={'full'}>
      <GridItem>
        <Button
          onClick={startSpeechProcess}
          w={'full'}
          isLoading={speechStatus === SpeechStatus.STARTED}
          colorScheme={'green'}
          variant={'outline'}
          title={speechStatus === SpeechStatus.STOPPED ? 'Start' : ''}
          leftIcon={<Icon as={PlayArrowIcon}/>}>
          Start
        </Button>
      </GridItem>

      <GridItem>
        <Button
          onClick={replayLastNumber}
          w={'full'}
          isDisabled={speechStatus === SpeechStatus.STOPPED}
          colorScheme={'orange'}
          variant={'outline'}
          title={speechStatus === SpeechStatus.STARTED ? 'Replay last number' : ''}
          leftIcon={<Icon as={ReplayIcon}/>}>
          Replay last number
        </Button>
      </GridItem>

      <GridItem>
        <Button
          onClick={stopSpeechProcess}
          w={'full'}
          isDisabled={speechStatus === SpeechStatus.STOPPED}
          colorScheme={'red'}
          variant={'outline'}
          title={speechStatus === SpeechStatus.STARTED ? 'Stop' : ''}
          leftIcon={<Icon as={StopIcon}/>}>
          Stop
        </Button>
      </GridItem>
    </Grid>
  );
};

export default ActionControls;
