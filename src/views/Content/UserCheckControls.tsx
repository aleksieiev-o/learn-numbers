import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Icon, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { object, string } from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SpeechStatus } from './index';
import { useFocus } from '../../hooks/useFocus';
import { useTranslation } from 'react-i18next';

enum ToastStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface Props {
  speechStatus: SpeechStatus;
  currentRandomNumber: number | null;
  speechRandomNumber: () => void;
}

interface CheckResultDto {
  answer: string;
}

const initialValues: CheckResultDto = {
  answer: '',
};

const validationSchema = object().shape({
  answer: string().required('Answer is required'),
});

const UserCheckControls: FC<Props> = (props): ReactElement => {
  const {speechStatus, currentRandomNumber, speechRandomNumber} = props;
  const {elementRef: answerInputRef, setFocus} = useFocus<HTMLInputElement>();
  const toast = useToast();
  const [isShowCorrectAnswer, setIsShowCorrectAnswer] = useState<boolean>(false);
  const { t } = useTranslation(['common']);

  const showToast = (status: ToastStatus) => {
    toast({
      duration: 2000,
      position: 'top-left',
      render: () => (
        <Box
          color={'white'}
          p={2} w={'40px'}
          h={'40px'}
          borderRadius={6}
          bg={status === ToastStatus.SUCCESS ? 'green.600' : 'red.600'}>
          <Icon as={status === ToastStatus.SUCCESS ? CheckIcon : CloseIcon}/>
        </Box>
      ),
    });
  };

  const submitHandler = async (payload: CheckResultDto, formikHelpers: FormikHelpers<CheckResultDto>) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const isCorrectAnswer = currentRandomNumber! === parseInt(payload.answer, 10);

    try {
      setIsShowCorrectAnswer(false);
    } catch (e) {
      console.warn(e);
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      showToast(isCorrectAnswer ? ToastStatus.SUCCESS : ToastStatus.ERROR);

      if (isCorrectAnswer) {
        formikHelpers.resetForm();
        formikHelpers.setSubmitting(false);
        speechRandomNumber();
        setFocus();
      }
    }
  };

  const showCorrectAnswer = () => {
    setIsShowCorrectAnswer(true);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
    validateOnBlur: true,
  });

  const { touched, dirty, errors, getFieldProps, resetForm } = formik;

  useEffect(() => {
    if (speechStatus === SpeechStatus.STOPPED || currentRandomNumber === null) {
      setIsShowCorrectAnswer(false);
      resetForm();
    }
  }, [speechStatus, currentRandomNumber]);

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100% '}}>
      <Stack w={'full'} direction={'column'} spacing={10}>
        {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
        <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={6} w={'full'} alignItems={'end'}>
          <GridItem>
            <FormControl isRequired={true} isReadOnly={false} isInvalid={touched.answer && dirty && Boolean(errors.answer)}>
              <FormLabel>{t('common_input_answer_label')}</FormLabel>

              <Input
                ref={answerInputRef}
                isDisabled={speechStatus === SpeechStatus.STOPPED}
                type={'number'}
                placeholder={t('common_input_answer_ph')!}
                {...getFieldProps('answer')}/>

              {touched.answer && dirty && Boolean(errors.answer) && <FormErrorMessage>{touched.answer && dirty && errors.answer}</FormErrorMessage>}
            </FormControl>
          </GridItem>

          <GridItem>
            <Button
              type={'submit'}
              isDisabled={speechStatus === SpeechStatus.STOPPED}
              colorScheme={'teal'}
              variant={'outline'}
              title={speechStatus === SpeechStatus.STARTED ? t('common_btn_answer_title')! : ''}
              leftIcon={<Icon as={CheckIcon}/>}
              w={'full'}>
              {t('common_btn_answer')}
            </Button>
          </GridItem>
        </Grid>

        <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={6} w={'full'} alignItems={'center'}>
          <GridItem>
            <Button
              onClick={showCorrectAnswer}
              isDisabled={speechStatus === SpeechStatus.STOPPED}
              colorScheme={'orange'}
              variant={'outline'}
              title={speechStatus === SpeechStatus.STARTED ? t('common_btn_correct_answer_title')! : ''}
              leftIcon={<Icon as={VisibilityIcon}/>}
              w={'full'}>
              {t('common_btn_correct_answer')}
            </Button>
          </GridItem>

          <GridItem>
            {
              isShowCorrectAnswer && <Text>{t('common_correct_answer_message')}<Text as={'strong'} color={'orange.600'}>{currentRandomNumber}</Text></Text>
            }
          </GridItem>
        </Grid>
        {/* eslint-enable */}
      </Stack>
    </form>
  );
};

export default UserCheckControls;
