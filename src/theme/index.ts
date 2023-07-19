import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export enum ColorMode {
  LIGHT = 'light',
  DARK = 'dark',
}

const config: ThemeConfig = {
  initialColorMode: ColorMode.LIGHT,
  useSystemColorMode: true,
};

export const theme = extendTheme({ config });
