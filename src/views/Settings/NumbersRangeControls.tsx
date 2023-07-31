import React, {FC, ReactElement, useMemo} from 'react';
import { FormControl, FormErrorMessage, FormLabel, Heading, Icon, IconButton, Input, Stack } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useSettingsStore } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import {object, string} from 'yup';
import {FormikHelpers, useFormik} from 'formik';
import {useLoading} from '../../hooks/useLoading';

interface IChangeMinValueDto {
  minValue: string;
}

interface IChangeMaxValueDto {
  maxValue: string;
}

const NumbersRangeControls: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const { t } = useTranslation(['common']);
  const {isLoading: isLoadingMin, setIsLoading: setIsLoadingMin} = useLoading();
  const {isLoading: isLoadingMax, setIsLoading: setIsLoadingMax} = useLoading();

  const minInitialValue: IChangeMinValueDto = {
    minValue: String(settingsStore.remoteSpeechSettings.speechMinValue),
  };

  const maxInitialValue: IChangeMaxValueDto = {
    maxValue: String(settingsStore.remoteSpeechSettings.speechMaxValue),
  };

  // TODO after change app language, error text don't translate
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const minValueValidationSchema = useMemo(() => {
    return object().shape({
      minValue: string()
        .trim()
        .required(t('common_error_text_field_required')!)
        .matches(/^[0-9]+$/, t('common_error_text_number_supported')!),
    });
  }, [t]);

  // TODO after change app language, error text don't translate
  const maxValueValidationSchema = useMemo(() => {
    return object().shape({
      maxValue: string()
        .trim()
        .required(t('common_error_text_field_required')!)
        .matches(/^[0-9]+$/, t('common_error_text_number_supported')!),
    });
  }, [t]);
  /* eslint-enable */

  const handleSubmitMinValue = async (payload: IChangeMinValueDto, formikHelpers: FormikHelpers<IChangeMinValueDto>) => {
    setIsLoadingMin(true);

    try {
      await settingsStore.updateSpeechMinValue(parseInt(payload.minValue, 10) || 0);
    } catch (err) {
      console.warn(err);
    } finally {
      formikHelpers.setSubmitting(false);
      setIsLoadingMin(false);
    }
  };

  const handleSubmitMaxValue = async (payload: IChangeMaxValueDto, formikHelpers: FormikHelpers<IChangeMaxValueDto>) => {
    setIsLoadingMax(true);

    try {
      await settingsStore.updateSpeechMaxValue(parseInt(payload.maxValue, 10) || 0);
    } catch (err) {
      console.warn(err);
    } finally {
      formikHelpers.setSubmitting(false);
      setIsLoadingMax(false);
    }
  };

  const minValueFormik = useFormik({
    initialValues: minInitialValue,
    validationSchema: minValueValidationSchema,
    onSubmit: handleSubmitMinValue,
    validateOnBlur: true,
  });

  const maxValueFormik = useFormik({
    initialValues: maxInitialValue,
    validationSchema: maxValueValidationSchema,
    onSubmit: handleSubmitMaxValue,
    validateOnBlur: true,
  });

  return (
    <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'space-between'}>
      <Heading as={'h6'} fontSize={20}>{t('common_num_range_label')}</Heading>

      <Stack direction={'column'} w={'full'} alignItems={'center'} justifyContent={'flex-start'} spacing={4}>
        {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
        <form onSubmit={minValueFormik.handleSubmit} style={{ width: '100% '}}>
          <FormControl isInvalid={minValueFormik.touched.minValue && Boolean(minValueFormik.errors.minValue)}>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} w={'full'} spacing={0}>
              <FormLabel>{t('common_min_number_label')}</FormLabel>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} w={'full'} spacing={6}>
                <Input
                  type={'text'}
                  isDisabled={isLoadingMin}
                  colorScheme={'twitter'}
                  boxShadow={'md'}
                  placeholder={t('common_min_number_ph')!}
                  {...minValueFormik.getFieldProps('minValue')}/>

                <IconButton
                  type={'submit'}
                  colorScheme={'twitter'}
                  variant={'outline'}
                  isLoading={isLoadingMin}
                  boxShadow={'md'}
                  title={t('common_save_btn_title')!}
                  aria-label={'Save'}
                  icon={<Icon as={CheckIcon}/>}/>
              </Stack>

              <FormErrorMessage>
                {minValueFormik.touched.minValue && Boolean(minValueFormik.errors.minValue) && <FormErrorMessage>{minValueFormik.errors.minValue}</FormErrorMessage>}
              </FormErrorMessage>
            </Stack>
          </FormControl>
        </form>

        <form onSubmit={maxValueFormik.handleSubmit} style={{ width: '100% '}}>
          <FormControl isInvalid={maxValueFormik.touched.maxValue && Boolean(maxValueFormik.errors.maxValue)}>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} w={'full'} spacing={0}>
              <FormLabel>{t('common_max_number_label')}</FormLabel>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} w={'full'} spacing={6}>
                <Input
                  type={'text'}
                  isDisabled={isLoadingMax}
                  colorScheme={'twitter'}
                  boxShadow={'md'}
                  placeholder={t('common_max_number_ph')!}
                  {...maxValueFormik.getFieldProps('maxValue')}/>

                <IconButton
                  type={'submit'}
                  colorScheme={'twitter'}
                  variant={'outline'}
                  isLoading={isLoadingMax}
                  boxShadow={'md'}
                  title={t('common_save_btn_title')!}
                  aria-label={'Save'}
                  icon={<Icon as={CheckIcon}/>}/>
              </Stack>

              <FormErrorMessage>
                {maxValueFormik.touched.maxValue && Boolean(maxValueFormik.errors.maxValue) && <FormErrorMessage>{maxValueFormik.errors.maxValue}</FormErrorMessage>}
              </FormErrorMessage>
            </Stack>
          </FormControl>
        </form>
        {/* eslint-enable */}
      </Stack>
    </Stack>
  );
});

export default NumbersRangeControls;
