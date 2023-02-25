import React, { FC, ReactElement } from 'react';
import { Button, Grid, GridItem, Icon } from '@chakra-ui/react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import { SpeechStatus } from './index';
import { useTranslation } from 'react-i18next';

interface Props {
  speechStatus: SpeechStatus;
  startSpeechProcess: () => void;
  stopSpeechProcess: () => void;
  replayLastNumber: () => void;
}

const ActionControls: FC<Props> = (props): ReactElement => {
  const {startSpeechProcess, stopSpeechProcess, replayLastNumber, speechStatus} = props;
  const { t } = useTranslation(['common']);

  return (
    <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={6} w={'full'}>
      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <GridItem>
        <Button
          onClick={startSpeechProcess}
          w={'full'}
          isLoading={speechStatus === SpeechStatus.STARTED}
          colorScheme={'green'}
          variant={'outline'}
          boxShadow={'md'}
          title={speechStatus === SpeechStatus.STOPPED ? t('common_start_btn_title')! : ''}
          leftIcon={<Icon as={PlayArrowIcon}/>}>
          {t('common_start_btn_title')}
        </Button>
      </GridItem>

      <GridItem>
        <Button
          onClick={replayLastNumber}
          w={'full'}
          isDisabled={speechStatus === SpeechStatus.STOPPED}
          colorScheme={'orange'}
          variant={'outline'}
          boxShadow={'md'}
          title={speechStatus === SpeechStatus.STARTED ? t('common_replay_btn_title')! : ''}
          leftIcon={<Icon as={ReplayIcon}/>}>
          {t('common_replay_btn_title')}
        </Button>
      </GridItem>

      <GridItem>
        <Button
          onClick={stopSpeechProcess}
          w={'full'}
          isDisabled={speechStatus === SpeechStatus.STOPPED}
          colorScheme={'red'}
          variant={'outline'}
          boxShadow={'md'}
          title={speechStatus === SpeechStatus.STARTED ? t('common_stop_btn_title')! : ''}
          leftIcon={<Icon as={StopIcon}/>}>
          {t('common_stop_btn_title')}
        </Button>
      </GridItem>
      {/* eslint-enable */}
    </Grid>
  );
};

export default ActionControls;
