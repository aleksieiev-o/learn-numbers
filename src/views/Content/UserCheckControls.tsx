import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Icon, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { object, string } from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { SpeechStatus } from './index';
import { useFocus } from '../../hooks/useFocus';

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

  const showToast = (status: ToastStatus) => {
    toast({
      title: status === ToastStatus.SUCCESS ? 'Correct answer' : 'Incorrect answer',
      status,
      duration: 2000,
      isClosable: true,
      position: 'bottom-left',
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
        <Grid templateColumns='repeat(3, 1fr)' gap={6} w={'full'} alignItems={'end'}>
          <GridItem>
            <FormControl isRequired={true} isReadOnly={false} isInvalid={touched.answer && dirty && Boolean(errors.answer)}>
              <FormLabel>Your answer</FormLabel>

              <Input
                ref={answerInputRef}
                isDisabled={speechStatus === SpeechStatus.STOPPED}
                type={'number'}
                placeholder={'Enter your answer'}
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
              title={speechStatus === SpeechStatus.STARTED ? 'Check your answer' : ''}
              leftIcon={<Icon as={CheckIcon}/>}
              w={'full'}>
              Check
            </Button>
          </GridItem>
        </Grid>

        <Grid templateColumns='repeat(3, 1fr)' gap={6} w={'full'} alignItems={'center'}>
          <GridItem>
            <Button
              onClick={showCorrectAnswer}
              isDisabled={speechStatus === SpeechStatus.STOPPED}
              colorScheme={'orange'}
              variant={'outline'}
              title={speechStatus === SpeechStatus.STARTED ? 'Show correct answer' : ''}
              leftIcon={<Icon as={VisibilityIcon}/>}
              w={'full'}>
              Show correct answer
            </Button>
          </GridItem>

          <GridItem>
            {
              isShowCorrectAnswer && <Text>Correct answer is <Text as={'strong'} color={'orange.600'}>{currentRandomNumber}</Text></Text>
            }
          </GridItem>
        </Grid>
      </Stack>
    </form>
  );
};

export default UserCheckControls;
