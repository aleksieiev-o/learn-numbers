import React, {FC, ReactElement, useMemo} from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage, FormHelperText,
  Grid, GridItem,
  Heading,
  Icon,
  Input,
  Stack
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useSettingsStore } from '../../store/hooks';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';
import {object, string} from 'yup';
import {FormikHelpers, useFormik} from 'formik';
import {useLoading} from '../../hooks/useLoading';
import {IRangeValue} from '../../store/SettingsStore/types';

interface IInitialValueDto {
  minValue: string;
  maxValue: string;
}

const NumbersRangeControls: FC = observer((): ReactElement => {
  const settingsStore = useSettingsStore();
  const { t } = useTranslation(['common']);
  const {isLoading, setIsLoading} = useLoading();

  const initialValue: IInitialValueDto = {
    minValue: String(settingsStore.remoteSpeechSettings.speechRangeValue.speechMinValue),
    maxValue: String(settingsStore.remoteSpeechSettings.speechRangeValue.speechMaxValue),
  };

  // TODO after change app language, error text don't translate
  /* eslint-disable @typescript-eslint/no-non-null-assertion */
  const validationSchema = useMemo(() => {
    return object().shape({
      minValue: string()
        .trim()
        .required(t('common_error_text_field_required')!)
        .matches(/^[0-9]+$/, t('common_error_text_number_supported')!)
        .test({
          name: 'minValue',
          exclusive: true,
          params: {},
          message: t('common_error_text_number_related_min')!,
          test: (value, context) => {
            const {minValue, maxValue} = context.parent;
            return parseInt(minValue, 10) <= parseInt(maxValue, 10);
          },
        }),
      maxValue: string()
        .trim()
        .required(t('common_error_text_field_required')!)
        .matches(/^[0-9]+$/, t('common_error_text_number_supported')!)
        .test({
          name: 'maxValue',
          exclusive: true,
          params: {},
          message: t('common_error_text_number_related_max')!,
          test: (value, context) => {
            const {minValue, maxValue} = context.parent;
            return parseInt(maxValue, 10) >= parseInt(minValue, 10);
          },
        }),
    });
  }, [t]);

  const handleSubmit = async (payload: IInitialValueDto, formikHelpers: FormikHelpers<IInitialValueDto>) => {
    setIsLoading(true);

    try {
      const range: IRangeValue = {
        speechMinValue: parseInt(payload.minValue, 10) || 0,
        speechMaxValue: parseInt(payload.maxValue, 10) || 0,
      };

      await settingsStore.updateSpeechRangeValue(range);
    } catch (err) {
      console.warn(err);
    } finally {
      formikHelpers.setSubmitting(false);
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
    validateOnBlur: true,
  });

  return (
    <Stack direction={'column'} w={'full'} alignItems={'flex-start'} justifyContent={'space-between'} spacing={4}>
      <Heading as={'h6'} fontSize={20}>{t('common_num_range_label')}</Heading>

      {/* eslint-disable @typescript-eslint/no-non-null-assertion */}
      <form onSubmit={formik.handleSubmit} style={{ width: '100% '}}>
        <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} gap={{ md: 6, base: 4 }} w={'full'} alignItems={'flex-start'}>
          <GridItem>
            <FormControl isInvalid={formik.touched.minValue && Boolean(formik.errors.minValue)}>
              <Input
                type={'text'}
                isDisabled={isLoading}
                colorScheme={'twitter'}
                boxShadow={'md'}
                placeholder={t('common_min_number_ph')!}
                {...formik.getFieldProps('minValue')}/>

              {
                formik.touched.minValue && Boolean(formik.errors.minValue) ?
                  <FormErrorMessage>{formik.errors.minValue}</FormErrorMessage>
                  :
                  <FormHelperText>{t('common_min_number_label')}</FormHelperText>
              }
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={formik.touched.maxValue && Boolean(formik.errors.maxValue)}>
              <Input
                type={'text'}
                isDisabled={isLoading}
                colorScheme={'twitter'}
                boxShadow={'md'}
                placeholder={t('common_max_number_ph')!}
                {...formik.getFieldProps('maxValue')}/>

              {
                formik.touched.maxValue && Boolean(formik.errors.maxValue) ?
                  <FormErrorMessage>{formik.errors.maxValue}</FormErrorMessage>
                  :
                  <FormHelperText>{t('common_max_number_label')}</FormHelperText>
              }
            </FormControl>
          </GridItem>

          <GridItem h={'full'}>
            <Stack direction={'row'} alignItems={'flex-start'} h={'full'}>
              <Button
                type={'submit'}
                colorScheme={'twitter'}
                variant={'outline'}
                isLoading={isLoading}
                boxShadow={'md'}
                title={t('common_save_btn_title')!}
                aria-label={'Save'}
                w={'full'}
                leftIcon={<Icon as={CheckIcon}/>}>
                {t('common_save_btn_title')}
              </Button>
            </Stack>
          </GridItem>
        </Grid>
      </form>
      {/* eslint-enable */}
    </Stack>
  );
});

export default NumbersRangeControls;
