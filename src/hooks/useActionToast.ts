import {AlertStatus} from '@chakra-ui/alert/dist/alert-context';
import {useToast} from '@chakra-ui/react';

interface IToastPayload {
  title: string;
  description: string;
  status: AlertStatus;
}

export const useActionToast = () => {
  const toast = useToast();

  const showActionToast = (payload: IToastPayload) => {
    const {title, description, status} = payload;

    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  return { showActionToast };
};