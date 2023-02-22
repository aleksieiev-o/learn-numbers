import React, { FC, ReactElement } from 'react';
import { Button, FormControl, FormErrorMessage, FormLabel, Grid, GridItem, Icon, NumberInput, NumberInputField, Stack, Text } from '@chakra-ui/react';
import { object, string } from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface CheckResultDto {
  answer: string;
}

const initialValues: CheckResultDto = {
  answer: '',
};

const validationSchema = object().shape({
  answer: string().required('Answer is required'),
});

const UserCheckControls: FC = (): ReactElement => {
  const submitHandler = async (payload: CheckResultDto, formikHelpers: FormikHelpers<CheckResultDto>) => {
    // setIsLoading(true);

    try {
      formikHelpers.setSubmitting(false);
    } catch (e) {
      console.warn(e);
    } finally {
      // setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
    validateOnBlur: true,
  });
  const { touched, dirty, errors, getFieldProps } = formik;

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100% '}}>
      <Stack w={'full'} direction={'column'} spacing={10}>
        <Grid templateColumns='repeat(3, 1fr)' gap={6} w={'full'} alignItems={'end'}>
          <GridItem>
            <FormControl isRequired={true} isReadOnly={false} isInvalid={touched.answer && dirty && Boolean(errors.answer)}>
              <FormLabel>Your answer</FormLabel>

              <NumberInput {...getFieldProps('answer')}>
                <NumberInputField placeholder={'Enter your answer'}/>
              </NumberInput>

              {touched.answer && dirty && Boolean(errors.answer) && <FormErrorMessage>{touched.answer && dirty && errors.answer}</FormErrorMessage>}
            </FormControl>
          </GridItem>

          <GridItem>
            <Button type={'submit'} isLoading={false} colorScheme={'cyan'} variant={'outline'} leftIcon={<Icon as={CheckIcon}/>} w={'full'}>
              Check
            </Button>
          </GridItem>
        </Grid>

        <Grid templateColumns='repeat(3, 1fr)' gap={6} w={'full'} alignItems={'center'}>
          <GridItem>
            <Button isDisabled={false} colorScheme={'orange'} variant={'outline'} leftIcon={<Icon as={VisibilityIcon}/>} w={'full'}>
              Show correct answer
            </Button>
          </GridItem>

          <GridItem>
            <Text>1111</Text>
          </GridItem>
        </Grid>
      </Stack>
    </form>
  );
};

export default UserCheckControls;
